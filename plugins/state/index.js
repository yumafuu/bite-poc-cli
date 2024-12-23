const dict = [
  { name: '実装が遅れている', yomi: 'jissou okure' },
  { name: 'お腹が痛い', yomi: 'onaka ga itai' },
  { name: '体調がよくない', yomi: 'taityou ga yokunai' },
  { name: '疲れている', yomi: 'tsukareteiru' },
  { name: '前のミーティングが押している', yomi: 'mae no meeting ga oshiteiru' },
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
