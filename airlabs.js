require('dotenv').config()
console.log(process.env)

const https = require('https');
const fs = require('fs');

const url = `https://airlabs.co/api/v9/schedules?dep_iata=LCG&api_key=${process.env.AIR_LABS_KEY}`
https.get(url, (response) => {
    let data = '';
  
    response.on('data', (chunk) => {
      data += chunk;
    })
  
    response.on('end', () => {
      const jsonData = JSON.parse(data);
      fs.writeFile('./data/response.json', JSON.stringify(jsonData), (err) => {
        if (err) throw err;
        console.log('Response saved to response.json');
      });
    });
  }).on('error', (error) => {
    console.error(error);
  });