if(!process.env.NODE_ENV) require('dotenv').load();
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.MONGODB_URI || 'mongodb://localhost/flash_anzan';
export const JWT_SECRET = process.env.JWT_SECRET;
export const X_MASHAPE_KEY = process.env.X_MASHAPE_KEY;
