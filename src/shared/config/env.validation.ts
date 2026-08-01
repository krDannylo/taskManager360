import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3000),
  DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(10).required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
});
