// INPUT: an object with schemaName (str) and an array of rows
// OUTPUT: big-ass string, to be formatted, of the formatted file name
const modelCodeMaker = (schemaName,rows) => {
    // exports and imports needed for any schema file
    const openingText =
      "const mongoose = require('mongoose');\nconst { Schema } = mongoose;\n\n";
    let closingText = 'module.exports = mongoose.model';
    
    // pull schema data into two vars
    const schemaVarName = `${schemaName.toLowerCase()}Schema`;
    // // makes the variable name e.g. 'userSchema'
    let schemaBody = `const ${schemaName} = new Schema({${'\n'}`;
  
    // init whitespace tab
    const tab = '  ';
    // iterate through rows 
    for (let i = 0; i < rows.length; i += 1) {
      const {required,unique,type,key} = rows[i];
      // start off with |  keyName:  
      schemaBody += `${tab}${key}: `;
  
      //if it requires extra options then we need curly braces 
      if(required || unique){
        schemaBody += `{${'\n'}${tab.repeat(2)}`;
        schemaBody += `type: ${type},${'\n'}`;
          
        schemaBody = required ? schemaBody+ `${tab.repeat(2)}required: ${required},${'\n'}`: schemaBody;
        schemaBody = unique ? schemaBody+ `${tab.repeat(2)}unique: ${unique},${'\n'}`: schemaBody;
        schemaBody += `${tab.repeat(1)}},${'\n'}`;
  
      } else {
        // just print the data type so no need for options braces
        schemaBody += `${type},\n`;
      }
  
    }
    // once done with making model, add closing tags;
    schemaBody += '});\n\n';
  
    // add proper export names to closing text
    closingText += `('${schemaName.slice(0, 1).toUpperCase()}${schemaName.slice(1).toLowerCase()}', ${schemaVarName});`;
    return openingText + schemaBody + closingText;
  };
  
  module.exports = modelCodeMaker;