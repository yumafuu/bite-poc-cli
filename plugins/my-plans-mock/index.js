// 今日の日付を取得
const today = new Date();

// 日付をフォーマットするヘルパー関数（MM/DD形式）
function formatDate(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月は0から始まるため+1
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}`;
}

// 今日から一週間分の日付を生成
const days = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() + i);

  let label = '';
  let yomi = '';
  switch (i) {
    case 0:
      label = '今日'; // Today
      yomi = 'kyou';
      break;
    case 1:
      label = '明日'; // Tomorrow
      yomi = 'asita';
      break;
    case 2:
      label = '明後日'; // Day after tomorrow
      yomi = 'asatte';
      break;
    default:
      label = `${i}日後`; // n days later
      yomi = `${i}nichigo`;
  }

  return { label, yomi }
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

// 各時間帯に各ミーティングを一つずつ生成
const schedule = days.flatMap((date) => {
  return times.flatMap((time, i) => {
    const meeting = meetings[i];
    return { date, time, meeting };
  });
})

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
    const dateMatch = date.yomi.toLowerCase().includes(lowerInput)
      || date.label.toLowerCase().includes(lowerInput);
    const timeMatch = time.toLowerCase().includes(lowerInput);

    return nameMatch || yomiMatch || dateMatch || timeMatch;
  });

  return result.map(({ date, time, meeting }) => {
    return `${date.label} ${time} ${meeting.name}`;
  })
}


fn = filterSchedules;
module.exports = fn;
