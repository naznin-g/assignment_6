


#### 1) What is the difference between var, let, and const?
 The difference
var is function-scoped and can be redeclared and reassigned.
 let and const are block-scoped. 
 let allows reassignment but not redeclaration, while const prevents both. 

#### 2) What is the difference between map(), forEach(), and filter()?
map()  method creates a new array by transforming each element in the original array based on the return value of a provided callback function. The original array remains unchanged.
forEach() method iterates over each element in an array and executes a provided callback function for each element. It does not create a new array or return any value; it primarily focuses on performing side effects for each element.

filter() method creates a new array containing only the elements from the original array that satisfy a specified condition. The condition is determined by a provided callback function, which should return true to include the element and false to exclude it. The original array remains unchanged.

#### 3) What are arrow functions in ES6?
 const add = function(a, b) {
      return a + b;
    };
    const addArrow=(a,b)=>a+b;
    They eliminate the need for the function keyword and often allow for implicit returns and omission of curly braces and parentheses, depending on the function's structure.


#### 4) How does destructuring assignment work in ES6?
Destructuring assignment allows for the extraction of values from arrays or properties from objects into distinct variables. This feature provides a more concise and readable way to access and assign data compared to traditional methods. 
benifits:
Array Destructuring:
Values are extracted from an array based on their position.
Object Destructuring:
Properties are extracted from an object based on their property names.

#### 5) Explain template literals in ES6. How are they different from string concatenation?
Template literals provide a more flexible and readable way to work with strings compared to traditional string concatenation. 
They are defined using backticks (`` ` ``) instead of single or double quotes.
They allow embedding expressions directly within the string using the ${expression} syntax. This means variables, function calls, or any valid JavaScript expression can be placed inside the string and their evaluated value will be inserted.
They natively support multi-line strings without requiring explicit newline characters (\n). The line breaks within the backticks are preserved. 
whereas,
Traditional string concatenation in JavaScript typically involves using the + operator to join multiple strings and variables.

