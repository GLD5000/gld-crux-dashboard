export function capitaliseFirstLetter(stringIn: string) {
  const first = `${stringIn[0]}`.toUpperCase();
  const rest = stringIn.slice(1).toLowerCase();
  return `${first}${rest}`;
}
export function capitaliseFirstLetterNonExclusive(stringIn: string) {
  const first = `${stringIn[0]}`.toUpperCase();
  const rest = stringIn.slice(1);
  return `${first}${rest}`;
}

export function capitaliseFirstLetters(stringIn: string) {
  const modifiedString = stringIn
    .split(" ")
    .map(capitaliseFirstLetterNonExclusive)
    .join(" ");
  return `${modifiedString}`;
}

export function encodeHTMLEntities(text: string) {
  const textArea = document.createElement("encodeHTMLEntities");
  textArea.innerText = text;
  return textArea.innerHTML;
}
export function decodeHTMLEntities(text: string) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

export function decodeAllSafe(encodedURI: string) {
  try {
    return decodeURIComponent(decodeHTMLEntities(encodedURI)); // eslint-disable-next-line
  } catch (e) {
    return encodedURI; // Return the original URI if decoding fails
  }
}
