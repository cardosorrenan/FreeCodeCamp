const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const shift = function (char) {
  const positionChar = alphabet.indexOf(char)
  const newPosition = positionChar + 13
  if (positionChar != -1) {
    if (newPosition >= 26) 
      return alphabet[newPosition % alphabet.length]
    return alphabet[newPosition]
  }
  return char
}

const rot13 = (str) => str
  .split("")
  .map(a => shift(a))
  .join("")


rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.");
