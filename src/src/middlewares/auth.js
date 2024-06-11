import jwt  from "jsonwebtoken";


const createToken = (userInfo)=>{
    return jwt.sign(userInfo, 'secret_key',{expiresIn:'1h'})
}

const verifyToken =(req,res,next)=>{
    const authHeader =req.headers.authorization
    //VALIDO SI SE ENVIA EL TOKEN 
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({message: 'token no proporcionado'})
    }
    //DIVIDIR EL TOKEN "BEARER Y un conjunto de numeros"
    // token = ['bearer', '156846516984456']
    const token = authHeader.split(' ')[1] //hago que exista un espacio entre el bearer y los numeros

    jwt.verify(token, 'secret_key', (err,decoded)=>{
        //se realiza un verificacion 
        if (err) {
            return res.status(403).json({msg: 'Fallo al autentificar el token'})
        }
        //usuario codigficado
        req.user = decoded
        next()
    })
}

export{
    createToken,
    verifyToken
}