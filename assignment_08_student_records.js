// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
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

async function addStudent(students) {
  const student = { name: "", id: 0, scores: [] };

  student.name = await askQuestion("Student name: ");
  student.id = parseInt(await askQuestion("Student ID: "));

  const numScores = parseInt(await askQuestion("How many scores? "));
  for (let i = 0; i < numScores; i++) {
    const score = parseInt(await askQuestion(`Enter score ${i + 1}: `));
    student.scores.push(score);
  }

  students.push(student);
  console.log(`Student "${student.name}" added successfully.`);
}

function displayStudents(students) {
  if (students.length === 0) {
    console.log("No students added yet.");
    return;
  }

  console.log("-".repeat(60));
  console.log(
    "Name".padEnd(20) + "ID".padEnd(12) + "Scores".padEnd(18) + "Average"
  );
  console.log("-".repeat(60));

  for (const s of students) {
    const scoresStr = s.scores.join(", ");
    const total = s.scores.reduce((sum, score) => sum + score, 0);
    const avg = total / s.scores.length;

    const line =
      s.name.padEnd(20) +
      s.id.toString().padEnd(12) +
      scoresStr.padEnd(18) +
      avg.toFixed(2);

    console.log(line);
  }

  console.log("-".repeat(60));
}

async function calculateAverage(students) {
  const studentId = parseInt(await askQuestion("Enter student ID: "));

  for (const s of students) {
    if (s.id === studentId) {
      const total = s.scores.reduce((sum, score) => sum + score, 0);
      const avg = total / s.scores.length;
      console.log(`${s.name}'s average score: ${avg.toFixed(2)}`);
      return;
    }
  }

  console.log("Error: Student ID not found.");
}

async function main() {
  const students = [];

  while (true) {
    console.log("================================");
    console.log("   STUDENT RECORD SYSTEM MENU");
    console.log("================================");
    console.log("1. Add student");
    console.log("2. Display all students");
    console.log("3. Calculate average score");
    console.log("4. Quit");

    const choice = parseInt(await askQuestion("Enter your choice (1-4): "));

    if (choice === 1) {
      await addStudent(students);
    } else if (choice === 2) {
      displayStudents(students);
    } else if (choice === 3) {
      await calculateAverage(students);
    } else if (choice === 4) {
      console.log("Goodbye!");
      break;
    } else {
      console.log("Error: Invalid choice. Please enter a number between 1 and 4.");
    }
  }

  rl.close();
}

main();