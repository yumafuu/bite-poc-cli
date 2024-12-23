const dict = [
  { name: 'レビューお願いします', yomi: 'review onegaishimasu' },
  { name: '確認します！', yomi: 'kakunin shimasu!' },
  { name: '進捗状況を教えてください', yomi: 'shinchoku joukyou o oshiete kudasai' },
  { name: '問題が発生しました', yomi: 'mondai ga hassei shimashita' },
  { name: 'お疲れ様です', yomi: 'otukaresama desu' },
  { name: '今日のミーティングは何時ですか？', yomi: 'kyou no meetingu wa nanji desu ka?' },
  { name: 'デプロイ完了しました', yomi: 'deploy kanryou shimashita' },
  { name: 'コードをプッシュしました', yomi: 'koodo o push shimashita' },
  { name: 'バグを修正しました', yomi: 'bagu o shuusei shimashita' },
  { name: '新しいタスクを追加しました', yomi: 'atarashii tasuku o tsuika shimashita' },
  { name: 'ドキュメントを更新しました', yomi: 'dokyumento o koushin shimashita' },
  { name: '助けが必要です', yomi: 'tasuke ga hitsuyou desu' },
  { name: 'この機能について説明してください', yomi: 'kono kinou ni tsuite setsumei shite kudasai' },
  { name: 'データベースに接続できません', yomi: 'database ni setsuzoku dekimasen' },
  { name: 'CI/CDパイプラインが失敗しました', yomi: 'CI/CD pipeline ga shippai shimashita' },
  { name: 'テストケースを追加しました', yomi: 'test case o tsuika shimashita' },
  { name: 'コードレビューのフィードバックありがとうございます', yomi: 'koodo review no feedback arigatou gozaimasu' },
  { name: 'リリースノートを作成しました', yomi: 'release note o sakusei shimashita' },
  { name: 'サーバーがダウンしています', yomi: 'server ga daun shiteimasu' },
  { name: 'パフォーマンスを改善しました', yomi: 'performance o kaizen shimashita' }
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
