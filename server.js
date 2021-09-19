// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require("console.table");

const PORT = 3306;

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    port: PORT,
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'password',
    database: 'ems_db',
  },
  console.log(`Connected to the employee database.`)
);

function init(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'wantTo',
            message: 'Choose a following option',
            choices: [
                'add a department', 
                'add a role', 
                'add an employee',
                'view all departments', 
                'view all roles', 
                'view all employees', 
                'update an employee role', 
                'Exit',
            ],
        }
        
    ]).then( (userInput) => {
            switch(userInput.wantTo){
                case 'add a department':
                    addDepartments();
                    break;
                case 'add a role':
                    addRoles();
                    break; 
                case 'add an employee':
                    addEmployee();
                    break; 
                case 'view all departments':
                    viewAllDepartment();
                    break; 
                case 'view all roles':
                    viewAllRoles();
                    break; 
                case 'view all employees':
                    viewAllEmployee();
                    break;   
                case 'update an employee role':
                    updateEmployeeRole();
                    break;      
                default:
                    console.log('Exit Successful!');
            }
    })
    
    function addDepartments(){
        inquirer.prompt([
            {
                type: "input",
                name: "departmentId",
                message: "What is the department ID? ",
            },
            {   
                type: 'input',
                name: 'departmentName',
                message: 'what is the department name? ',
                        
            }
    
        ]).then( (userInput) => {
                // Insert a new data into the db
                db.query(`INSERT INTO department VALUES (${userInput.departmentId}, '${userInput.departmentName}')`), (err) =>{
                    //Throw error is found duplicate
                    if (err){
                        throw err; 
                    } 
                }
                console.log(`Department ID: ${userInput.departmentId} and Department Name: ${userInput.departmentName} was added successfully to database!`);; 
                init(); 
        });
    }

    function addRoles(){
        inquirer.prompt([
            {
                type: "input",
                name: "roleId",
                message: "What is the role ID? ",
            },
            {   
                type: 'input',
                name: 'employeeTitle',
                message: 'what is the employee title? ',
                        
            },
            {   
                type: 'input',
                name: 'salary',
                message: 'what is the salary? ',
                        
            },
            {   
                type: 'input',
                name: 'departmentId',
                message: 'what is the department ID? ',
                        
            }
    
        ]).then( (userInput) => {
                // Insert a new data into the db
                db.query(`INSERT INTO roles VALUES (${userInput.roleId}, '${userInput.employeeTitle}', ${userInput.salary} , ${userInput.departmentId})`), (err) =>{
                    //Throw error is found duplicate
                    if (err){
                        throw err; 
                    } 
                }
                console.log(`Role ID: ${userInput.roleId}, Employee Title: ${userInput.employeeTitle}, Salary: ${userInput.salary} and Department ID: ${userInput.departmentId}
                was added successfully to database!`);; 
                init(); 
        });
    }

    function addEmployee(){
        inquirer.prompt([
            {
                type: "input",
                name: "employeeId",
                message: "What is the employee ID? ",
            },
            {   
                type: 'input',
                name: 'firstName',
                message: 'what is the first name? ',
                        
            },
            {   
                type: 'input',
                name: 'lastName',
                message: 'what is the last name? ',
                        
            },
            {   
                type: 'input',
                name: 'roleID',
                message: 'what is the role ID? ',
                        
            },
            {   
                type: 'input',
                name: 'managerID',
                message: 'what is the manager ID? (Enter NULL if no manager ID) ',
                        
            }
    
        ]).then( (userInput) => {
                // Insert a new data into the db
                db.query(`INSERT INTO employee VALUES (${userInput.employeeId}, '${userInput.firstName}', '${userInput.lastName}' , ${userInput.roleID} , ${userInput.managerID})`), (err) =>{
                    //Throw error is found duplicate
                    if (err){
                        throw err; 
                    } 
                }
                console.log(`Employee ID: ${userInput.employeeId}, Employee First Name: ${userInput.firstName}, Employee Last Name: ${userInput.lastName}, 
                Role ID: ${userInput.roleID} and Manager ID: ${userInput.managerID} was added successfully to database!`);; 
                init(); 
        });
    }

    function viewAllDepartment(){
        db.query(`SELECT * FROM department`, function (err, res) {
            if (err) throw err;
            console.table(res);
            init(); 
        });
    }
    
    function viewAllRoles(){
        db.query(`SELECT * FROM roles`, function (err, res) {
            if (err) throw err;
            console.table(res);
            init(); 
        });
    }

    function viewAllEmployee(){
        db.query(`SELECT * FROM employee`, function (err, res) {
            if (err) throw err;
            console.table(res);
            init(); 
        });
    }

    function updateEmployeeRole(){
        inquirer.prompt([
            {
                type: "input",
                name: "roleID",
                message: "Enter the role ID that you want to update: ",
            },
            {
                type: "input",
                name: "newTitle",
                message: "Enter the new title: ",
            },
            {
                type: "input",
                name: "newSalary",
                message: "Enter the new salary: ",
            },
        ]).then( (userInput) => {
                db.query(`UPDATE roles SET employee_title = '${userInput.newTitle}', employee_salary = ${userInput.newSalary} WHERE role_id = ${userInput.roleID}`, 
                function (err) {
                    if (err) throw err;
                    
                    db.query(`SELECT * FROM roles`, function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        init(); 
                    });
                })
            });
            
    }

}

init();

