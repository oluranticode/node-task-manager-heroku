// require the database
const connectDB = require('./db/connect');
const express = require('express');
// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


const app = express();
const tasks = require('./routes/task');
const PageNotFound = require('./middleware/pageNotFound'); 
const errorHandler = require('./middleware/error_handler');
require('dotenv').config();
// const port = 5000;
const port = process.env.PORT || 5000;

// middlesware

// app.use(PageNotFound);
app.use(express.static('./public'));
app.use(errorHandler)

app.set('trust proxy', 1);
  app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(xss()); 

//   app.get('/', (req, res)=>{
//       res.send('Task Manager')
//   })

// route
    app.use('/api/v1/tasks', tasks);

//app.get('api/v1/tasks') -   get all the tasks
//app.post('api/v1/tasks') -   create a new task
//app.get('api/v1/tasks/:id') -   get a single tasks
//app.patch('api/v1/tasks/:id') -   update task
//app.delete('api/v1/tasks/:id') -   delete task

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log(`Server listening to port ${port}`)
        });
    } catch (error) {
        console.log(error)
    }
}


start();