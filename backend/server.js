const express = require('express');
const externalService = require('./src/services/ServiceFactory.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
