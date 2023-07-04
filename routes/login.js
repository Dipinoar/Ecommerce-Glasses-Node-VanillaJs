const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController.js')

//router para las vistas
router.get('/dashboard', authController.isAuthenticated, (req, res)=>{    
    res.render('dashboard', {user:req.user})
})
router.get('/',authController.isAuthenticated, (req, res)=>{
    res.redirect('/login/dashboard')
})
router.get('/register', (req, res)=>{
    res.render('register')
})


//router para los métodos del controller
router.post('/register', authController.register)
router.post('/', authController.login)
router.get('/logout', authController.logout)

module.exports = router