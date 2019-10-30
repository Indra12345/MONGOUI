const schemaGenerator = require('../../utils/modelCodeMaker2');

const schemaController = {
  //we are creating a schema based off the rows given in state;
  createSchema: (req,res) => {
    const {name,rows} = req.body;
    // console.log(name,rows);
    const gen = schemaGenerator(name,rows);
    return res.send(JSON.stringify(gen));
  }
}

module.exports = schemaController;

