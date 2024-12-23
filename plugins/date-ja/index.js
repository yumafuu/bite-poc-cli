/**
 * 日付を「MM/DD」形式の文字列にフォーマットします。
 * @param {Date} date - フォーマットするDateオブジェクト
 * @returns {string} - フォーマットされた日付文字列
 */
function formatDate(date) {
  const month = date.getMonth() + 1; // 月は0から始まるため+1
  const day = date.getDate();
  return `${month}/${day}`;
}

/**
 * 来月の全ての日付を「MM/DD」形式の配列で取得します。
 * @returns {string[]} - 来月の全日付の配列
 */
function getNextMonthDates(today) {
  let year = today.getFullYear();
  let month = today.getMonth() + 1; // 現在の月（0-11）に+1して1-12に

  if (month === 12) { // 12月の場合は翌年の1月
    year += 1;
    month = 1;
  } else {
    month += 1;
  }

  // 来月の最終日を取得
  const lastDayOfNextMonth = new Date(year, month, 0).getDate();

  const dates = [];
  for (let day = 1; day <= lastDayOfNextMonth; day++) {
    const date = new Date(year, month - 1, day);
    dates.push(formatDate(date));
  }

  return dates;
}

/**
 * 先月の全ての日付を「MM/DD」形式の配列で取得します。
 * @returns {string[]} - 先月の全日付の配列
 */
function getLastMonthDates(today) {
  let year = today.getFullYear();
  let month = today.getMonth(); // 現在の月（0-11）

  if (month === 0) { // 1月の場合は前年の12月
    year -= 1;
    month = 12;
  }

  // 先月の最終日を取得
  const lastDayOfLastMonth = new Date(year, month, 0).getDate();

  const dates = [];
  for (let day = 1; day <= lastDayOfLastMonth; day++) {
    const date = new Date(year, month - 1, day);
    dates.push(formatDate(date));
  }

  return dates;
}

/**
 * 表現とその読み、対応する日付計算関数を定義します。
 */
const dateExpressions = [
  {
    text: "きょう",
    reading: "kyou",
    getDates: (today) => [formatDate(today)],
  },
  {
    text: "あした",
    reading: "asita",
    getDates: (today) => {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return [formatDate(tomorrow)];
    },
  },
  {
    text: "きのう",
    reading: "kinou",
    getDates: (today) => {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return [formatDate(yesterday)];
    },
  },
  {
    text: "あさって",
    reading: "asatte",
    getDates: (today) => {
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
      return [formatDate(dayAfterTomorrow)];
    },
  },
  {
    text: "しあさって",
    reading: "shiasatte",
    getDates: (today) => {
      const threeDaysAfter = new Date(today);
      threeDaysAfter.setDate(threeDaysAfter.getDate() + 3);
      return [formatDate(threeDaysAfter)];
    },
  },
  {
    text: "らいげつ",
    reading: "raigetsu",
    getDates: (today) => getNextMonthDates(today),
  },
  {
    text: "せんげつ",
    reading: "sengetsu",
    getDates: (today) => getLastMonthDates(today),
  },
  // 必要に応じて他の表現を追加
];

/**
 * 日本語の自然言語表現から対応する日付を計算し、「MM/DD」形式の配列を返します。
 * 入力が部分一致する場合、複数の候補を返します。
 * @param {string} input - ユーザーの入力文字列（ローマ字）
 * @returns {string[][]} - マッチした各表現に対応する日付の配列
 */
function findMatchingDates(input) {
  const today = new Date();
  const normalizedInput = input.trim().toLowerCase();

  // // 入力が空の場合は空配列を返す
  // if (normalizedInput === "") {
  //   return [];
  // }

  // 一致する表現をフィルタリング
  const matchedExpressions = dateExpressions.filter(expr =>
    expr.reading.startsWith(normalizedInput)
  );

  // マッチした表現ごとに日付を取得
  const matchedDates = matchedExpressions.map(expr => ({
    expression: expr.text,
    dates: expr.getDates(today),
  }));

  // 日付の配列を返す
  return matchedDates.map(({ dates }) => dates).flatMap(dates => dates);
}

fn = findMatchingDates;
module.exports = fn;
