import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const API_KEY = process.env.FOOTBALL_API_KEY;

const app = express();
app.use(cors());
