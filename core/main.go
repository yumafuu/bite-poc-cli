package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/charmbracelet/bubbles/cursor"
	"github.com/charmbracelet/bubbles/textarea"
	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

type (
	inputmodeEnum int

	plugin struct {
		name     string
		shortcut string
	}

	model struct {
		messagesviewport   viewport.Model
		messages           []string
		textarea           textarea.Model
		pluginviewport     viewport.Model
		plugins            []plugin
		currentPluginindex int
		choices            []string
		choicesviewport    viewport.Model
		currentChoiceindex int
		err                error
	}
)

const (
	Typing inputmodeEnum = iota
	SelectPlugin
	SelectCandidate
)

var (
	currentPluginstyle = lipgloss.NewStyle().Foreground(lipgloss.Color("2"))
	currentChoicestyle = lipgloss.NewStyle().Foreground(lipgloss.Color("3"))

	// TODO: Get From Config
	plugins = []plugin{
		{"default", "ctrl+a"},
		{"common", "ctrl+e"},
		{"state", "ctrl+u"},
		{"engineer", "ctrl+b"},
		{"plans", "ctrl+p"},
		{"date-ja", "ctrl+d"},
		{"friends", "ctrl+o"},
		{"preferences", ""},
	}
)

func main() {
	p := tea.NewProgram(initialModel())

	if _, err := p.Run(); err != nil {
		fmt.Fprintf(os.Stderr, "Oof: %v\n", err)
	}
}

func initialModel() model {
	ta := textarea.New()
	ta.Placeholder = "Type something..."
	ta.Focus()

	ta.Prompt = "┃ "
	ta.CharLimit = 280
	ta.SetWidth(30)
	ta.SetHeight(3)
	ta.FocusedStyle.CursorLine = lipgloss.NewStyle()
	ta.ShowLineNumbers = false
	ta.KeyMap.InsertNewline.SetEnabled(true)

	mvp := viewport.New(30, 8)

	pvp := viewport.New(300, 2)
	pvp.SetContent(GetPluginStr(plugins, 0))

	cvp := viewport.New(100, 20)

	return model{
		textarea:           ta,
		messages:           []string{},
		messagesviewport:   mvp,
		plugins:            plugins,
		pluginviewport:     pvp,
		currentPluginindex: 0,
		choices:            []string{},
		choicesviewport:    cvp,
		currentChoiceindex: 0,
		err:                nil,
	}
}

func (m model) Init() tea.Cmd {
	return textarea.Blink
}

