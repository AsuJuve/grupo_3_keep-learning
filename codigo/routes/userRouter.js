const express= require('express');
const userController = require('../controllers/userController');
const router= express.Router();
//Requerimientos para subir archivos
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/users'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  })
const upload = multer({ storage: storage });

//Express validator
const {body} = require('express-validator');

const validationsLogin = [
    body('customer_password')
        .notEmpty().withMessage('La contraseña es necesaria para iniciar sesión').bail(),
    body('customer_email').notEmpty().withMessage('El correo electrónico es necesario para el inicio de sesión').bail()
        .isEmail().withMessage('Formato de correo electrónico no válido')
];

//Middlewares
const guestMiddleware = require('../middlewares/guestMiddleware')

//Formulario de registro
router.get("/register",userController.register);
router.post("/register",userController.registerProcess);

//Formulario de login
router.get("/login",userController.login);

//Procesar login
router.post("/login",validationsLogin,userController.loginProcess);

//Perfil
router.get("/profile",userController.profile);

router.get("/editProfile",userController.editProfile);
router.put("/editProfile",userController.editProcess);

module.exports= router;