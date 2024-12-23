const dict = [
  { name: '申し訳ないのですが', yomi: 'mousiwakenai' },
  { name: 'ありがとうございます！', yomi: 'arigatougozaimasu' },
  { name: 'よろしくおねがいします！', yomi: 'yorosikuonegaisimasu' },
  { name: 'ごめんなさい！', yomi: 'gomennasai' },
  { name: 'すみません', yomi: 'sumimasen' },
];


const fn = (input) => {
  const items = dict.filter(({ name, yomi }) => {
    const nameMatch = name.toLowerCase().includes(input);
    const yomiMatch = yomi.toLowerCase().includes(input);
    return nameMatch || yomiMatch;
  })

  return items.map(({ name }) => name);
}

module.exports = fn
