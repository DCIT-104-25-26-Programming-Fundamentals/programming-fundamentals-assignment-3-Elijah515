// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
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

async function readMatrix(name) {
  const rows = parseInt(await askQuestion(`Enter number of rows for ${name}: `));
  const cols = parseInt(await askQuestion(`Enter number of columns for ${name}: `));

  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const line = await askQuestion(`Enter row ${i + 1} (${cols} numbers): `);
    const row = line.trim().split(/\s+/).map(Number);
    matrix.push(row);
  }
  return matrix;
}

function displayMatrix(matrix) {
  for (const row of matrix) {
    let line = "";
    for (const num of row) {
      line += num.toString().padStart(6);
    }
    console.log(line);
  }
}

function transpose(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = Array.from({ length: cols }, () => new Array(rows));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = matrix[i][j];
    }
  }
  return result;
}

function addMatrices(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = Array.from({ length: rows }, () => new Array(cols));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[i][j] = a[i][j] + b[i][j];
    }
  }
  return result;
}

function multiplyMatrices(a, b) {
  const rowsA = a.length;
  const colsA = a[0].length;
  const colsB = b[0].length;
  const result = Array.from({ length: rowsA }, () => new Array(colsB).fill(0));

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      let total = 0;
      for (let k = 0; k < colsA; k++) {
        total = total + a[i][k] * b[k][j];
      }
      result[i][j] = total;
    }
  }
  return result;
}

async function main() {
  console.log("PART A - Transpose");
  const matrixA = await readMatrix("Matrix");
  console.log("Original Matrix:");
  displayMatrix(matrixA);
  console.log("Transposed Matrix:");
  displayMatrix(transpose(matrixA));

  console.log("\nPART B - Addition");
  const m1 = await readMatrix("Matrix 1");
  const m2 = await readMatrix("Matrix 2");
  if (m1.length !== m2.length || m1[0].length !== m2[0].length) {
    console.log("Error: Both matrices must be the same size to add them.");
  } else {
    console.log("Sum Matrix:");
    displayMatrix(addMatrices(m1, m2));
  }

  console.log("\nPART C - Multiplication");
  const m3 = await readMatrix("Matrix A");
  const m4 = await readMatrix("Matrix B");
  if (m3[0].length !== m4.length) {
    console.log("Error: Number of columns in Matrix A must equal number of rows in Matrix B.");
  } else {
    console.log("Product Matrix:");
    displayMatrix(multiplyMatrices(m3, m4));
  }

  rl.close();
}

main();