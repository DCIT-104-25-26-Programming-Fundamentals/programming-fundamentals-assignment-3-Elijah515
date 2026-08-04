// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 9
// =============================================================================
//
// TASK: Console-Based Simple Calculator
//
// Build a calculator program that runs in the console and performs basic
// arithmetic operations based on the user's input.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_09_simple_calculator.js
//
// -----------------------------------------------------------------------------
// OPERATIONS YOUR CALCULATOR MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Addition          ( + )    e.g.  10 + 3  =  13
//   2. Subtraction       ( - )    e.g.  10 - 3  =  7
//   3. Multiplication    ( * )    e.g.  10 * 3  =  30
//   4. Division          ( / )    e.g.  10 / 3  =  3.33
//   5. Modulus           ( % )    e.g.  10 % 3  =  1  (remainder)
//   6. Exponentiation    ( ** )   e.g.  2 ** 8  =  256
//   7. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        SIMPLE CALCULATOR
//   ============================
//   1. Addition
//   2. Subtraction
//   3. Multiplication
//   4. Division
//   5. Modulus
//   6. Exponentiation
//   7. Quit
//   Select an operation (1-7):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Select an operation (1-7): 4
//   Enter first number : 10
//   Enter second number: 3
//   Result: 10 / 3 = 3.33
//
//   Select an operation (1-7): 4
//   Enter first number : 5
//   Enter second number: 0
//   Error: Cannot divide by zero.
//
//   Select an operation (1-7): 7
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Each arithmetic operation MUST be written as its own function.
// - Use a loop so the calculator keeps running until the user selects Quit.
// - Division by zero must be caught and handled with a clear error message
//   (do NOT let the program crash).
// - Display results to 2 decimal places using .toFixed(2).
// - Handle invalid menu choices gracefully.
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return { success: false, result: null };
  }
  const result = Math.round((a / b) * 100) / 100;
  return { success: true, result: result };
}

function modulusOperation(a, b) {
  return a % b;
}

function exponent(a, b) {
  return Math.pow(a, b);
}

async function main() {
  while (true) {
    console.log("============================");
    console.log("     SIMPLE CALCULATOR");
    console.log("============================");
    console.log("1. Addition");
    console.log("2. Subtraction");
    console.log("3. Multiplication");
    console.log("4. Division");
    console.log("5. Modulus");
    console.log("6. Exponentiation");
    console.log("7. Quit");

    const choice = parseInt(await askQuestion("Select an operation (1-7): "));

    if (choice === 7) {
      console.log("Goodbye!");
      break;
    } else if (choice >= 1 && choice <= 6) {
      const num1 = parseFloat(await askQuestion("Enter first number : "));
      const num2 = parseFloat(await askQuestion("Enter second number: "));

      if (choice === 1) {
        console.log(`Result: ${num1} + ${num2} = ${add(num1, num2)}`);
      } else if (choice === 2) {
        console.log(`Result: ${num1} - ${num2} = ${subtract(num1, num2)}`);
      } else if (choice === 3) {
        console.log(`Result: ${num1} * ${num2} = ${multiply(num1, num2)}`);
      } else if (choice === 4) {
        const { success, result } = divide(num1, num2);
        if (!success) {
          console.log("Error: Cannot divide by zero.");
        } else {
          console.log(`Result: ${num1} / ${num2} = ${result}`);
        }
      } else if (choice === 5) {
        console.log(`Result: ${num1} % ${num2} = ${modulusOperation(num1, num2)}`);
      } else if (choice === 6) {
        console.log(`Result: ${num1} ^ ${num2} = ${exponent(num1, num2)}`);
      }
    } else {
      console.log("Error: Invalid choice. Please enter a number between 1 and 7.");
    }
  }

  rl.close();
}

main();
