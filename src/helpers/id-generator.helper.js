export default function idGenerator({ length }) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
  const code = [];

  for (var i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * alphabet.length);
    const randomAlphabetElement = alphabet[randomNumber];

    code.push(randomAlphabetElement);
  }

  return code.join("");
}


