const express = require('express');
const app = express();
const routes = require('./routes/routes');
//const itemsRoutes = require('./routes/items');

app.use('/', routes);
//app.use('/items', itemsRoutes);

const port = 3000;
const startup = async() => {
    try {
        app.listen(port, function() { console.log(`Listening on port ${port}!`) });
    } catch(err){
        console.log(err);
    }
}

startup();