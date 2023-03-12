import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { formatErrorMessage } from "../../../utils/formatErrorMessage";


const loginSchema = Joi.object({
    email: Joi.string().email().required().label('Correo electrónico'),
    password: Joi.string().min(6).required().label("Contraseña")
}).messages({
    'string.email': "Dirección de correo electrónico no válida",
    'any.required': "El campo {#label} es requerido",
    'string.min': "La longitud mínima es de {#limit} caracteres"
})

export const loginValidations = ( req: Request, res: Response, next: NextFunction ) => {
    const { error } = loginSchema.validate( req.body );
    
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

