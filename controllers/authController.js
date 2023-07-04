const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const {promisify} = require('util')
const users =require("../models/users.js");


//procedimiento para registrarnos
exports.register = async (req, res)=>{    
    try {
        const name = req.body.name
        const user = req.body.user
        const pass = req.body.pass
        let passHash = await bcryptjs.hash(pass, 8)           
        const nuevoUsuario= users.create({
            user: user,
            name:name,
            pass:passHash
          });
        res.redirect('/login/dashboard')
        
    } catch (error) { 
        console.log(error)
    }       
}

exports.login = async (req, res)=>{
    try {
        const user = req.body.user
        const pass = req.body.pass        

        if(!user || !pass ){
            let data={alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'}

            res.render('login',{ data:JSON.stringify(data)})
        }else{ 
                const promise1=await users.findAll({where:{user:user}})
                const promise2=(promise1.length==0)? false:bcryptjs.compare(pass, promise1[0].pass)
               Promise.all([promise1,promise2])
            .then((values)=>{
                if( (values[0]).length == 0 || ! (values[1])) {
                    let data={ alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    }
                    res.render('login', {data:JSON.stringify(data)})
                }else{
                    //inicio de sesión OK
                    console.log(values[0][0].id)
                    const id = values[0][0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generamos el token SIN fecha de expiracion
                   //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                   console.log("TOKEN: "+token+" para el USUARIO : "+user)

                   const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                   }
                   res.cookie('jwt', token, cookiesOptions)
                   let data={
                    alert: true,
                    alertTitle: "Conexión exitosa",
                    alertMessage: "¡LOGIN CORRECTO!",
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: '/login/dashboard'
                   }
                   res.render('login', {data:JSON.stringify(data)})
                }
            })}
        } catch (error) {
        console.log(error)
    }
}


exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            let results = await users.findByPk(decodificada.id);  
            req.user = results.user
            return next()
            }
         catch (error) {
            console.log(error)
            return next()
        }
    }else{
        if(req.originalUrl=="/login/dashboard"){
          res.redirect('/login')}
        else if(req.originalUrl=="/cart"){
            res.render('cart', { title: 'Realiza tu compra!'})}
        else if(req.originalUrl=="/login"){
            res.render('login', { title: 'Inicia tu sesión!'})}

    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/login')
}