import Joi from 'joi';

export const formatErrorMessage = (error: Joi.ValidationErrorItem): Record<string, string> => {
    const errorObj: Record<string, string> = {};

    const key = error.context?.key || 'error';
    const message = error.message.replace(/"/g, '');
    errorObj[key] = message;

    return errorObj;
}