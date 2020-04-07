Array.prototype.isPalindromed = function() {
  for (let it = 0; it < this.length; it++) {
    if (it < this.length/2) {
      if (this[it] != this[this.length-it-1]) 
        return false 
    } else {
      break
    }
  } 
  return true
};

let palindrome = (str) => str
  .toLowerCase()
  .match(/[a-zA-Z0-9]/g)
  .isPalindromed()  

palindrome("not a palindrome")
