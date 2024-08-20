const fs = require('fs');
const path = require('path');

// Define the path to icons folder
const iconsFolderPath = path.join(__dirname, 'public/icons');

// Set default dimensions
const defaultWidth = 30;
const defaultHeight = 30;

// Get all PNG files in the icons folder
const files = fs.readdirSync(iconsFolderPath).filter(file => file.endsWith('.png'));

// Create the output file content
let output = `import Image from 'next/image';\n\nconst iconMap = new Map();\n`;

// Add each PNG file to the output
files.forEach(file => {
  const fileName = path.parse(file).name;
  output += `iconMap.set("${fileName}", (props) => <Image src="/icons/${file}" alt="${fileName}" width={props.width || ${defaultWidth}} height={props.height || ${defaultHeight}} {...props} />); \n`;
});

output += `\n\nexport default iconMap;\n`;

// Write the output to an iconMap.ts file
fs.writeFileSync(path.join(__dirname, 'src/components/iconMap.tsx'), output);

console.log('iconMap.tsx file generated successfully.');
