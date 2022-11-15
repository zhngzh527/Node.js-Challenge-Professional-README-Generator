// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");
// const util = require("util");

// TODO: Create an array of questions for user input
const questions = () => {
  return inquirer.prompt([
    {
        type: "input",
        name: "github",
        message: "Please enter your GitHub Username",
        validate: (githubInput) => {
          if (githubInput) {
            return true;
          } else {
            console.log("Please enter your GitHub username!");
            return false;
          }
        },
      },
    {
      type: "input",
      name: "title",
      message: "What is your project title?",
      validate: (projectTitle) => {
        if (projectTitle) {
          return true;
        } else {
          console.log("Please enter your project title!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "description",
      message: "Please enter a short description of your project",
      validate: (projectDescription) => {
        if (projectDescription) {
          return true;
        } else {
          console.log("Please enter your project description!");
          return false;
        }
      },
    },
    {
      type: "checkbox",
      name: "languages",
      message: "What did you build this project with? (Check all that apply)",
      choices: [
        "Javascript",
        "HTML",
        "CSS",
        "ES6",
        "jQuery",
        "Bootstrap",
        "Node.js",
      ],
    },
    {
      type: "list",
      name: "license",
      message: "Please select a license for your project:",
      choices: ["MIT", "APACHE(2.0)", "GPL(3.0)", "BSD(3)", "MPL(2.0)", "CDDL(1.0)", "EPL(2.0)", "None"],
      validate: (projectLicense) => {
        if (projectLicense) {
          return true;
        } else {
          console.log("Please choose a project license type!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "installation",
      message: "What command(s) should be run to install dependencies?",
      default: "npm install",
    },
    {
      type: "input",
      name: "test",
      message: "What command(s) should be run to run tests?",
      default: "npm test",
    },
    {
      type: "input",
      name: "usage",
      message: "What does the user need to know about using the repo?",
    },
    {
        type: "input",
        name: "website",
        message: "Please enter your project website",
        validate: (projectWebsite) => {
          if (projectWebsite) {
            return true;
          } else {
            console.log("Please enter your project website!");
            return false;
          }
        },
      },
    {
      type: "input",
      name: "email",
      message: "What's your email address?",
      validate: (emailInput) => {
        if (emailInput) {
          return true;
        } else {
          console.log("Please enter your email!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "contributing",
      message: "Please enter the contributor name(s) for this project:",
      validate: (contributorName) => {
        if (contributorName) {
          return true;
        } else {
          console.log("Please enter contributor(s) name!");
          return false;
        }
      },
    },
  ]);
};

// TODO: Create a function to write README file
const writeToFile = data => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./generatedREADME.md", data, err => {
      if (err) {
        reject(err);
        // return out of the function here to make sure the Promise doesn't accidentally execute resolve() too
        return;
      }
      // if everything went well, resolve Promise and send successful data to .then()
      resolve({
        ok: true,
        message: "File created!",
      });
    });
  });
};

// TODO: Create a function to initialize app
function init() {
  questions()
    .then((response) => generateMarkdown(response))
    // template literal send to writeToFile
    .then((response) => {
      writeToFile(response);
      console.log("Success! Check out your generatedREADME.md");
    });
}

// Function call to initialize app
init();