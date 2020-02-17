const mysql = require('mysql');
const CMS = require("./library/CMS");
var inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourRootPassword',
  database: 'employeesDB'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  console.log(cms.name);
  start();
});

const cms = new CMS("test");

// connect to the mysql server and sql database

// function which prompts the user for what action they should take
async function start() {
  try {
    const action = await actionPrompt();
    if (action.action === "exit") {
      connection.end();
    }
    const choice = await choicePrompt(action);
    if (choice.choice === "return home") {
      start();
    } else {
      actionChooser(action.action, choice.choice);
    }
  } catch (err) {
    console.log(err);
  }
}

function actionPrompt() {
  const action = inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: ["view", "update", "add", "exit"]
  })
  return action;
}

function choicePrompt(action) {
  const choice = inquirer.prompt({
    name: "choice",
    type: "list",
    message: `What would you like to ${action}?`,
    choices: ["employee", "role", "department", "return home"]
  })
  return choice;
}

function actionChooser(action, choice) {
  console.log(`${action} & ${choice}`);
  switch (action) {
    case "view":
      viewRunner(choice);
      break;
    case "update":
      updateRunner(choice);
      break;
    case "add":
      addRunner(choice);
      break;
    case "delete":
      deleteRunner(choice);
      break;
    default:
      break;
  }
}

function addRunner(choice) {
  switch (choice) {
    case "employee":
      getEmployeeInfo();
      break;
    case "role":
      getRoleInfo();
      break;
    case "department":
      getDepartmentInfo();
      break;
    default:
      break;
  }
}

function deleteRunner(choice) {
  switch (choice) {
    case "employee":
      break;
    case "role":
      break;
    case "department":
      break;
    default:
      break;
  }
}

function viewRunner(choice) {
  switch (choice) {
    case "employee":
      let query = cms.viewAllEmployees();
      querySender(query);
      break;
    case "role":
      break;
    case "department":
      break;
    default:
      break;
  }
}

function updateRunner(choice) {
  switch (choice) {
    case "employee":
      break;
    case "role":
      break;
    case "department":
      break;
    default:
      break;
  }
}

function getEmployeeInfo() {
  const employeeInfo = inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "First Name:",
    },
    {
      name: "last_name",
      type: "input",
      message: "Last Name:",
    },
    {
      name: "role",
      type: "list",
      message: "What is this employee's role?",
      choices: ["CEO", "CFO", "CTO", "Lead Sales Rep", "Sales Rep", "Head Counsel",
        "Counsel", "Legal Analyst", "Assistant CFO", "Lead Accountant", "Accountant",
        "Head of Human Resources", "Human Resources Representative"]
    }
  ])

  const roleID = cms.getRoleID(employeeInfo.role);

  const employee = {
    first_name: employeeInfo.first_name,
    last_name: employeeInfo.last_name,
    role: employeeInfo.role,
    id: roleID
  }
  return employee;
}

function getRoleInfo() {
  const roleInfo = inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "What is the ID number of the role?",
    },
    {
      name: "name",
      type: "input",
      message: "What is the name of the role?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this role?",
    },
    {
      name: "department",
      type: "list",
      message: "What department is this role in? ",
      choices: ["100 - Management", "200 - Sales", "300 - Legal", "400 - Finance", "500 - HR"]
    }
  ])

  const role = {
    id: roleInfo.id,
    name: roleInfo.name,
    salary: roleInfo.salary,
    department: roleInfo.department
  }
  return role;
}

function getDepartmentInfo() {
  const departmentInfo = inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "What is the ID number of the department?",
    },
    {
      name: "name",
      type: "input",
      message: "What is the name of the department?",
    }
  ])

  const department = {
    id: departmentInfo.id,
    name: departmentInfo.name
  }
  return department;
}

const querySender = (query) => {
  connection.query(query, function (err, res) {
    console.log(res);
  })
}

// const createDB = () => {
//   connection.query(
//     "DROP DATABASE IF EXISTS employeesDB;

//     CREATE DATABASE employeesDB;

//     USE employeesDB;

//     CREATE TABLE employees (
//       id INT NOT NULL AUTO_INCREMENT,
//       first_name VARCHAR(30) NOT NULL,
//       last_name VARCHAR(30) NOT NULL,
//       role_id INT NOT NULL,
//       manager_id INT NULL,
//       PRIMARY KEY (id)
//     );

//     CREATE TABLE roles (
//       id INT NOT NULL,
//       title VARCHAR(30) NOT NULL,
//       salary DECIMAL(10,2) NOT NULL,
//       world_score INT NOT NULL,
//       PRIMARY KEY (id)
//     );

//     CREATE TABLE departments (
//       id INT NOT NULL,
//       name VARCHAR(30) NOT NULL,
//       PRIMARY KEY (id)
//     );"
//   )
// }

// //from in class:
// var mysql = require("mysql");
// var inquirer = require("inquirer");
// // create the connection information for the sql database
// var connection = mysql.createConnection({
//   host: "localhost",
//   // Your port; if not 3306
//   port: 3306,
//   // Your username
//   user: "root",
//   // Your password
//   password: "yourRootPassword",
//   database: "greatBay_DB"
// });