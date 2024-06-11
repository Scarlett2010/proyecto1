//CREO UN CONTROLADOR PARA LOS TOURS

import tourModel from "../models/tour.js"
import {v4 as uuidv4} from 'uuid' //importo la libreria
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs-extra' //para borrar las fotos en cloudinary

//! metodo controlador
//? 1. tomar el request de la ruta
//? 2. invvocar el metodo
//? 3. manda la respuesta al frontend

            //: punto 1: cuando se haga un post se vvera mejor el punto 1, porque me dara registros
const getAllToursController = async (req,res)=>{ //es un a promesa por eso se maneja async y await
    try {
        console.log("Verificar--------");
        // :punto 2
        const tours = await tourModel.createTourModel() 
        //: punto 3
        res.status(200).json(tours)
    } catch (error) {
        res.status(300).json({mgs:error})
    }
}

//------------------
//CREAR UNA FUNCION 
//! metodo controlador
//? 1. tomar el request de la ruta
//? 2. invvocar el metodo
//? 3. manda la respuesta al frontend

const createTourController =async(req,res)=>{
    //punto 1
    const newTourData ={  //spread      req.body ={name:"Tour1", foto="bus.png"}
        id:uuidv4(),
        ...req.body
    }
    //punto 2
    const cloudinaryResponse = await cloudinary.uploader.upload(req.files.imagen.tempFilePath,{folder:'tours'})
    newTourData.image =cloudinaryResponse.secure_url
    newTourData.public_id=cloudinaryResponse.public_id
    
    const tour = await tourModel.createTourModel(newTourData)

    //borrar fotos
    await fs.unlink(req.files.imagen.tempFilePath) //se borra las imagenes que se quedan en el servidor
    //punto 3
    res.status(201).json(tour)
}
//------------------

//------------------
const getTourByIdController = async (req, res)=>{
    const {id}= req.params
    try {
        const tour = await tourModel.getTourByIDModel(id)
        const status = tour.error ? 404 :200
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json({mgs:error})
    }
}
//------------------
const updateTourController = async (req, res)=>{
    const {id}= req.params
    try {
        const tour = await tourModel.updateTourController(id,req.body)
        const status = tour.error ? 404 :200
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json({mgs:error})
    }
}
//------------------
//------------------
const deleteTourController = async (req, res)=>{
    const {id}= req.params
    try {
        //esto cuando se borre el tour tambien se borre la imagen de cloudinary
        const TourFind=await tourModel.getTourByIDModel(id)
        await cloudinary.uploader.destroy(TourFind.public_id)
        //fin
        const tour = await tourModel.deleteTourController(id)
        const status = tour.error ? 404 :200
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json({mgs:error})
    }
}
//------------------
//------------------
export {
    getAllToursController,
    createTourController, 
    getTourByIdController,
    updateTourController,
    deleteTourController
}