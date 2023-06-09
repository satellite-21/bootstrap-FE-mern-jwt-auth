const csvFilePath = 'filedata.csv'; // Replace with the path to your CSV file
const csv = require('csvtojson');
const fs = require('fs');

csv()
  .fromFile(csvFilePath)
  .then((jsonArrayObj) => {
    const jsonContent = JSON.stringify(jsonArrayObj, null, 2);
    fs.writeFileSync('output.json', jsonContent);
    console.log('Conversion completed! JSON file saved as output.json');
  })
  .catch((error) => {
    console.log('Error:', error);
  });
