// I have no friends, so this is dummy
const friends = [
  { name: '山田太郎', yomi: 'yamada tarou' },
  { name: '佐藤花子', yomi: 'satou hanako' },
  { name: '鈴木一郎', yomi: 'suzuki ichirou' },
  { name: '田中美咲', yomi: 'tanaka misaki' },
  { name: '高橋健太', yomi: 'takahashi kenta' },
  { name: '伊藤真由美', yomi: 'itou mayumi' },
  { name: '渡辺翔太', yomi: 'watanabe shouta' },
  { name: '中村優子', yomi: 'nakamura yuuko' },
  { name: '小林大輔', yomi: 'kobayashi daisuke' },
  { name: '加藤絵里', yomi: 'katou eri' },
  { name: '吉田直樹', yomi: 'yoshida naoki' },
  { name: '山口美穂', yomi: 'yamaguchi miho' },
  { name: '松本健一', yomi: 'matsumoto kenichi' },
  { name: '井上麻美', yomi: 'inoue asami' },
  { name: '木村拓哉', yomi: 'kimura takuya' },
  { name: '林真理子', yomi: 'hayashi mariko' },
  { name: '清水翔子', yomi: 'shimizu shouko' },
  { name: '斉藤隆', yomi: 'saitou takashi' },
  { name: '橋本奈々', yomi: 'hashimoto nana' },
  { name: '石川智子', yomi: 'ishikawa tomoko' }
];

const fn = (input) => {
  input = input.toLowerCase();

  return friends.filter(({ name, yomi }) => {
    const nameMatch = name.toLowerCase().includes(input);
    const yomiMatch = yomi.toLowerCase().includes(input);
    return nameMatch || yomiMatch;
  }).map(({ name }) => name);
}

module.exports = fn;
