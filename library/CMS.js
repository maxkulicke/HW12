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

  viewAllTemplate(table) {
    const template = `SELECT * FROM ${table};`;
    return template;
  }

  viewEmployee(employee) {
    const template = `SELECT first_name, last_name, id, role_id FROM employees WHERE first_name = 
    ${employee.first_name} AND last_name = ${employee.last_name};`;
    return template;
  }

  viewRole(role) {
    const template = `SELECT name, id, salary, department_id FROM roles WHERE name = ${role.name};`;
    return template;
  }

  viewDept(dept) {
    const template = `SELECT name, id FROM departments WHERE name = ${dept.name};`;
    return template;
  }

  addEmployee(employee) {
    console.log("called addEmployee!");
    if (employee.manager_id) {
      var template = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
      (${ employee.first_name}, ${employee.last_name}, ${employee.role_id}, ${employee.manager_id});`;
    } else {
      var template = `INSERT INTO employees (first_name, last_name, role_id) VALUES 
    (${ employee.first_name}, ${employee.last_name}, ${employee.role_id});`;
    }
    console.log(`cms addEmployee template: ${template}`);
    return template;
  }

  addRole(role) {
    console.log("called addRole!");
    const template = `INSERT INTO roles(id, title, salary, department_id) VALUES
      (${ role.id}, ${role.title}, ${role.salary}, ${role.department_id}); `
    return template;
  }

  addDept(dept) {
    console.log("called addDept!");
    const template = `INSERT INTO departments(id, name) VALUES(${dept.id}, ${dept.name}); `
    return template;
  }

  updateEmployee(employee) {
    console.log("called updateEmployee!");
  }

  updateRole(role) {
    console.log("called updateRole!");
  }

  updateDept(dept) {
    console.log("called updateDept!");
  }

  deleteEmployee(employee) {
    console.log("called deleteEmployee!");
    const template = `DELETE FROM employees WHERE first_name = 
    ${employee.first_name} AND last_name = ${employee.last_name};`;
    return template;
  }

  deleteRole(role) {
    console.log("called deleteRole!");
    const template = `DELETE FROM roles WHERE name = ${role.name};`;
    return template;
  }

  deleteDept(dept) {
    console.log("called deleteDept!");
    const template = `DELETE FROM departments WHERE name = ${dept.name};`;
    return template;
  }

}

module.exports = CMS;