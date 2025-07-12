import { yngpingTypingCursiveFinalToneMap } from './mapping';
import { yngpingInitialPattern } from './phonetics';

export const makeYngpingRubyInner = (
  text: string,
  yngping: string,
  rubyClass: string = '',
  helper: CallableFunction = makeYngCursive
): string => {
  if (!text || !yngping) {
    return '';
  }

  const chars = text.trim().split('');
  const charProns = yngping.trim().split(' ');
  //  TODO: <sub>

  if (charProns.length !== chars.length) {
    return `<span class="rb">${text}</span><rp>(</rp><rt class="${rubyClass}">${helper(yngping)}</rt><rp>)</rp>`;
  } else {
    let rubyString = '';
    for (let i = 0; i < chars.length; i++) {
      rubyString += `<span class="rb">${chars[i]}</span><rp>(</rp><rt class="${rubyClass}">${helper(charProns[i])}</rt><rp>)</rp>`;
    }
    return rubyString;
  }
};

export const makeYngpingSup = (yngping: string): string => {
  const tone = yngping.match(/\d+$/);
  const yngpingLetter = yngping.replace(/\d+$/, '');
  return tone ? `${yngpingLetter}<sup>${tone}</sup>` : yngping;
};

export const makeYngpingsSup = (yngping: string): string => {
  const yngpings = yngping.trim().split(' ');
  return yngpings.map(makeYngpingSup).join('');
};

export const makeYngCursive = (yngping: string): string => {
  const initialMatch = yngping.match(yngpingInitialPattern);
  const initial = initialMatch ? initialMatch[0] : '';
  const finalAndTone =
    yngpingTypingCursiveFinalToneMap[yngping.slice(initial.length)];

  return `${initial}${finalAndTone}` == '' ? '' : `&thinsp;${initial}${finalAndTone}&thinsp;`;
};

export const replaceChineseQuotes = (text: string): string => {
  return text
    .replace(/“/g, '「') // 左引号“ → 「
    .replace(/”/g, '」'); // 右引号” → 」
};
