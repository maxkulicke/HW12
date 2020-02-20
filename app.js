const mysql = require('mysql');
const CMS = require("./library/CMS");
var inquirer = require("inquirer");


const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'yourRootPassword',
  database: 'employeesDB'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  start();
});

const cms = new CMS("Max's CMS");


async function start() {
  try {
    const action = await actionPrompt();
    if (action.action === "exit") {
      connection.end();
      return;
    }
    const category = await categoryPrompt(action);
    if (category.category === "return home") {
      start();
    } else {
      actionChooser(action.action, category.category);
    }
  } catch (err) {
    console.log(err);
  }
}


function returnHome() {
  inquirer.prompt({
    name: "return",
    type: "list",
    message: "Would you like to return home? Selecting 'no' will end the program...",
    choices: ["yes", "no"]
  }).then(function (answer) {
    if (answer.return === "yes") {
      start();
      return;
    } else {
      connection.end();
      return;
    }
  })
}


function actionPrompt() {
  const action = inquirer.prompt({
    name: "action",
    type: "list",
    message: "Welcome to your employer database management system! What would you like to do?",
    choices: ["view", "update", "add", "delete", "exit"]
  })
  return action;
}


function categoryPrompt(action) {
  const category = inquirer.prompt({
    name: "category",
    type: "list",
    message: `What would you like to ${action.action}?`,
    choices: ["employee", "role", "department", "return home"]
  })
  return category;
}


function actionChooser(action, category) {
  switch (action) {
    case "view":
      viewRunner(category);
      break;
    case "update":
      updateRunner(category);
      break;
    case "add":
      addRunner(category);
      break;
    case "delete":
      deleteRunner(category);
      break;
    default:
      break;
  }
}


// does this need to be async?
async function addRunner(category) {
  try {
    switch (category) {
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


function deleteRunner(category) {
  inquirer.prompt([
    {
      name: "confirm",
      type: "list",
      message: `Are you sure you want to delete one of your ${category}s? This action will be permanent.`,
      choices: ["yes", "no"]
    }
  ]).then(function (answer) {
    if (answer.confirm === "no") {
      start();
      return;
    } else {
      switch (category) {
        case "employee":
          var allQuery = cms.viewAllTemplate(`employees`);
          selectObjectMaker(category, allQuery, "delete");
          break;
        case "role":
          var allQuery = cms.viewAllTemplate(`roles`);
          selectObjectMaker(category, allQuery, "delete");
          break;
        case "department":
          var allQuery = cms.viewAllTemplate(`departments`);
          selectObjectMaker(category, allQuery, "delete");
          break;
        default:
          break;
      }
    }
  })
}


function viewRunner(category) {
  switch (category) {
    case "employee":
      var allQuery = cms.viewAllTemplate(`employees`);
      selectObjectMaker(category, allQuery, "view");
      break;
    case "role":
      var allQuery = cms.viewAllTemplate(`roles`);
      selectObjectMaker(category, allQuery, "view");
      break;
    case "department":
      var allQuery = cms.viewAllTemplate(`departments`);
      selectObjectMaker(category, allQuery, "view");
      break;
    default:
      break;
  }
}


function updateRunner(category) {
  switch (category) {
    case "employee":
      var allQuery = cms.viewAllTemplate(`employees`);
      selectObjectMaker(category, allQuery, "update view");
      break;
    case "role":
      var allQuery = cms.viewAllTemplate(`roles`);
      selectObjectMaker(category, allQuery, "update view");
      break;
    case "department":
      var allQuery = cms.viewAllTemplate(`departments`);
      selectObjectMaker(category, allQuery, "update view");
      break;
    default:
      break;
  }
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
    queryMaker(employee, "add", "employee");
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
    queryMaker(role, "add", "role");
  })
}


function getDepartmentInfo() {
  inquirer.prompt([
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
    queryMaker(department, "add", "department");

  })
}


function selectObjectMaker(category, allQuery, action) {
  switch (category) {
    case "employee":
      connection.query(allQuery, async function (err, res) {
        var selection = await selector(`employee`, res);
        const names = selection.selection.split(" ");

        const employee = {
          first_name: names[0],
          last_name: names[1],
          id: parseInt(names[3]),
          manager_id: names[6]
        };
        queryMaker(employee, action, category);
      });
      break;
    case "role":
      connection.query(allQuery, async function (err, res) {
        var selection = await selector(`role`, res);
        const names = selection.selection.split(" ");
        var titleString = ``;
        var idString = ``;
        for (var i = 0; i < names.length; i++) {
          if (names[i + 1] === "id:") {
            idString += names[i + 2]
            titleString += `${names[i].substring(0, names[i].length)}`
            i = names.length;
          } else {
            titleString += `${names[i].substring(0, names[i].length)} `
          }
        }

        const role = {
          title: titleString,
          id: idString
        };
        queryMaker(role, action, category);
      });
      break;
    case "department":
      connection.query(allQuery, async function (err, res) {
        var selection = await selector(`department`, res);
        const names = selection.selection.split(" ");
        var nameString = ``;
        var idString = ``;
        for (var i = 0; i < names.length; i++) {
          if (names[i + 1] === "id:") {
            idString += names[i + 2]
            nameString += `${names[i].substring(0, names[i].length)}`
            i = names.length;
          } else {
            nameString += `${names[i].substring(0, names[i].length)} `
          }
        }

        const dept = {
          name: nameString,
          id: idString
        };
        queryMaker(dept, action, category);
      });
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
        return `${object.first_name} ${object.last_name} id: ${object.id} 
        manager id: ${object.manager_id}`;
      })
      break;
    case "department":
      choicesArray = results.map(function roleGetter(object) {
        return `${object.name} id: ${object.id}`;
      })
      break;
    case "role":
      choicesArray = results.map(function roleGetter(object) {
        return `${object.title} id: ${object.id} salary: ${object.salary} 
        department id: ${object.department_id}`;
      })
      break;
    default:
      break;
  }

  const selection = await inquirer.prompt(
    {
      name: "selection",
      type: "list",
      message: `Which ${category} would you like to select?`,
      choices: choicesArray
    });
  return selection;
}


