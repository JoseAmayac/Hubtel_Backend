import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { formatErrorMessage } from '../../../utils/formatErrorMessage';

const registerSchema = Joi.object({
    name: Joi.string().required().label('nombre'),
    email: Joi.string().email().required().label('Correo electrónico'),
    password: Joi.string().min(6).required().label('Contraseña'),
    passwordConfirm: Joi.string().min(6).required().valid(Joi.ref('password')).label('Confirmación de contraseña'),
}).messages({
    'string.email': "Dirección de correo electrónico no válida",
    'any.required': "El campo {#label} es requerido",
    'string.min': "La longitud mínima es de {#limit} caracteres",
    'any.only': "Contraseñas no coinciden"
});

export const registerValidations = ( req: Request, res: Response, next: NextFunction ) => {
    const { error } = registerSchema.validate( req.body );
    
    if( error ){
        const errorFormatted = formatErrorMessage( error.details[0] );
        
        return res.status(422).json({
            errors: [
                errorFormatted
            ]
        });
    }

    next();
}