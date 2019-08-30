require('dotenv-safe').config();
export const PORT = process.env.PORT || 4000;
export const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/bonsai-backend-test';
export const BASE_URL = process.env.BASE_URL || 'https://yts.lt';
export const BASE_OMDB_URL = process.env.BASE_OMDB_URL || 'https://omdbapi.com';


