const { program } = require('commander');
const fs = require('fs');

program
  .option('-i, --input <path>', 'Path to input JSON file') 
  .option('-o, --output <path>', 'Path to output file')
  .option('-d, --display', 'Display result in console');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

let data;
try {
  const fileContent = fs.readFileSync(options.input, 'utf-8');
  data = JSON.parse(fileContent);
} catch (err) {
  console.error('Error reading or parsing input file:', err.message);
  process.exit(1);
}

const output = JSON.stringify(data, null, 2);

if (options.display) {
  console.log(output);
}

if (options.output) {
  try {
    fs.writeFileSync(options.output, output, 'utf-8');
  } catch (err) {
    console.error('Error writing to output file:', err.message);
    process.exit(1);
  }
}
