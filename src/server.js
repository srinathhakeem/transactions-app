const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

//middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// default route for server
app.get('/', (req, res) => res.status(200).send({
    message: "Server is running..."
}));

const WriteTextToFileAsync = async (contentToWrite) => {
    // let parseJson = [];
    // parseJson.push(contentToWrite);
    fs.writeFile('./src/data.json', contentToWrite, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log('Done writing to file...');
      }
    })
  //  })
    
  }

  app.post('/addTransaction', async (req, res) => {
    // take the body from incoming request by using req.body and convert it into string
    const requestContent = JSON.stringify(req.body);
    await WriteTextToFileAsync(requestContent);
    res.send('transaction was added successfully');
  });
  // 404 route for server
  app.use((req, res, next) => res.status(404).send({
    message: "Could not find specified route that was requested...!"
  }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});