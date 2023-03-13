import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { formatErrorMessage } from '../../../utils/formatErrorMessage';

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required().label('Correo electrónico'),
    roles: Joi.array().items(Joi.number().required()).required().label('roles')
}).messages({
    'string.email': "Dirección de correo electrónico no válida",
    'any.required': "El campo {#label} es requerido",
    'array.base': 'El campo  {#label} debe ser un arreglo',
    'array.includesRequiredUnknowns': 'Debe incluir los roles del usuario'
})

export const createOrUpdateValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate( req.body );
    if( error ){
        const errorMessage = formatErrorMessage( error.details[0] );
        return res.status(422).json({errors: errorMessage});
    }

    next();
}