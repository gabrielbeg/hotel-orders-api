const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.get('/', (req, res) => {
    res.send("Hi people");
})

app.use((req, res) => {
    res.send("Not Found!")
})

const port = process.env.PORT || 8080;
app.listen(port, () => { console.log(`Server open on port ${port}`) });