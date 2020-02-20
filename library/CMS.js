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
    '${employee.first_name}' AND last_name = '${employee.last_name}' AND id = ${employee.id};`
    return template;
  }

  viewRole(role) {
    const template = `SELECT title, id, salary, department_id FROM roles WHERE title = '${role.title}' AND id = ${role.id};`;
    return template;
  }

  viewDept(dept) {
    const template = `SELECT name, id FROM departments WHERE name = '${dept.name}';`;
    return template;
  }

  addEmployee(employee) {
    if (employee.manager_id) {
      var template = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
      (${ employee.first_name}, ${employee.last_name}, ${employee.role_id}, ${employee.manager_id});`;
    } else {
      var template = `INSERT INTO employees (first_name, last_name, role_id) VALUES 
    (${ employee.first_name}, ${employee.last_name}, ${employee.role_id});`;
    }
    return template;
  }

  addRole(role) {
    const template = `INSERT INTO roles(id, title, salary, department_id) VALUES
      (${ role.id}, ${role.title}, ${role.salary}, ${role.department_id}); `
    return template;
  }

  addDept(dept) {
    const template = `INSERT INTO departments(id, name) VALUES(${dept.id}, ${dept.name}); `
    return template;
  }

  updateEmployee(update, employee) {
    const fieldArray = update.field.split(":");
    const template = `UPDATE employees SET ${fieldArray[0]} = ${update.value} WHERE first_name = 
    '${employee.first_name}' AND last_name = '${employee.last_name}' AND id = ${employee.id};`
    return template;
  }

  updateRole(update, role) {
    const fieldArray = update.field.split(":");
    const template = `UPDATE roles SET ${fieldArray[0]} = ${update.value} WHERE 
    title = '${role.title}' AND id = ${role.id};`;
    return template;  
  }

  updateDept(update, dept) {
    const fieldArray = update.field.split(":");
    const template = `UPDATE departments SET ${fieldArray[0]} = ${update.value} WHERE name = '${dept.name}';`
    return template;  
  }

  deleteEmployee(employee) {
    const template = `DELETE FROM employees WHERE first_name = ${employee.first_name} AND 
    last_name = ${employee.last_name} AND id = ${employee.id};`;
    return template;
  }

  deleteRole(role) {
    const template = `DELETE FROM roles WHERE title = ${role.title} AND id = ${role.id};`;
    return template;
  }

  deleteDept(dept) {
    const template = `DELETE FROM departments WHERE name = ${dept.name};`;
    return template;
  }
}

module.exports = CMS;