function queryMaker(object, action, category) {
  var query = ``;
  switch (category) {
    case "employee":
      switch (action) {
        case "add":
          query = cms.addEmployee(object);
          break;
        case "update view":
          query = cms.viewEmployee(object);
          break;
        case "delete":
          query = cms.deleteEmployee(object);
          break;
        case "view":
          query = cms.viewEmployee(object);
          break
        default:
          break;
      }
      break;

    case "role":
      switch (action) {
        case "add":
          query = cms.addRole(object);
          break;
        case "update view":
          query = cms.viewRole(object);
          break;
        case "delete":
          query = cms.deleteRole(object);
          break;
        case "view":
          query = cms.viewRole(object);
          break
        default:
          break;
      }
      break;

    case "department":
      switch (action) {
        case "add":
          query = cms.addDept(object);
          break;
        case "update view":
          query = cms.viewDept(object);
          break;
        case "delete":
          query = cms.deleteDept(object);
          break;
        case "view":
          query = cms.viewDept(object);
          break
        default:
          break;
      }
      break;
    default:
      break;
  }
  querySender(query, action, category);
}


function updateField(objectArray, category) {
  var object = objectArray[0];
  var fields = [];
  switch (category) {
    case "employee":
      fields = [`first_name: ${object.first_name}`, `last_name: ${object.last_name}`,
      `role_id: ${object.role_id}`, `manager_id: ${object.manager_id}`];
      break;
    case "role":
      fields = [`title: ${object.title}`, `id: ${object.id}`,
      `salary: ${object.salary}`, `department_id: ${object.department_id}`]
      break;
    case "department":
      fields = [`name: ${object.name}`, `id: ${object.id}`]
      break;
    default:
      break
  }
  inquirer.prompt([
    {
      name: "field",
      type: "list",
      message: "Which field would you like to update?",
      choices: fields
    },
    {
      name: "value",
      type: "input",
      message: "What is the new entry for this field?",
    },
    {
      name: "confirm",
      type: "list",
      message: "Do you confirm this change? This change will be permanent...",
      choices: ["yes", "no"]
    },
    // {
    //   name: "updateAgain",
    //   type: "list",
    //   message: `Would you like to update another field for this ${category}?`,
    //   choices: ["yes", "no"]
    // }
  ]).then(function (answer) {
    switch (category) {
      case "employee":
        var query = cms.updateEmployee(answer, object);
        querySender(query, "update", "employee")
        break;
      case "role":
        var query = cms.updateRole(answer, object);
        querySender(query, "update", "role")
        break;
      case "department":
        var query = cms.updateDept(answer, object);
        querySender(query, "update", "department")
        break;
      default:
        break
    }
    // if (answer.updateAgain === "yes") {
    //   updateField(objectArray, category);
    // }
  });
}


function querySender(query, action, category) {
  if (action === "add" || action === "delete" || action === "update") {
    inquirer.prompt([
      {
        name: "confirm",
        type: "list",
        message: `Do you confirm this query:   ${query}`,
        choices: ["yes", "no"]
      }
    ]).then(function (answer) {
      if (answer.confirm === "yes") {
        switch (action) {
          case "add":
            connection.query(query, function (err, res) {
              console.log(`Your database addition confirmed!`)
              returnHome();
            });
            break;
          case "delete":
            connection.query(query, function (err, res) {
              console.log(`Your database deletion confirmed!`)
              returnHome();
            });
            break;
          case "update":
            connection.query(query, function (err, res) {
              console.log(`Your database update confirmed!`)
              returnHome();
            });
            break;
          default:
            break;
        }
      } else {
        returnHome();
      }
    });

  } else {
    switch (action) {
      case "view":
        connection.query(query, function (err, res) {
          console.log(res);
          returnHome();
        });
        break;
      case "update view":
        connection.query(query, function (err, res) {
          updateField(res, category);
        });
        break;
    }
  }
}
