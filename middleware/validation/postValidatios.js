const { body, validationResult } = require('express-validator');

//VALIDAR UN POST NUEVO
exports.validarPost = async(req,res,next) => {
    const rules = [
        body('title').escape().notEmpty().withMessage('EL titulo es requrido'),
        body('message').escape().notEmpty().withMessage('La descripción es requerida')
    ];

    await Promise.all(rules.map(validation => validation.run(req)));
    const errores = validationResult(req);

    if (!errores.isEmpty) {
        return res.status(400).json({
            ok: false,
            errores: errores.array().map(error => error.msg)
        })
    }
    next();
}