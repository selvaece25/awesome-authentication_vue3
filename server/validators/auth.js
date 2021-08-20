const Joi = require('joi');
class AuthValidator {
  constructor(type) {
    this.type = type;
  }

  validate(data) {
    let schema = null;
    switch (this.type) {
      case 'login': {
        schema = AuthValidator.loginSchema();
        break;
      }
      default:
        console.log(`Invalid operation ${this.type}`);
        break;
    }

    if (!schema) {
      this.errors = [{ message: 'Invalid Operation.' }];
      return;
    }
    const { error, value } = schema.validate(data);
    if (error) {
      this.value = {};
      this.errors = error;
      return false;
    }
    this.value = value;
    this.errors = [];

    return true;
  }
  static loginSchema() {
    return Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
  }
}

module.exports = AuthValidator;
