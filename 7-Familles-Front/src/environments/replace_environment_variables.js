// src/environments/replace_environment_variables.js
const fs = require("fs");

let template = fs.readFileSync("./src/environments/environment.template.ts").toString();

Object.keys(process.env).forEach((key) => {
  template = template.replaceAll(`\${${key}}`, process.env[key]);
});

fs.writeFileSync("./src/environments/environment.ts", template);