func (m model) View() string {
	return fmt.Sprintf(
		"%s\n\n%s\n\n%s\n\n%s",
		m.messagesviewport.View(),
		m.textarea.View(),
		m.pluginviewport.View(),
		m.choicesviewport.View(),
	) + "\n\n"
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.messagesviewport.Width = msg.Width
		m.textarea.SetWidth(msg.Width)
		return m, nil
	case tea.KeyMsg:
		switch msg.String() {
		case "ctrl+c":
			return m, tea.Quit
		case "esc":
			return m, nil
		case "up", "ctrl+k":
			if m.currentChoiceindex > 0 {
				m.currentChoiceindex = m.currentChoiceindex - 1
			}
			m.choicesviewport.SetContent(GetCandidateStr(m.choices, m.currentChoiceindex))
			return m, nil
		case "down", "ctrl+j":
			if m.currentChoiceindex < len(m.choices)-1 {
				m.currentChoiceindex = m.currentChoiceindex + 1
			}
			m.choicesviewport.SetContent(GetCandidateStr(m.choices, m.currentChoiceindex))
			return m, nil
		case "ctrl+l":
			m.currentChoiceindex = 0
			if m.currentPluginindex < len(m.plugins)-1 {
				m.currentPluginindex = m.currentPluginindex + 1
			}
			currentPlugin := m.plugins[m.currentPluginindex]
			m.choices = GetCandidate(currentPlugin, m.textarea.Value())
			m.choicesviewport.SetContent(GetCandidateStr(m.choices, m.currentChoiceindex))
			m.pluginviewport.SetContent(GetPluginStr(m.plugins, m.currentPluginindex))

			return m, nil
		case "ctrl+h":
			m.currentChoiceindex = 0
			if m.currentPluginindex > 0 {
				m.currentPluginindex = m.currentPluginindex - 1
			}

			currentPlugin := m.plugins[m.currentPluginindex]
			m.choices = GetCandidate(currentPlugin, m.textarea.Value())
			m.choicesviewport.SetContent(GetCandidateStr(m.choices, m.currentChoiceindex))
			m.pluginviewport.SetContent(GetPluginStr(m.plugins, m.currentPluginindex))
			return m, nil
		case "enter":
			if len(m.choices) > 0 && m.currentChoiceindex < len(m.choices) {
				m.textarea.SetValue(m.choices[m.currentChoiceindex])
			}
			v := m.textarea.Value()

			if v == "" {
				// Don't send empty messages.
				return m, nil
			}

			// Simulate sending a message. In your application you'll want to
			// also return a custom command to send the message off to
			// a server.
			m.messages = append(m.messages, v)
			m.messagesviewport.SetContent(strings.Join(m.messages, "\n"))
			m.messagesviewport.GotoBottom()
			m.textarea.Reset()
			m.currentChoiceindex = 0
			m.choices = []string{}
			m.choicesviewport.SetContent("")
			// m.currentPluginindex = 0
			m.pluginviewport.SetContent(GetPluginStr(m.plugins, m.currentPluginindex))
			return m, nil
		default:
			// shortcut hit
			for i, p := range m.plugins {
				if msg.String() == p.shortcut {
					m.currentPluginindex = i
					currentPlugin := m.plugins[m.currentPluginindex]
					m.choices = GetCandidate(currentPlugin, m.textarea.Value())
					m.choicesviewport.SetContent(GetCandidateStr(m.choices, m.currentChoiceindex))
					m.pluginviewport.SetContent(GetPluginStr(m.plugins, m.currentPluginindex))
					return m, nil
				}
			}
			var cmd tea.Cmd
			m.textarea, cmd = m.textarea.Update(msg)

			currentPlugin := m.plugins[m.currentPluginindex]
			m.choices = GetCandidate(currentPlugin, m.textarea.Value())

			if m.currentChoiceindex >= len(m.choices) {
				m.currentChoiceindex = len(m.choices) - 1
			}

			m.choicesviewport.SetContent(GetCandidateStr(m.choices, m.currentChoiceindex))
			return m, cmd
		}

	case cursor.BlinkMsg:
		// Textarea should also process cursor blinks.
		var cmd tea.Cmd
		m.textarea, cmd = m.textarea.Update(msg)
		return m, cmd

	default:
		return m, nil
	}
}

func GetPluginStr(plugins []plugin, current int) string {
	var pluginstrs []string
	for i, p := range plugins {
		if i == current {
			styledname := currentPluginstyle.Render(p.name)
			if p.shortcut == "" {
				pluginstrs = append(pluginstrs, fmt.Sprintf("%s", styledname))
			} else {
				shortcut := currentPluginstyle.Render(p.shortcut)
				shortcut = strings.Replace(shortcut, "ctrl+", "", 1)
				pluginstrs = append(pluginstrs, fmt.Sprintf("[%s] %s", shortcut, styledname))
			}
		} else {
			shortcut := strings.Replace(p.shortcut, "ctrl+", "", 1)
			if p.shortcut == "" {
				pluginstrs = append(pluginstrs, fmt.Sprintf("%s", p.name))
			} else {
				pluginstrs = append(pluginstrs, fmt.Sprintf("[%s] %s", shortcut, p.name))
			}
		}
	}
	return strings.Join(pluginstrs, " ")
}

func GetCandidateStr(choices []string, current int) string {
	var choicestrs []string
	for i, c := range choices {
		if i == current {
			choicestrs = append(choicestrs, fmt.Sprintf("▶ %s", currentChoicestyle.Render(c)))

		} else {
			choicestrs = append(choicestrs, fmt.Sprintf("  %s", c))
		}
	}
	return strings.Join(choicestrs, "\n")
}
