import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { formatErrorMessage } from '../../../utils/formatErrorMessage';

const routeSchema = Joi.object({
    'description': Joi.string().label('descripción'),
    'pathname': Joi.string().required().label('path'),
    'module': Joi.string().required().label('módulo'),
    'permissions': Joi.array().items(Joi.number().required().label('permisos')).required().label('permisos')
}).messages({
    'any.required': 'El campo {#label} es requerido',
    'number.base': 'Todos los valores deben ser númericos',
    'array.base': 'El campo {#label} debe ser un arreglo',
    'array.includesRequiredUnknowns': 'Debe incluir los permisos de la ruta'
});

export const createOrUpdateRouteValidations = ( req: Request, res: Response, next: NextFunction ) => {
    const { error } = routeSchema.validate( req.body );
    
    if( error ){
        const errorMessage = formatErrorMessage( error.details[0] );
        return res.status(422).json({errors:[ errorMessage ]});
    }

    next();
}