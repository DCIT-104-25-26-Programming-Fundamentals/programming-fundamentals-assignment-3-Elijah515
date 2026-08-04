// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 3
// =============================================================================
//
// TASK: Array Statistics Calculator
//
// Write a JavaScript program that reads a collection of numbers from the user
// and computes key statistical values using separate functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_03_array_statistics.js
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT / OUTPUT EXAMPLE
// -----------------------------------------------------------------------------
//
//   How many numbers? 5
//   Enter number 1: 4
//   Enter number 2: 7
//   Enter number 3: 2
//   Enter number 4: 9
//   Enter number 5: 1
//
//   Results:
//   Sum:     23
//   Average: 4.6
//   Maximum: 9
//   Minimum: 1
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - You MUST implement each calculation in its own function (see scaffold).
// - You may NOT use JavaScript's built-in array methods like reduce(),
//   Math.max(), or Math.min(). Implement the logic yourself using loops.
// - N must be a positive integer. If the user enters 0 or a negative number,
//   print an error message and stop.
//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculateSum(numbers) {
  let total = 0;
  for (const num of numbers) {
    total = total + num;
  }
  return total;
}

function calculateAverage(numbers) {
  const total = calculateSum(numbers);
  const count = numbers.length;
  const average = total / count;
  return average;
}

function calculateMax(numbers) {
  let maxValue = numbers[0];
  for (const num of numbers) {
    if (num > maxValue) {
      maxValue = num;
    }
  }
  return maxValue;
}

function calculateMin(numbers) {
  let minValue = numbers[0];
  for (const num of numbers) {
    if (num < minValue) {
      minValue = num;
    }
  }
  return minValue;
}

async function main() {
  const n = await askQuestion("How many numbers? ");
  const numbers = [];

  for (let i = 0; i < n; i++) {
    const num = await askQuestion(`Enter number ${i + 1}: `);
    numbers.push(num);
  }

  const total = calculateSum(numbers);
  const avg = calculateAverage(numbers);
  const maxVal = calculateMax(numbers);
  const minVal = calculateMin(numbers);

  console.log("Results:");
  console.log("Sum: " + total);
  console.log("Average: " + avg);
  console.log("Maximum: " + maxVal);
  console.log("Minimum: " + minVal);

  rl.close();
}

function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(parseInt(answer));
    });
  });
}

main();