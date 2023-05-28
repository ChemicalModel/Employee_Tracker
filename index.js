// Importing necessary modules
const { prompt, default: inquirer } = require("inquirer");
const db = require("./db");
require("console.table");

// Function to prompt user for choice and execute relevant function
async function loadMainPrompts() {
    // Prompting user for choice
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                } 
            ]
        }
    ]);

    switch (choice) {
        case "VIEW_EMPLOYEES": {
            // Finding all employees and displaying them in a table
            const [rows] = await db.findAllEmployees();
            console.table(rows);
            break;
        }
        case "ADD_EMPLOYEE": {
            // Prompting user for employee details and adding the employee to the database
            const { addfirstname, addlastname, addroleid, addmgrid } =
                await prompt([
                    {
                        type: "input",
                        name: "addfirstname",
                        message: "What is the first name of the employee?"   
                    },
                    {
                        type: "input",
                        name: "addlastname",
                        message: "What is the last name of the employee?"   
                    },
                    {
                        type: "input",
                        name: "addroleid",
                        message: "What is the role ID of the employee?"   
                    },
                    {
                        type: "input",
                        name: "addmgrid",
                        message: "What is the manager ID of the employee (if applicable)?"   
                    }
                ]);
            const [rows] = await db.addEmployee(
                addfirstname, addlastname, addroleid, addmgrid || null);
            console.table(rows);
            break;
        }
        case "UPDATE_EMPLOYEE_ROLE": {
            // Prompting user for employee ID and new role ID and updating employee's role in the database
            const { employeeid, addnewroleid } =
                await prompt([
                    {
                        type: "input",
                        name: "employeeid",
                        message: "What is the ID of the employee you are updating?"   
                    },
                    {
                        type: "input",
                        name: "addnewroleid",
                        message: "What is the new role ID of the employee?"   
                    }
                ]);
            const [rows] = await db.updateRole(addnewroleid, employeeid);
            console.table(rows);
            break;
        }
        case "VIEW_ROLES": {
            // Finding all roles and displaying them in a table
            const [rows] = await db.findAllRoles();
            console.table(rows);
            break;
        }
        case "ADD_ROLE": {
            // Prompting user for role details and adding the role to the database
            const { addtitle, addsalary, adddptid } =
                await prompt([
                    {
                        type: "input",
                        name: "addtitle",
                        message: "What is the title of the role?"   
                    },
                    {
                        type: "input",
                        name: "addsalary",
                        message: "What is the salary for the role?"   
                    },
                    {
                        type: "input",
                        name: "adddptid",
                        message: "What is the department ID for the role?"   
                    }
                ]);
            const [rows] = await db.addRole(addtitle, addsalary, adddptid);
            console.table(rows);
            break;
        }
        case "VIEW_DEPARTMENTS": {
            // Finding all departments and displaying them in a table
            const [rows] = await db.findAllDepartments();
            console.table(rows);
            break;
        }
        case "ADD_DEPARTMENT": {
            // Prompting user for department name and adding it to the database
            const { addname } = await prompt([
                {
                    type: "input",
                    name: "addname",
                    message: "What is the name of the department you would like to add?"   
                }
            ]);
            const [rows] = await db.addDept(addname);
            console.table(rows);
            break;
        }
        default: {
            // Throwing an error if user inputs an invalid choice
            throw new Error(`Invalid choice: ${choice}`);
        }
    }
    // Recursively calling the function to allow user to keep inputting choices until they choose to exit
    await loadMainPrompts();
}

// Starting the function and handling any errors
loadMainPrompts().catch((err) => {
    console.log(err);
});
