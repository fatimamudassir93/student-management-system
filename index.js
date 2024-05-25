#! /usr/bin/env node
import inquirer from "inquirer";
// defining student class.
class student {
    static counter = 10000;
    ID;
    name;
    courses;
    balance;
    constructor(name) {
        this.ID = student.counter++;
        this.name = name;
        this.courses = []; // inializing empty array for coarses.
        this.balance = 100;
    }
    // method to enroll a student in a coarse.
    enroll_course(course) {
        this.courses.push(course);
    }
    // method to view student balance
    view_balance() {
        console.log(`Balance for ${this.name}: ${this.balance}$`);
    }
    // method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`${amount}$ fees paid successfully for ${this.name}`);
    }
    // Method to display student status
    show_status() {
        console.log(`ID: ${this.ID}`);
        console.log(`Name: ${this.name}`);
        console.log(`courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
// Defining a student manager class to manage student.
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add new student.
    add_student(name) {
        let Student = new student(name);
        this.students.push(Student);
        console.log(`Student :${name} added successfully. student ID: ${Student.ID}`);
    }
    // Method to enroll a student in a coarse,
    enroll_student(student_ID, course) {
        let student = this.find_student(student_ID);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in a ${course} successfully`);
        }
    }
    // method to view student balance.
    view_student_balance(student_ID) {
        let student = this.find_student(student_ID);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("student not found. please enter a correct student ID");
        }
    }
    // Method to pay student fees.
    pay_student_fees(student_ID, amount) {
        let student = this.find_student(student_ID);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("student not found. please enter a correct student ID");
        }
    }
    // Method to display student status.
    show_student_status(student_ID) {
        let student = this.find_student(student_ID);
        if (student) {
            student.show_status();
        }
    }
    // Method to find student by student id.
    find_student(student_ID) {
        return this.students.find(std => std.ID === student_ID);
    }
}
// Main function to run the whole program.
async function main() {
    console.log("WELCOME TO CODE WITH FATIMA STUDENT MANAGEMENT SYSTEM");
    console.log("-".repeat(50));
    let Student_Manager = new student_manager();
    //    while loop to keep program running.
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "select an option",
                choices: [
                    "Add student",
                    "Enroll student",
                    "view Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        // Using Switch case to handle User choice.
        switch (choice.choice) {
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student Name"
                    }
                ]);
                Student_Manager.add_student(name_input.name);
                break;
            case "Enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        tupe: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "coarse",
                        type: "input",
                        message: "Enter a coarse name",
                    }
                ]);
                Student_Manager.enroll_student(course_input.Student_id, course_input.coarse);
                break;
            case "view Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]);
                Student_Manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_ID",
                        type: "number",
                        message: "Enter student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter amount to pay"
                    }
                ]);
                Student_Manager.pay_student_fees(fees_input.student_ID, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student_id",
                    }
                ]);
                Student_Manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting....");
                process.exit();
        }
    }
}
// Calling a main function.
main();
