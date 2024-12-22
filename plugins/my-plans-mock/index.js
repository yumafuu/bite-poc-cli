// 今日の日付を取得
const today = new Date();

// 日付をフォーマットするヘルパー関数（MM/DD形式）
function formatDate(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月は0から始まるため+1
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}`;
}

// 今日から一週間分の日付を生成
const days = Array.from({ length: 11 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() + i);

  let label = '';
  switch (i) {
    case 0:
      label = '今日(kyou)'; // Today
      break;
    case 1:
      label = '明日(asita)'; // Tomorrow
      break;
    case 2:
      label = '明後日'; // Day after tomorrow
      break;
    default:
      label = `${i}日後`; // n days later
  }

  return `${label} (${formatDate(date)})`;
});

// 時間帯の設定
const times = [
  "10:00~11:00",
  "13:00~14:30",
  "09:00~10:00",
  "15:00~16:00",
  "11:00~12:00",
  "14:00~15:30",
  "10:30~11:30",
];

// ミーティングデータを定義（日本語の名前とローマ字の読み）
const meetings = [
  {
    name: "開発定例MTG",
    yomi: "kaihatsu teirei meeting",
  },
  {
    name: "コードレビュー",
    yomi: "code review",
  },
  {
    name: "チームビルディング",
    yomi: "team building",
  },
  {
    name: "新機能ブレインストーミング",
    yomi: "brain storming",
  },
  {
    name: "スプリントプランニング",
    yomi: "sprint planning",
  },
  {
    name: "技術勉強会",
    yomi: "gijutsu benkyoukai",
  },
  {
    name: "顧客ミーティング",
    yomi: "Kokyaku meeting",
  },
];

// スケジュールをランダムに生成
const schedule = Array.from({ length: 20 }, () => {
  const date = days[Math.floor(Math.random() * days.length)];
  const time = times[Math.floor(Math.random() * times.length)];
  const meeting = meetings[Math.floor(Math.random() * meetings.length)];

  return { date, time, meeting };
});

/**
 * スケジュールをフィルタリングする関数
 * @param {string} input - ユーザーの入力文字列
 * @returns {Array} - フィルタリングされたスケジュールの配列
 */
function filterSchedules(input) {
  const lowerInput = input.toLowerCase();
  if (!lowerInput) {
    return [];
  }

  const result = schedule.filter(({ date, time, meeting }) => {

    const nameMatch = meeting.name.toLowerCase().includes(lowerInput);
    const yomiMatch = meeting.yomi.toLowerCase().includes(lowerInput);
    const dateMatch = date.toLowerCase().includes(lowerInput);
    const timeMatch = time.toLowerCase().includes(lowerInput);

    return nameMatch || yomiMatch || dateMatch || timeMatch;
  });

  return result.map(({ date, time, meeting }) => {
    return `${date} ${time} ${meeting.name}`;
  })
}


fn = filterSchedules;
module.exports = fn;