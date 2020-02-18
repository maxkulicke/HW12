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
    choices: ["view", "update", "add", "delete", "exit"]
  })
  return action;
}

function choicePrompt(action) {
  const choice = inquirer.prompt({
    name: "choice",
    type: "list",
    message: `What would you like to ${action.action}?`,
    choices: ["employee", "role", "department", "return home"]
  })
  return choice;
}

function getEmployeeInfo() {
  inquirer.prompt([
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
    },
    {
      name: "manager_id",
      type: "input",
      message: "Enter this employees manager ID if known (hit enter if unknown)",
    },

  ]).then(function (answer) {
    const roleID = cms.getRoleID(answer.role);

    const employee = {
      first_name: answer.first_name,
      last_name: answer.last_name,
      role_id: roleID,
      manager_id: answer.manager_id
    }
    console.log(cms.addEmployee(employee));
    return employee;
  })
}

function getRoleInfo() {
  inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "What is the ID number of the role?",
    },
    {
      name: "title",
      type: "input",
      message: "What is the title of the role?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this role?",
    },
    {
      name: "department_id",
      type: "list",
      message: "What department is this role in? ",
      choices: ["100 - Management", "200 - Sales", "300 - Legal", "400 - Finance", "500 - HR"]
    }
  ]).then(function (answer) {
    const role = {
      id: answer.id,
      title: answer.title,
      salary: answer.salary,
      department_id: answer.department_id.substring(0, 3)
    }
    console.log(cms.addRole(role));
    return role;
  })
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
  ]).then(function (answer) {
    const department = {
      id: answer.id,
      name: answer.name,
    }
    console.log(cms.addDept(department));
    return department;
  })


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

async function addRunner(choice) {
  try {
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
  } catch (err) {
    console.log(err);
  }
}

function deleteRunner(choice) {
  switch (choice) {
    case "employee":
      var query = cms.viewAllTemplate(`employees`);
      connection.query(query, async function (err, res) {
        var selection = await selector(`employee`, res);
        const names = selection.selection.split(" ");
        const employee = {
          first_name: names[0],
          last_name: names[1]
        };
        const query = cms.deleteEmployee(employee);
        console.log(`query: ${query}`);
      });
      break;
    case "role":
      var query = cms.viewAllTemplate(`roles`);
      connection.query(query, async function (err, res) {
        var selection = await selector(`role`, res);
        const roleName = selection.selection.split(" ");
        const role = { name: roleName[0] };
        const query = cms.deleteRole(role);
        console.log(`query: ${query}`);
      });
      break;
    case "department":
      var query = cms.viewAllTemplate(`departments`);
      connection.query(query, async function (err, res) {
        var selection = await selector(`department`, res);
        const dept = { name: selection.selection };
        const query = cms.deleteDept(dept);
        console.log(`query: ${query}`);
      });
      break;
    default:
      break;
  }
}

function viewRunner(choice) {
  switch (choice) {
    case "employee":
      var query = cms.viewAllTemplate(`employees`);
      connection.query(query, async function (err, res) {
        var selection = await selector(`employee`, res);
        const names = selection.selection.split(" ");
        const employee = {
          first_name: names[0],
          last_name: names[1]
        };
        const query = cms.viewEmployee(employee);
        console.log(`query: ${query}`);
      });
      break;
    case "role":
      var query = cms.viewAllTemplate(`roles`);
      connection.query(query, async function (err, res) {
        var selection = await selector(`role`, res);
        const roleName = selection.selection.split(" ");
        const role = { name: roleName[0] };
        const query = cms.viewRole(role);
        console.log(`query: ${query}`);
      });
      break;
    case "department":
      var query = cms.viewAllTemplate(`departments`);
      connection.query(query, async function (err, res) {
        var selection = await selector(`department`, res);
        const dept = { name: selection.selection };
        const query = cms.viewDept(dept);
        console.log(`query: ${query}`);
      });
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

async function selector(category, results) {
  var choicesArray = [];
  switch (category) {
    case "employee":
      choicesArray = results.map(function nameGetter(object) {
        return `${object.first_name} ${object.last_name}`;
      })
      break;
    case "department":
      choicesArray = results.map(function roleGetter(object) {
        return `${object.name}`;
      })
      break;
    case "role":
      choicesArray = results.map(function roleGetter(object) {
        return `${object.title}`;
      })
      break;
    default:
      break;
  }

  console.log(`choices array: ${choicesArray}`);
  const selection = await inquirer.prompt(
    {
      name: "selection",
      type: "list",
      message: `Which ${category} would you like to select?`,
      choices: choicesArray
    });
  return selection;
}

async function querySender(query) {
  var results;
  connection.query(query, function (err, res) {
    console.log(res);
  })
  return results;
}