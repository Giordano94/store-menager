const { idSchema } = require('./schema');

const validateId = (productId) => {
  const { error } = idSchema.validate(productId);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

module.exports = { validateId };
