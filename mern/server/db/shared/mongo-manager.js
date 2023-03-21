const mongoose = require('mongoose')
const URI = process.env.ATLAS_URI;


const openMongoConnection = () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("connected to MongoDB");
    });
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
};

mongoose.set('strictQuery', true)

module.exports = {openMongoConnection};