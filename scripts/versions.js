const fs = require("fs");
const execSync = require("child_process").execSync;

const data = require("../package.json");

const getExactVersions = () => {
  const latest = execSync(`npm ls --json`).toString();
  const parsed = JSON.parse(latest);

  return Object.keys(parsed.dependencies).reduce((acc, cur) => {
    acc[cur] = parsed.dependencies[cur].version;
    return acc;
  }, {});
};

const getCurrentVersions = () => {
  const now = new Date();
  const stamp = Math.floor(now.getTime() / 1000);
  const exactVersion = getExactVersions();
  const output = [];

  console.log(
    `🚀 Generating a breakdown of installed packages, the installed version, and the latest on NPM. Please stand by~\n`
  );
  output.push("# Installed package versions vs. latest");
  output.push(`File version ${stamp}`);

  output.push("\n## Dependencies");

  Object.keys(data.dependencies).forEach((key) => {
    const latest = execSync(`npm view ${key} version`).toString().trim();
    // output.push(`${key}, ${data.dependencies[key]}, ${latest}`);
    output.push(`${key}, ${exactVersion[key]}, ${latest}`);
  });

  output.push("\n## Dev Dependencies");

  Object.keys(data.devDependencies).forEach((key) => {
    const latest = execSync(`npm view ${key} version`).toString();
    // output.push(`${key}, ${data.devDependencies[key]}, ${latest}`);
    output.push(`${key}, ${exactVersion[key]}, ${latest}`);
  });

  const file = `${__dirname}/version-${stamp}.txt`;
  fs.writeFileSync(file, output.join("\n"));
  console.log(`🏁 Version breakdown successfully written to:\n${file}`);
};

getCurrentVersions();
