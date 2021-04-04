const { validationResult, body } = require('express-validator');

//VALIDACION LOGIN
exports.validarLogin = async(req,res,next) => {
    const rules = [
        body('email').escape().notEmpty().withMessage('El correo es requerido').isEmail().withMessage('Ingresa un email valido'),
        body('password').escape().notEmpty().withMessage('La contraseña es requerida'),
    ];

    await Promise.all(rules.map(validation => validation.run(req)));
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errores: errores.array().map(error => error.msg)
        });
    }
    next();
}

//REGISTRO DE USUARIO
exports.validarRegistro = async(req, res, next) => {
    const rules = [
        body('name').notEmpty().withMessage('El nombre es requerido').isString(),
        body('email').escape().notEmpty().withMessage('El correo es requerido').isEmail().withMessage('Ingresa un email valido'),
        body('password').escape().notEmpty().withMessage('La contraseña es requerida'),
    ];

    await Promise.all(rules.map(validation => validation.run(req)));
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.array().map(error => error.msg)
        })
    }
    next();
}