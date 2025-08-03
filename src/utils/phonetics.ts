import {
  phonologyBanguaceFinalToneMap,
  phonologyBanguaceInitialMap,
  yngpingFengIPAEndToneMap,
  yngpingFengIPAFinalMap,
  yngpingFengIPAInitialMap,
  yngpingFengIPAToneMap,
  yngpingIPAFinalMap,
  yngpingIPAInitialMap,
  yngpingIPAToneMap,
  yngpingTypingCursiveFinalToneMap,
} from './mapping';

export const yngpingInitialPattern = /^(b|p|m|d|t|l|s|z|c|g|k|h|w|j|ng|nj|n)/;

const endWithLowercase = (str: string): boolean => {
  if (!str) return false;
  const code = str.charCodeAt(str.length - 1);
  return code >= 97 && code <= 122;
};

const parseBrace = (syllable: string): string => {
  if (!syllable.startsWith('{') || !syllable.endsWith('}')) {
    return syllable;
  }

  syllable = syllable.replace('{', '');
  syllable = syllable.replace('}', '');
  if (endWithLowercase(syllable)) {
    return syllable + '0';
  } else {
    return syllable;
  }
};

export const yngpingToIPA = (
  yngping: string,
  feng_style: boolean = false
): string => {
  if (yngping.trim().length === 0) {
    return '';
  }

  let initialMap, finalMap, toneMap, endToneMap;
  if (feng_style) {
    initialMap = yngpingFengIPAInitialMap;
    finalMap = yngpingFengIPAFinalMap;
    toneMap = yngpingFengIPAToneMap;
  } else {
    initialMap = yngpingIPAInitialMap;
    finalMap = yngpingIPAFinalMap;
    toneMap = yngpingIPAToneMap;
  }
  endToneMap = yngpingFengIPAEndToneMap;

  const syllables = yngping.split(' ');
  const tonePattern = /\d+$/;
  const results = [];

  for (let i = 0; i < syllables.length; i++) {
    const syllable = parseBrace(syllables[i]);
    const initialMatch = syllable.match(yngpingInitialPattern);
    let initial = initialMatch ? initialMatch[0] : '';
    const toneMatch = syllable.match(tonePattern);
    let tone: string | null = toneMatch ? toneMatch[0] : null;

    let remaining = initial ? syllable.slice(initial.length) : syllable;
    remaining = tone ? remaining.slice(0, -tone.length) : remaining;
    let final = remaining || '';

    if (tone === null) {
      console.error(`音节 "${syllable}" 的声调信息不完整`);
      return '';
    }

    // ng 既作声母也作韵母，当没有其他韵母时就是韵母
    if (initial === 'ng' && final === '') {
      initial = '';
      final = finalMap['ng'];
    }

    tone =
      !feng_style || syllables.length === 1 || i !== syllables.length - 1
        ? toneMap[tone]
        : endToneMap[tone];

    results.push(`${initialMap[initial]}${finalMap[final]}${tone}`);
  }
  return results.join(' ');
};

export const yngpingToCursive = (yngping: string): string => {
  if (yngping.trim().length === 0) {
    return '';
  }

  const syllables = yngping.split(' ');
  const results: string[] = [];

  for (let i = 0; i < syllables.length; i++) {
    const syllable = parseBrace(syllables[i]);
    const initialMatch = syllable.match(yngpingInitialPattern);

    const initial = initialMatch ? initialMatch[0] : '';
    const finalAndTone =
      yngpingTypingCursiveFinalToneMap[syllable.slice(initial.length)];

    results.push(`${initial}${finalAndTone}`);
  }

  return results.join(' ');
};

export const phonologyToBanguace = (
  phobologyInitial: string,
  phonologyFinal: string,
  phonologyTone: string
) => {
  const initial = phonologyBanguaceInitialMap[phobologyInitial] ?? '';
  const final =
    phonologyBanguaceFinalToneMap[`${phonologyFinal}${phonologyTone}`] ?? '';
  return `${initial}${final}`;
};

export const makeYngpingRubyInner = (
  text: string,
  yngping: string,
  rubyClass: string = '',
  syllableConvertor: CallableFunction = makeYngpingCursive,
  syllablesConvertor: CallableFunction = makeYngpingsCursive
  // processor: (str: string) => string = textProcessor.wrapAsterisks
): string => {
  if (!text || !yngping) {
    return `<span class="rb">${text}</span><rp>(</rp><rt class="${rubyClass}">${text}</rt><rp>)</rp>`;
  }

  const chars = text.trim().split('');
  const charProns = yngping.trim().split(' ');

  if (charProns.length !== chars.length) {
    return `<span class="rb">${text}</span><rp>(</rp><rt class="${rubyClass}">${syllablesConvertor(yngping)}</rt><rp>)</rp>`;
  } else {
    let rubyString = '';
    for (let i = 0; i < chars.length; i++) {
      rubyString += `<span class="rb">${chars[i]}</span><rp>(</rp><rt class="${rubyClass}">${syllableConvertor(charProns[i])}</rt><rp>)</rp>`;
    }
    return rubyString;
  }
};

export const makeYngpingSup = (yngping: string): string => {
  yngping = parseBrace(yngping);
  const tone = yngping.match(/\d+$/);
  const yngpingLetter = yngping.replace(/\d+$/, '');
  return tone ? `${yngpingLetter}<sup>${tone}</sup>` : yngping;
};

export const makeYngpingsSup = (yngping: string): string => {
  const yngpings = yngping.trim().split(' ');
  return yngpings.map(makeYngpingSup).join('');
};

export const makeYngpingCursive = (yngping: string): string => {
  yngping = parseBrace(yngping);
  const initialMatch = yngping.match(yngpingInitialPattern);
  const initial = initialMatch ? initialMatch[0] : '';
  const finalAndTone =
    yngpingTypingCursiveFinalToneMap[yngping.slice(initial.length)];

  return `${initial}${finalAndTone}` == '' ? '' : `${initial}${finalAndTone}`;
};

export const makeYngpingsCursive = yngpingToCursive;
