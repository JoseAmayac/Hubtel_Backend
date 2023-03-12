import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { formatErrorMessage } from '../../../utils/formatErrorMessage';

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required().label('Correo electrónico'),
})

export const createOrUpdateValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate( req.body );
    if( error ){
        const errorMessage = formatErrorMessage( error.details[0] );
        return res.status(422).json({errors: errorMessage});
    }

    next();
}