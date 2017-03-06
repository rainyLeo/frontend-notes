Methods of String


Method | Description
------------- | -------------
charAt, charCodeAt, codePointAt | Returns the character or character code at the specified position in string
indexOf, lastIndexOf | Return the postition of specified substring in the string or last position of specifed substring, respectively
starsWith, endsWith, includes | Returns whether or not the string starts, ends or contains a specified string
concat | Combines the text of two string and returns a new string
fromCharCode, fromCodePoint | Constructs a string from the specified sequence of Unicode values. This is a method of the String class, not a String instance
split | Splits String object into an array of strings by separating the string into substrings
slice | Extracs a section of a string and returns a new string
substring, substr | Return the specifed subset of the string, either by specifying the start and end indexes or the start index and a length
match, replace, search | Work with regular expressions
toLowerCase, toUpperCase | Returns the string in all lowercase or all uppercase, respectively
normalize | Returns the Unicode Normalization Form of the calling string value
repeat | Returns a string consisting of the elements of the object repeated the given times
trim | Trims whitespace from the beginning and end of the string
  
  
```
var s = new String("foo"); // Creates a String object
console.log(s); // Displays: { '0': 'f', '1': 'o', '2': 'o'}
typeof s; // Returns 'object'
```
