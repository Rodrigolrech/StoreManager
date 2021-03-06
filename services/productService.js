const ProductsModel = require('../models/productModel');

const nameIsValid = async (name) => {
  if (!name) {
    return { err: { code: 'invalid_data',
    message: 'name length must be at least 5 characters long' } };
  }
  if (typeof name !== 'string') {
    return { err: { code: 'invalid_data',
    message: '"name" must be a string' } };
  } 
  if (name.length < 6) {
    return { err: { code: 'invalid_data',
    message: '"name" length must be at least 5 characters long' } };
  }
  if ((await ProductsModel.findOneByName(name)) !== null) {
    return { err: { code: 'invalid_data',
    message: 'Product already exists' } };
  }
  return true;
};

const quantityIsValid = (quantity) => {
  if (!quantity && quantity !== 0) {
    return { err: { code: 'invalid_data',
    message: '"quantity" must be a number' } };
  }
  if (!Number.isInteger(quantity)) {
    return { err: { code: 'invalid_data',
    message: '"quantity" must be a number' } };
  }
  if (quantity < 1) {
    return { err: { code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1' } };
  }
  return true;
};

const create = async ({ name, quantity }) => {
  const isNameValid = await nameIsValid(name);
  const isQuantityValid = quantityIsValid(quantity);

  if (isQuantityValid !== true) return isQuantityValid;
  
  if (isNameValid !== true) return isNameValid;

  const { _id } = await ProductsModel
    .create({ name, quantity });
  
  return {
    _id,
    name,
    quantity,
  };
};

const getAll = async () => {
  const products = await ProductsModel.getAll();
  return products;
};

const getById = async (_id) => {
  const product = await ProductsModel.findOneById(_id);
  if (product === null) {
    return { err: { code: 'invalid_data',
    message: 'Wrong id format' } };
  }
    return product;
  };

  const updateById = async ({ _id, name, quantity }) => {
    const isNameValid = await nameIsValid(name);
    const isQuantityValid = quantityIsValid(quantity);

    if (isQuantityValid !== true) return isQuantityValid;
    
    if (isNameValid !== true) return isNameValid;

    const product = await ProductsModel.updateById({ _id, name, quantity });
    if (product === null) {
      return { err: { code: 'invalid_data',
      message: 'Wrong id format' } };
    }
      return product;
    };

  const deleteById = async (_id) => {
    const deletedProduct = await ProductsModel.deleteById(_id);
    if (deletedProduct === null) {
      return { err: { code: 'invalid_data', message: 'Wrong id format' } };
    }
    return deletedProduct;
  };

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
