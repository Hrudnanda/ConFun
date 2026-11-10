/*
 * Akruti Sarala ↔ Unicode Odia conversion.
 *
 * The legacy → Unicode mapping and reordering rules are adapted from:
 * OdiaWikimedia/Converter, “Akruti-Sarala - Unicode Converter.htm”
 * Authors credited in the original: Manoj Sahukar and Subhasish Panigrahi.
 * Original file states CC BY-SA 3.0. See ATTRIBUTION.md.
 *
 * Important: “Akruti” is a family of different font encodings. This mapping
 * targets Akruti Sarala / AkrutiOriSarala-style legacy text, not every Akruti
 * font or Unicode Akruti font.
 */

const pairs = [
  [" û", " ।"], ["ö", " ।"], ["÷÷÷", ""],
  ["£", "୍ମ"], ["à", "୍ମ"], ["á", "୍ମୃ"], ["â", "୍ର"], ["ã", "୍ର"],
  ["ä", "୍ଲ"], ["å", "୍ଭ"], ["æ", "୍ଳ"], ["ç", "୍ୱ"], ["è", "୍ସ"],
  ["ý", "୍ୟ"], ["¥", "୍ୟ"], ["ó", "ିଁ"], ["Iß", "ୱ"], ["Wÿ", "ଡ଼"],
  ["Xÿ", "ଢ଼"], ["Pÿ", "ଚ"], ["[ô", "ଥି"], ["]ô", "ଧି"], ["Lô", "ଖି"],
  ["cô", "ତ୍ମ"], ["_ô", "ତ୍ପ"],
  ["û", "ା"], ["ò", "ି"], ["ú", "ୀ"], ["ê", "ୁ"], ["ë", "ୁ"],
  ["ì", "ୂ"], ["í", "ୂ"], ["é", "ୃ"], ["ñ", "ଁ"], ["õ", "ଂ"],
  ["ü", "ଃ"], ["þ", "୍"], ["¨", "୍‌"],
  ["1", "୧"], ["2", "୨"], ["3", "୩"], ["4", "୪"], ["5", "୫"],
  ["6", "୬"], ["7", "୭"], ["8", "୮"], ["9", "୯"], ["0", "୦"],
  ["#", "୰"], ["$", "ଽ"], ["&", "ଌ"], ["*", "ଞ୍ଚ"], ["", "ଞ୍ଚ"],
  ["î", "୍ରୁ"], ["ï", "୍ରୂ"], ["Ð", "କ୍ଷ୍ଣ"], ["Ñ", "୍କ"], ["Ò", "୍ଖ"],
  ["Ó", "୍ଗ"], ["Ô", "୍ଚ"], ["Õ", "୍ଜ"], ["Ö", "୍ଟ"], ["×", "୍ଠ"],
  ["Ø", "୍ଡ"], ["Ù", "୍ଣ"], ["Ú", "୍ଥ"], ["Û", "୍ଧ"], ["Ü", "୍ନ"],
  ["Ý", "୍ପ"], ["Þ", "୍ଫ"], ["ß", "୍ୱ"], ["<", "ଣ୍ଟ"], ["", "ଣ୍ଟ"],
  ["…", "ଟ୍ଟ"], ["μ", "ମ୍ପ"], ["µ", "ମ୍ପ"], ["¶", "ମ୍ଫ"],
  ["‰", "ଣ୍ଣ"], ["Š", "ଣ୍ଡ"], ["Œ", "ଣ୍ଠ"], ["™", "ତ୍ମ"],
  ["š", "ତ୍ପ"], ["›", "ତ୍ସ"], ["œ", "ତ୍ସ୍ନ"], ["Ÿ", "ଦ୍ଦ"],
  ["{", "ଜ୍ଜ"], ["|", "ଜ୍ଝ"], ["}", "କ୍ର"], ["¡", "ଦ୍ଧ"], ["¢", "ଦ୍ଘ"],
  ["¤", "ଧ୍ୟ"], ["¦", "ନ୍ଦ"], ["§", "ନ୍ଧ"], ["©", "ତ୍ତ"], ["", "ତ୍ତ"],
  ["ª", "ନ୍ତ୍ର"], ["«", "ନ୍ତ"], ["¬", "ଞ୍ଜ"], ["ƒ", "ଞ୍ଝ"],
  ["®", "ପ୍ପ"], ["¯", "ପ୍ତ"], ["°", "ପ୍ସ"], ["±", "ବ୍ଦ"], ["²", "ବ୍ଧ"],
  ["´", "ମ୍ବ"], ["¸", "ମ୍ଭ"], ["̧", "ମ୍ଭ"], ["¹", "ମ୍ମ"],
  ["º", "ଲ୍କ"], ["»", "ଲ୍ଗ"], ["¼", "ଶ୍ଛ"], ["½", "ଶ୍ଚ"],
  ["¾", "ଷ୍ଣ"], ["¿", "ଷ୍ପ"], ["À", "ଷ୍ଫ"], ["Á", "ଷ୍ଟ"],
  ["Â", "ଷ୍ଠ"], ["Ã", "ଷ୍କ"], ["Ä", "ସ୍କ"], ["Å", "ସ୍ଖ"],
  ["Æ", "ସ୍ପ"], ["Ç", "ସ୍ଫ"], ["È", "ସ୍ତ୍ର"], ["É", "ସ୍ତ"],
  ["Ê", "ସ୍ୱ"], ["Ë", "ଳ୍କ"], ["Ì", "ଳ୍ପ"], ["Í", "ଳ୍ଫ"],
  ["Î", "ତ୍ଥ"], ["", "ତ୍ଥ"], ["Ï", "ଳ୍ଳ"],
  ["@ା", "ଆ"], ["@", "ଅ"], ["A", "ଇ"], ["B", "ଈ"], ["C", "ଉ"],
  ["D", "ଊ"], ["E", "ଋ"], ["F", "ୠ"], ["G", "ଏ"], ["H", "ଐ"],
  ["I", "ଓ"], ["J", "ଔ"], ["K", "କ"], ["L", "ଖ"], ["M", "ଗ"],
  ["N", "ଘ"], ["O", "ଙ"], ["P", "ଚ"], ["Q", "ଛ"], ["R", "ଜ"],
  ["S", "ଝ"], ["T", "ଞ"], ["U", "ଟ"], ["V", "ଠ"], ["W", "ଡ"],
  ["X", "ଢ"], ["Y", "ଣ"], ["Z", "ତ"], ["[", "ଥ"], ["\\", "ଦ"],
  ["]", "ଧ"], ["^", "ନ"], ["~", "ଯ"], ["_", "ପ"], ["`", "ଫ"],
  ["a", "ବ"], ["b", "ଭ"], ["c", "ମ"], ["d", "ୟ"], ["e", "ର"],
  ["f", "ଲ"], ["g", "ଶ"], ["h", "ଷ"], ["i", "ସ"], ["j", "ହ"],
  ["k", "ଳ"], ["l", "କ୍ଷ"], ["m", "ଜ୍ଞ"], ["n", "ଦ୍ଭ"],
  ["o", "କ୍ଟ"], ["p", "କ୍ଟ୍ର"], ["q", "କ୍ତ"], ["r", "କ୍ସ"],
  ["s", "ଗ୍ଦ"], ["t", "ଗ୍ଧ"], ["u", "ଙ୍କ"], ["v", "ଙ୍ଖ"],
  ["w", "ଙ୍ଗ"], ["x", "ଙ୍ଘ"], ["y", "ଚ୍ଚ"], ["z", "ଚ୍ଛ"],
  ["‹", "ଣ୍ଢ"], ["ଏø", " ଐ"], ["୍ଯ", "୍ୟ"], ["ଅା", "ଆ"]
];

