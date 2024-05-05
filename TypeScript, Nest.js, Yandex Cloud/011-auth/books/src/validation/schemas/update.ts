import * as Joi from 'joi';

export const updateSchema = Joi.object().keys({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  authors: Joi.string().optional(),
  favorite: Joi.string().optional(),
  fileCover: Joi.string().optional(),
  fileName: Joi.string().optional(),
});
