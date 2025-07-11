import {
  phonologyBanguaceFinalToneMap,
  phonologyBanguaceInitialMap,
  yngpingEndToneIPAMap,
  yngpingIPAFinalMap,
  yngpingIPAInitialMap,
  yngpingToneIPAMap,
  yngpingTypingCursiveFinalToneMap,
} from './mapping';

export const yngpingToIPA = (yngping: string): string => {
  if (yngping.trim().length === 0) {
    return '';
  }

  const syllables = yngping.split(' ');
  const initialPattern = /^(b|p|m|d|t|l|s|z|c|g|h|w|j|ng|nj|n)/;
  const tonePattern = /\d+$/;
  const results = [];

  for (let i = 0; i < syllables.length; i++) {
    const syllable = syllables[i];
    const initialMatch = syllable.match(initialPattern);
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
      final = yngpingIPAFinalMap['ng'];
    }

    tone =
      syllables.length === 1 || i !== syllables.length - 1
        ? yngpingToneIPAMap[tone]
        : yngpingEndToneIPAMap[tone];

    results.push(
      `${yngpingIPAInitialMap[initial]}${yngpingIPAFinalMap[final]}${tone}`
    );
  }
  return results.join(' ');
};

export const yngpingToCursive = (yngping: string): string => {
  if (yngping.trim().length === 0) {
    return '';
  }

  const syllables = yngping.split(' ');
  const initialPattern = /^(b|p|m|d|t|l|s|z|c|g|h|w|j|ng|nj|n)/;
  const results: string[] = [];

  for (let i = 0; i < syllables.length; i++) {
    const syllable = syllables[i];
    const initialMatch = syllable.match(initialPattern);

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
