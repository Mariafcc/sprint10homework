const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output"); //makes a folder called output
const outputPath = path.join(OUTPUT_DIR, "team.html"); //html inside folder

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
const team = [];

const createManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the managers name?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the managers ID?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is the managers Email?",
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the managers Office Number?",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.managerName,
        answers.managerId,
        answers.managerEmail,
        answers.managerOfficeNumber
      );
      team.push(manager);
      makeTeam();
    });
};

createManager();

const makeTeam = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "teamMember",
        message: "Which team member would you like to add?",
        choices: ["Engineer", "Intern", "No more team member"],
      },
    ])
    .then((choice) => {
      switch (choice.teamMember) {
        case "Engineer":
          createEngineer();
          break;
        case "Intern":
          createIntern();
          break;
        default:
          buildTeam();
      }
    });
};

const createEngineer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is the engineers name?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is the engineers ID?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is the engineers Email?",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is the engineers GitHub?",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.engineerName,
        answers.engineerId,
        answers.engineerEmail,
        answers.engineerOfficeNumber
      );
      team.push(engineer);
      makeTeam();
    });
};

const createIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is the interns name?",
      },
      {
        type: "input",
        name: "internId",
        message: "What is the interns ID?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is the interns Email?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is the interns school?",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.internName,
        answers.internId,
        answers.internEmail,
        answers.internSchool
      );
      team.push(intern);
      makeTeam();
    });
};

const buildTeam = () => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(team), "utf-8");
};
