import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const API_KEY = process.env.FOOTBALL_API_KEY;

const app = express();
app.use(cors());
app.use(express.static('../frontend'));




app.get('/api/matches/:leagueCode' , async (req , res)=>{

    const code = req.params.leagueCode;
    const season = req.query.season;
    const targetSeason = season || "2025";
    
    try{
        const response = await axios.get(`https://api.football-data.org/v4/competitions/${code}/matches?season=${targetSeason}`, {
            headers:{'X-Auth-Token':API_KEY},
            params:{
                
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