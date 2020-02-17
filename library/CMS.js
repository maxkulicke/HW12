class CMS {

  constructor(name) {
    this.name = name;
  }

  getRoleID(role) {
    switch (role) {
      case "CEO":
        return 101;
      case "CFO":
        return 102;
      case "CTO":
        return 103;
      case "Lead Sales Rep":
        return 201;
      case "Sales Rep":
        return 202;
      case "Head Counsel":
        return 301;
      case "Counsel":
        return 302;
      case "Legal Analyst":
        return 303;
      case "Assistant CFO":
        return 401;
      case "Lead Accountant":
        return 402;
      case "Accountant":
        return 403;
      case "Head of Human Resources":
        return 501;
      case "Human Resources Representative":
        return 502;
      default:
        break;
    }
  }

  viewEmployee(employee) {
    console.log("called viewEmployee!");
    const template = `SELECT first_name, last_name FROM employees WHERE first_name = 
    ${employee.first_name} AND last_name = ${employee.last_name};`;
    console.log(template);
    return template;
  }

  viewAllEmployees() {
    const template = `SELECT * FROM employees;`;
    console.log(`CMS template returned: ${template}`);
    return template;
  }

  addEmployee() {
    console.log("called addEmployee!");
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