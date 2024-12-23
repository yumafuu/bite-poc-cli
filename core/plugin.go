package main

import (
	"fmt"

	"github.com/dop251/goja"
	"github.com/dop251/goja_nodejs/require"
)

var (
	vm        = goja.New()
	registry  = new(require.Registry)
	rm        = registry.Enable(vm)
	defaultfn goja.Callable
)

func init() {
	fn, err := rm.Require("../plugins/default/index.js")
	if err != nil {
		panic(err)
	}

	var ok bool
	defaultfn, ok = goja.AssertFunction(fn)
	if !ok {
		panic("default plugin must be a function")
	}
}

func getDefault(input string) []string {
	v, err := defaultfn(goja.Undefined(), vm.ToValue(input))
	if err != nil {
		panic(err)
	}
	vv := v.Export()
	resultarr, ok := vv.([]any)
	if !ok {
		panic("default.js must return []any")
	}

	result := make([]string, len(resultarr))
	for i, v := range resultarr {
		result[i] = fmt.Sprintf("%v", v)
	}

	return result
}

func GetCandidate(plugin plugin, input string) []string {
	var v goja.Value
	fn, err := rm.Require(fmt.Sprintf("../plugins/%s/index.js", plugin.name))
	if err != nil {
		panic(err)
	}

	if callable, ok := goja.AssertFunction(fn); ok {
		v, err = callable(goja.Undefined(), vm.ToValue(input))
		if err != nil {
			panic(err)
		}
	}

	vv := v.Export()
	resultarr, ok := vv.([]any)
	if !ok {
		panic("plugin.js must return []any")
	}

	result := make([]string, len(resultarr))
	for i, v := range resultarr {
		result[i] = fmt.Sprintf("%v", v)
	}

	if len(result) == 0 {
		return getDefault(input)
	}

	return result
}
