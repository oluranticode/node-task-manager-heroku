     const mongoose = require('mongoose');

    //  const connectingString = 
    //  'mongodb+srv://Temzycode:Temitope@1234@cluster0.4qybc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

     const connectDB = (url) => {
         return  mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
         })
     }

     module.exports = connectDB;

    //  mongoose.connect(connectingString, {
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    //     useUnifiedTopology: true,
    //  })
    //  .then(()=> console.log('CONNECTING TO THE DATABASE......'))
    //  .catch((err) => console.log(err))

    //  myFirstDatabase