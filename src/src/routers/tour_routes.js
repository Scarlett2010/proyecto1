import { Router } from "express";
import { createTourController, getAllToursController, getTourByIdController, updateTourController, deleteTourController } from "../controllers/tour_controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router() //hago una instancia
//! ruta
//? 1. definir el path
//? 2. invocar el metodo
router.get('/tours',getAllToursController)
//:         punto 1     punto2


//------------------
//! ruta
//? 1. definir el path
//? 2. invocar el metodo

router.post('/tours',verifyToken,createTourController)
//:         punto 1     punto2
//------------------

//------------------
//! ruta
//? 1. definir el path
//? 2. invocar el metodo

router.get('/tours/:id',getTourByIdController)
//:         punto 1     punto2
//------------------

//------------------
//! ruta
//? 1. definir el path
//? 2. invocar el metodo

router.put('/tours/:id',verifyToken,updateTourController)
//:         punto 1     punto2
//------------------

//------------------
//! ruta
//? 1. definir el path
//? 2. invocar el metodo

router.delete('/tours/:id',verifyToken,deleteTourController)
//:         punto 1     punto2
//------------------

//: FIN RUTAS CON METODOS
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//IMPLEMENTACION JSON WEB TOKENS JWT
//RUTAS ÚBLICAS 

//RUTAS PRIVADAS
export default router