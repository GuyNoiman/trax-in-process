const express = require('express');
const app = express();
app.use(express.json());

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json())
const jsonParser = bodyParser.json();

const PORT = 3000;
app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

const test = require('./test');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/whos-there', async (req, res) => {
    return res.status(200).send('Hi Trax! This is Guy Noiman');
});








