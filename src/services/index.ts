import MarketService from "./market.service";
import axios from 'axios';

export const marketService = MarketService(axios);

