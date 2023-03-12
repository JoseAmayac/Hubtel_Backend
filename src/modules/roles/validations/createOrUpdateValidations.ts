import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { formatErrorMessage } from '../../../utils/formatErrorMessage';

const roleSchema = Joi.object({
    name: Joi.string().required().label('nombre'),
    permissions: Joi.array().required().label('permisos')
}).messages({
    'any.required': "El campo {#label} es requerido",
})

export const createOrUpdateValidations = (req: Request, res: Response, next: NextFunction) => {
    const { error } = roleSchema.validate( req.body );
    
    if( error ){
        const errorFormatted = formatErrorMessage( error.details[0] );

        return res.status(422).json({errors: [errorFormatted]});
    }

    next();
}