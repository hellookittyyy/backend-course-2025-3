const fs = require('fs');
const { program } = require('commander');

program
  .requiredOption('-i, --input <path>', 'input JSON file')
  .option('-o, --output <path>', 'output file')
  .option('-d, --display', 'display result in console')
  .option('-v, --variety', 'show flower variety')
  .option('-l, --length <number>', 'show only records with petal.length greater than value', parseFloat);

program.parse(process.argv);

const options = program.opts();

let data;
try {
  const fileContent = fs.readFileSync(options.input, 'utf-8');
  data = JSON.parse(fileContent);
} catch (err) {
  console.error('Cannot find input file or invalid JSON');
  process.exit(1);
}

if (options.length !== undefined) {
  data = data.filter(item => item['petal.length'] > options.length);
}

const result = data.map(item => {
  let line = `${item['petal.length']} ${item['petal.width']}`;
  if (options.variety) line += ` ${item['variety']}`;
  return line;
}).join('\n');

if (options.display) {
  console.log(result);
}

if (options.output) {
  try {
    fs.writeFileSync(options.output, result, 'utf-8');
  } catch (err) {
    console.error('Error writing output file:', err.message);
  }
}
