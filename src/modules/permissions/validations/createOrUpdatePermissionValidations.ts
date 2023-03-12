import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { formatErrorMessage } from '../../../utils/formatErrorMessage';

const permissionSchema = Joi.object({
    name: Joi.string().required().label('nombre'),
}).messages({
    'any.required':  "El campo {#label} es requerido"
});

export const createOrUpdatePermissionValidations = (req: Request, res: Response, next: NextFunction) => {
    const { error } = permissionSchema.validate( req.body );
    if( error ){
        const errorMessage = formatErrorMessage( error.details[0] );
        return res.status(422).json({errors: [ errorMessage ]});
    }

    next();
}