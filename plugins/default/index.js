// just ro-maji to hiragana
function romajiToHiragana(input) {
  const romajiMap = {
    // 母音
    "a": "あ", "i": "い", "u": "う", "e": "え", "o": "お",

    // か行
    "ka": "か", "ki": "き", "ku": "く", "ke": "け", "ko": "こ",
    "ga": "が", "gi": "ぎ", "gu": "ぐ", "ge": "げ", "go": "ご",

    // さ行
    "sa": "さ", "shi": "し", "su": "す", "se": "せ", "so": "そ",
    "si": "し",
    "za": "ざ", "ji": "じ", "zu": "ず", "ze": "ぜ", "zo": "ぞ",

    // た行
    "ta": "た", "chi": "ち", "tsu": "つ", "te": "て", "to": "と",
    "ti": "ち", "tu": "つ",
    "da": "だ", "di": "ぢ", "du": "づ", "de": "で", "do": "ど",

    // な行
    "na": "な", "ni": "に", "nu": "ぬ", "ne": "ね", "no": "の",

    // は行
    "ha": "は", "hi": "ひ", "fu": "ふ", "he": "へ", "ho": "ほ",
    "ba": "ば", "bi": "び", "bu": "ぶ", "be": "べ", "bo": "ぼ",
    "pa": "ぱ", "pi": "ぴ", "pu": "ぷ", "pe": "ぺ", "po": "ぽ",

    // ま行
    "ma": "ま", "mi": "み", "mu": "む", "me": "め", "mo": "も",

    // や行
    "ya": "や", "yu": "ゆ", "yo": "よ",

    // ら行
    "ra": "ら", "ri": "り", "ru": "る", "re": "れ", "ro": "ろ",

    // わ行
    "wa": "わ", "wo": "を",

    // ん
    "n": "ん", "nn": "ん",

    // 促音（小っ）
    "kka": "っか", "kki": "っき", "kku": "っく", "kke": "っけ", "kko": "っこ",
    "ssa": "っさ", "sshi": "っし", "ssu": "っす", "sse": "っせ", "sso": "っそ",
    "tta": "った", "tchi": "っち", "ttsu": "っつ", "tte": "って", "tto": "っと",
    "ppa": "っぱ", "ppi": "っぴ", "ppu": "っぷ", "ppe": "っぺ", "ppo": "っぽ",

    // 拡張マッピング（拗音）
    "kya": "きゃ", "kyu": "きゅ", "kyo": "きょ",
    "gya": "ぎゃ", "gyu": "ぎゅ", "gyo": "ぎょ",
    "sha": "しゃ", "shu": "しゅ", "sho": "しょ",
    "sya": "しゃ", "syu": "しゅ", "syo": "しょ",
    "ja": "じゃ", "ju": "じゅ", "jo": "じょ",
    "cha": "ちゃ", "chu": "ちゅ", "cho": "ちょ",
    "nya": "にゃ", "nyu": "にゅ", "nyo": "にょ",
    "hya": "ひゃ", "hyu": "ひゅ", "hyo": "ひょ",
    "bya": "びゃ", "byu": "びゅ", "byo": "びょ",
    "pya": "ぴゃ", "pyu": "ぴゅ", "pyo": "ぴょ",
    "mya": "みゃ", "myu": "みゅ", "myo": "みょ",
    "rya": "りゃ", "ryu": "りゅ", "ryo": "りょ",

    // その他必要なマッピング
    "fa": "ふぁ", "fi": "ふぃ", "fe": "ふぇ", "fo": "ふぉ",
    "va": "ゔぁ", "vi": "ゔぃ", "vu": "ゔ", "ve": "ゔぇ", "vo": "ゔぉ",
    // さらに必要に応じて追加
  };


    // Convert input to lowercase to simplify matching
    input = input.toLowerCase();

    let result = '';
    let i = 0;

    while (i < input.length) {
        // Handle sokuon (促音) for double consonants (except for 'n')
        if (i + 1 < input.length && input[i] === input[i + 1] && isConsonant(input[i]) && input[i] !== 'n') {
            result += 'っ';
            i += 1;
            continue;
        }

        // Try to match the longest possible romaji (3 letters)
        let matched = false;
        for (let len = 3; len >= 1; len--) {
            if (i + len > input.length) continue;
            let substr = input.substring(i, i + len);
            if (romajiMap[substr]) {
                result += romajiMap[substr];
                i += len;
                matched = true;
                break;
            }
        }

        if (!matched) {
            // Handle 'n' before a consonant or end of input
            if (input[i] === 'n') {
                if (i + 1 === input.length) {
                    result += 'ん';
                    i += 1;
                    continue;
                }
                let nextChar = input[i + 1];
                if (isConsonant(nextChar)) {
                    result += 'ん';
                    i += 1;
                    continue;
                }
            }

            // If no match is found, append the character as is
            result += input[i];
            i += 1;
        }
    }

    return result;
}

// Helper function to check if a character is a consonant
function isConsonant(char) {
    return /^[bcdfghjklmnpqrstvwxyz]$/.test(char);
}

const fn = (input) => {
  if (!input) {
    return [];
  }
  const item = romajiToHiragana(input);
  return [item]
}

module.exports = fn