// Longest-first avoids replacing a multi-character legacy token in pieces.
const legacyToUnicode = [...pairs].sort((a, b) => b[0].length - a[0].length);

function reorderOdia(text) {
  let s = text;
  // Reposition the legacy e-sign, including forms following a virama.
  s = s.replace(/([ù])([କଖଗଘଙଚଛଜଝଞଟଠଡଡ଼ଢଢ଼ଣତଥଦଧନପଫବଭମଯୟରଲବୱଶଷସହକ୍ଷଡ଼ଳ])/g, "$2$1");
  s = s.replace(/([ù])([୍])([କଖଗଘଚଛଜଝଟଠଡଡ଼ଢଢ଼ଣତଥନପଫବଭମୟରଲବୱଶଷସହକ୍ଷଡ଼ଳ])/g, "$2$3$1");
  s = s.replace(/ùø/g, "ୌ").replace(/ùା/g, "ୋ").replace(/ù÷/g, "ୈ").replace(/ù/g, "େ");
  // Reph placement.
  const consonants = "କଖଗଘଚଛଜଝଟଠଡଡ଼ଢଢ଼ଣତଥଦଧନପଫବଭମଯରଲଳଵଶଷସହକ୍ଷଜ୍ଞୟ";
  const c = `[${consonants}]`;
  s = s.replace(new RegExp(`(${c})([ାିୀୁୂୃେୈୋୌଂଁ]*)à`, "g"), "ð$1$2");
  s = s.replace(new RegExp(`(${c})([ାିୀୁୂୃେୈୋୌଂଁ]*)ð`, "g"), "ð$1$2");
  s = s.replace(new RegExp(`(${c})([୍])à`, "g"), "ð$1$2");
  s = s.replace(new RegExp(`(${c})([୍])ð`, "g"), "ð$1$2");
  s = s.replace(/ð/g, "ର୍");
  s = s.replace(/([ଂଁ])([ାିୀୁୂୃେୈୋୌ])/g, "$2$1");
  return s;
}

export function akrutiToUnicode(input = "") {
  let output = String(input);
  for (const [legacy, unicode] of legacyToUnicode) {
    if (!legacy) continue;
    output = output.split(legacy).join(unicode);
  }
  return reorderOdia(output);
}

// Reverse mapping is inherently ambiguous where multiple legacy codes map to
// the same Unicode sequence. Prefer the first mapping in the source table,
// with longer Unicode sequences matched before shorter ones.
const unicodeToLegacy = (() => {
  const map = new Map();
  for (const [legacy, unicode] of pairs) {
    if (!unicode || map.has(unicode)) continue;
    map.set(unicode, legacy);
  }
  return [...map.entries()].sort((a, b) => b[0].length - a[0].length);
})();

export function unicodeToAkruti(input = "") {
  let output = String(input);
  // Normalize common equivalent Odia forms before lookup.
  output = output.normalize("NFC");
  for (const [unicode, legacy] of unicodeToLegacy) {
    output = output.split(unicode).join(legacy);
  }
  return output;
}

export function convert(input, direction) {
  return direction === "unicode-to-akruti"
    ? unicodeToAkruti(input)
    : akrutiToUnicode(input);
}
