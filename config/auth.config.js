import dotenv from 'dotenv'
dotenv.config()

const authConfig = {

    secret: process.env.AUTH_SECRET_KEY, 

    secret_expires_in: process.env.AUTH_SECRET_EXPIRES_IN , 

    refresh_secret: process.env.AUTH_REFRESH_SECRET_KEY, 

    refresh_secret_expires_in: process.env.AUTH_REFRESH_SECRET_EXPIRES_IN
}

export default authConfig; 