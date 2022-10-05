const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const app = express();
routes = require('./routes')

app.use(express.json());
app.use('/api', routes);
app.use((req, res) => {
    res.send("Page not found!");
})

const port = process.env.PORT || 8080;
app.listen(port, () => { console.log(`Server open on port ${port}`) });