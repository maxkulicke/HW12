class CMS {

  constructor(name) {
    this.name = name;
  }

  actionChooser(action, choice) {
    console.log("made it into actionChooser");
    console.log(`${action} & ${choice}`);
    switch (action) {
      case "view":
        if (choice === "employee") {
          this.viewEmployee();
          break;
        } else if (choice === "role") {
          this.viewRole();
          break;
        } else {
          this.viewDept();
          break;
        }
      case "update":
        if (choice === "employee") {
          this.updateEmployee();
          break;
        } else if (choice === "role") {
          this.updateRole();
          break;
        } else {
          this.updateDept();
          break;
        }
      case "add":
        if (choice === "employee") {
          this.addEmployee();
          break;
        } else if (choice === "role") {
          this.addRole();
          break;
        } else {
          this.addDept();
          break;
        }
      case "delete":
        if (choice === "employee") {
          this.deleteEmployee();
          break;
        } else if (choice === "role") {
          this.deleteRole();
          break;
        } else {
          this.deleteDept();
          break;
        }
      default:
        break;
    }
  }

  viewEmployee(employee) {
    console.log("called viewEmployee!");
  }

  addEmployee() {
    console.log("called addEmployee!");
    connection.query(
              "INSERT INTO employees SET ?",
              {
                item_name: answer.item,
                category: answer.category,
                starting_bid: answer.startingBid || 0,
                highest_bid: answer.startingBid || 0
              },
              function(err) {
                if (err) throw err;
  }

  updateEmployee(employee) {
    console.log("called updateEmployee!");
  }

  deleteEmployee(employee) {
    console.log("called deleteEmployee!");
  }

  viewRole(role) {
    console.log("called viewRole!");
  }

  addRole() {
    console.log("called addRole!");
  }

  updateRole(role) {
    console.log("called updateRole!");
  }

  deleteRole(role) {
    console.log("called deleteRole!");
  }

  viewDept(dept) {
    console.log("called viewDept!");
  }

  addDept() {
    console.log("called addDept!");
  }

  updateDept(dept) {
    console.log("called updateDept!");
  }

  deleteDept(dept) {
    console.log("called deleteDept!");
  }

}

module.exports = CMS;