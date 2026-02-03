import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const API_KEY = process.env.FOOTBALL_API_KEY;

const app = express();
app.use(cors());

app.get('/api/matches' , async (req , res)=>{
    try{
        const response = await axios.get('https://api.football-data.org/v4/competitions/PL/matches' , {
            headers:{'X-Auth-Token':API_KEY},
            params:{
            //     status:'SCHEDULED' ,
            //     // matchday:23
            }
        });
        res.json(response.data);
    }catch(error){
        console.log("http error");
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});