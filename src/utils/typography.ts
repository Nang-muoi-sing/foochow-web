export const makeYngpingRubyInner = (
  text: string,
  yngping: string,
  rubyClass: string = ''
): string => {
  const chars = text.trim().split('');
  const charProns = yngping.trim().split(' ');
  //  TODO: <sub>

  if (charProns.length !== chars.length) {
    return `<span class="rb">${text}</span><rp>(</rp><rt class="${rubyClass}">${makeYngpingSup(yngping)}</rt><rp>)</rp>`;
  } else {
    let rubyString = '';
    for (let i = 0; i < chars.length; i++) {
      rubyString += `<span class="rb">${chars[i]}</span><rp>(</rp><rt class="${rubyClass}">${makeYngpingSup(charProns[i])}</rt><rp>)</rp>`;
    }
    return rubyString;
  }
};

export const makeYngpingSup = (yngping: string): string => {
  const tone = yngping.match(/\d+$/);
  const yngpingLetter = yngping.replace(/\d+$/, '');
  return tone ? `${yngpingLetter}<sup>${tone}</sup>` : yngping;
};

export const replaceChineseQuotes = (text: string): string => {
  return text
    .replace(/“/g, '「') // 左引号“ → 「
    .replace(/”/g, '」'); // 右引号” → 」
};