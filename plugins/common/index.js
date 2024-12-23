const dict = [
  { name: '申し訳ないのですが', yomi: 'mousiwakenai' },
  { name: 'ありがとうございます！', yomi: 'arigatougozaimasu' },
  { name: 'よろしくおねがいします！', yomi: 'yorosikuonegaisimasu' },
  { name: 'ごめんなさい！', yomi: 'gomennasai' },
  { name: 'すみません', yomi: 'sumimasen' },
  { name: '5分ほど開始を遅らせてください', yomi: 'gohunhodokaisiwookurasetekudasai' },
  { name: '10分ほど開始を遅らせてください', yomi: 'juppunhunhodokaisiwookurasetekudasai' },
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
