const express = require("express");

// set up port
const PORT = process.env.PORT || 3000;

// invoke express
const app = express();

// setup middleware
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

