const fs = require("fs");
const execSync = require("child_process").execSync;

const data = require("../package.json");

const getCurrentVersions = async () => {
  const now = new Date();
  const stamp = Math.floor(now.getTime() / 1000);
  const output = [];

  output.push("# Installed package versions vs. latest");
  output.push(`File version ${stamp}`);

  output.push("\n## Dependencies");

  Object.keys(data.dependencies).forEach((key) => {
    const latest = execSync(`npm view ${key} version`)
      .toString()
      .replace("\n", "");
    output.push(`${key}, ${data.dependencies[key]}, ${latest}`);
  });

  output.push("\n## Dev Dependencies");

  Object.keys(data.devDependencies).forEach((key) => {
    const latest = execSync(`npm view ${key} version`).toString();
    output.push(`${key}, ${data.devDependencies[key]}, ${latest}`);
  });

  fs.writeFileSync(`${__dirname}/version-${stamp}.txt`, output.join("\n"));
};

getCurrentVersions();
