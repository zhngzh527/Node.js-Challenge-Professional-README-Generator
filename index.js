// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");
const util = require("util");

// TODO: Create an array of questions for user input
const questions = () => {
  return inquirer.prompt([
    {
        type: "input",
        name: "github",
        message: "Please enter your GitHub Username (Required)",
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
      message: "What is your project title? (Required)",
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
      message: "Please enter a short description of your project (Required)",
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
      type: "input",
      name: "usage",
      message: "What does the user need to know about using the repo?",
    },
    {
        type: "input",
        name: "website",
        message: "Please enter your project website (Required)",
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
      message: "What's your email address? (Required)",
      validate: (emailInput) => {
        if (emailInput) {
          return true;
        } else {
          console.log("Please enter your email!");
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
    .then((res) => {
      writeToFile(res);
      console.log("Success! Check out your generatedREADME.md");
    });
}

// Function call to initialize app
init();