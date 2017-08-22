const express = require('express')
const app = express()
var path = require('path');

const staticDir = path.join(__dirname, '../dist');
app.use(express.static(staticDir));


app.get('/*', function(req, res) {   
  res.sendFile(path.join(__dirname, '../dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })	
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

