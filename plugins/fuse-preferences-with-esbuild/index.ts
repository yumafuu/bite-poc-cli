import Fuse from 'fuse.js'

const fuseOptions = {
	// isCaseSensitive: false,
	// includeScore: false,
	// shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	// threshold: 0.6,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: [
		"japanese",
		"english"
	]
};

const list = [
  { code: "01", japanese: "北海道", english: "Hokkaido" },
  { code: "02", japanese: "青森県", english: "Aomori" },
  { code: "03", japanese: "岩手県", english: "Iwate" },
  { code: "04", japanese: "宮城県", english: "Miyagi" },
  { code: "05", japanese: "秋田県", english: "Akita" },
  { code: "06", japanese: "山形県", english: "Yamagata" },
  { code: "07", japanese: "福島県", english: "Fukushima" },
  { code: "08", japanese: "茨城県", english: "Ibaraki" },
  { code: "09", japanese: "栃木県", english: "Tochigi" },
  { code: "10", japanese: "群馬県", english: "Gunma" },
  { code: "11", japanese: "埼玉県", english: "Saitama" },
  { code: "12", japanese: "千葉県", english: "Chiba" },
  { code: "13", japanese: "東京都", english: "Tokyo" },
  { code: "14", japanese: "神奈川県", english: "Kanagawa" },
  { code: "15", japanese: "新潟県", english: "Niigata" },
  { code: "16", japanese: "富山県", english: "Toyama" },
  { code: "17", japanese: "石川県", english: "Ishikawa" },
  { code: "18", japanese: "福井県", english: "Fukui" },
  { code: "19", japanese: "山梨県", english: "Yamanashi" },
  { code: "20", japanese: "長野県", english: "Nagano" },
  { code: "21", japanese: "岐阜県", english: "Gifu" },
  { code: "22", japanese: "静岡県", english: "Shizuoka" },
  { code: "23", japanese: "愛知県", english: "Aichi" },
  { code: "24", japanese: "三重県", english: "Mie" },
  { code: "25", japanese: "滋賀県", english: "Shiga" },
  { code: "26", japanese: "京都府", english: "Kyoto" },
  { code: "27", japanese: "大阪府", english: "Osaka" },
  { code: "28", japanese: "兵庫県", english: "Hyogo" },
  { code: "29", japanese: "奈良県", english: "Nara" },
  { code: "30", japanese: "和歌山県", english: "Wakayama" },
  { code: "31", japanese: "鳥取県", english: "Tottori" },
  { code: "32", japanese: "島根県", english: "Shimane" },
  { code: "33", japanese: "岡山県", english: "Okayama" },
  { code: "34", japanese: "広島県", english: "Hiroshima" },
  { code: "35", japanese: "山口県", english: "Yamaguchi" },
  { code: "36", japanese: "徳島県", english: "Tokushima" },
  { code: "37", japanese: "香川県", english: "Kagawa" },
  { code: "38", japanese: "愛媛県", english: "Ehime" },
  { code: "39", japanese: "高知県", english: "Kochi" },
  { code: "40", japanese: "福岡県", english: "Fukuoka" },
  { code: "41", japanese: "佐賀県", english: "Saga" },
  { code: "42", japanese: "長崎県", english: "Nagasaki" },
  { code: "43", japanese: "熊本県", english: "Kumamoto" },
  { code: "44", japanese: "大分県", english: "Oita" },
  { code: "45", japanese: "宮崎県", english: "Miyazaki" },
  { code: "46", japanese: "鹿児島県", english: "Kagoshima" },
  { code: "47", japanese: "沖縄県", english: "Okinawa" }
];

const fuse = new Fuse(list, fuseOptions);

module.exports = (input: string): string[] => {
  // prefectureのenglishとinputが曖昧一致するものを返す
  const result = fuse.search(input)
  // to string[]
  return result.map((item) => item.item.japanese)
}
