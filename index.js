const express = require('express');
const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');
const bidRoutes = require('./routes/bid');
const notificationRoutes = require('./routes/notification');

const sequelize = require('./db');

const app = express();

const PORT = 8000;

app.use(express.json());


app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/bids', bidRoutes);
app.use('/notifications', notificationRoutes);

// app.use(errorMiddleware);

app.listen(PORT,()=>{
    console.log("App is running on port: ",PORT);
})

module.exports = app;
