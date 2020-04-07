const patterns =  [ 
  /^[1][\s]?[(][\d]{3}[)]/,  
  /[1][\s]?[\d]{3}[-\s]/, 
  /^[\d]{3}-[\d]{3}-/, 
  /^[\d]{10}$/,
  /^[(][\d]{3}[)][\d]{3}[-]/
]
 
const telephoneCheck = (str) => patterns.some(p => p.test(str));

telephoneCheck("555-555-5555");
