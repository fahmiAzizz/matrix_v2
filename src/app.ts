import express from 'express';
import userRoute from './routes/userRoute'
import employeeRoute from './routes/employeeRoute'
import roleRoute from './routes/roleRoute'
import authRoute from './routes/authRoute'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config()


const app = express();
const port = Number(process.env.PORT) || 5000



app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', authRoute)
app.use('/user', userRoute)
app.use('/employee', employeeRoute)
app.use('/role', roleRoute)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
