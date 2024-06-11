//LO QUE SE HACE EN LA CAPA DE MODELO

import { getAllToursController } from "../controllers/tour_controller.js"

//se crea un objeto
const tourModel = {
    //!metodo del modelo hace dos cosas
    //? 1.el modelo lo que hace es enviar informacion a la bdd osea interactua con ella
    //? 2.y tambien obtiene la respuesta de la bdd para enviar al controlador 

    async getAllTourModel (){ //este metodo obtiene
        //: punto 1
        const peticion = await fetch('http://localhost:4000/tours')
        //: punto 2
        const tours = await peticion.json()
        return tours
    },
    //AHORA quiero registrar algo
    //!metodo del modelo hace dos cosas
    //? 1.el modelo lo que hace es enviar informacion a la bdd osea interactua con ella
    //? 2.y tambien obtiene la respuesta de la bdd para enviar al controlador 
    async createTourModel (newTour){
        //: punto 1
        const url = 'http://localhost:4000/tours'
        const peticion = await fetch(url, {
            method:'POST',                              //verbo que uso
            body:JSON.stringify(newTour),               //informacion que voy a mandar
            headers:{'content-Type':'application/json'} //tipo de contenido
        })
        const data = await peticion.json()
        //: punto 2
        return data
    },
    async getTourByIDModel(tourId){
        const response = await fetch(`http://localhost:4000/tours/${tourId}`)
        if (!response.ok) {
            return {error:"Tour no encontrado"}
        }
        const data = await response.json()

        return data
    },
    async updateTourModel (idTour,dataTour){
        //: punto 1
        const url = `http://localhost:4000/tours/${idTour}`
        const peticion = await fetch(url, {
            method:'PUT',                              //verbo que uso
            body:JSON.stringify(dataTour),               //informacion que voy a mandar
            headers:{'content-Type':'application/json'} //tipo de contenido
        })
        const data = await peticion.json()
        //: punto 2
        return data
    },
    async deleteTourModel (idTour){
        //: punto 1
        const url = `http://localhost:4000/tours/${idTour}`
        const peticion = await fetch(url, {
            method:'DELETE'                             //verbo que uso
        })
        await peticion.json()
        //: punto 2
        return {msg:"Tour eliminado correctamente"}
    }
    //fin del registro
}
//luego lo exporto
export default tourModel