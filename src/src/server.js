//importar modulos
import express from 'express';
import routerTour from './routers/tour_routes.js';
import routerUser from './routers/user_routes.js';
import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload';


dotenv.config()
//inicializaciones
const app = express()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(fileUpload({
    useTempFiles: true,
    temFileDir:'/uploads'
}))
//variables
app.set('port',process.env.port || 3000) //variable setiada por el servidor, como no esta subida en la nube lo subira al puerto 3000

//middlewares
app.use(express.json())


//rutas
app.get('/',(req,res)=>res.send("Server on"))

app.use('/api/v1/',routerTour)
//-------------------------------
app.use('/api/v1/',routerUser)

//exportar la variable
export default app;