const { writeFile } = require('fs');
const filename = './src/variables.ts';
const colors = require('colors');

const API_MINIMUM_VERSION = process.env.API_MINIMUM_VERSION || '0.2.0';

const env =
`export const API_MINIMUM_VERSION = '${API_MINIMUM_VERSION}';
`;

console.log(colors.magenta('\nEnvironment variables:'));
console.log(colors.grey(`API_MINIMUM_VERSION = ${API_MINIMUM_VERSION}`));
writeFile(filename, env, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.green(`\nconfig file written at ${filename} \n`));
   }
});