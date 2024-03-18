class AuthValidator {
  createUserScheme = {
    type: 'object',
    properties: {
     name: {
      type: 'string',
      minLength: 1,
      nullable: false,
     },
     username: {
      type: 'string',
      minLength: 1,
      nullable: false
     },
     password: {
      type: 'string',
      minLength: 1,
      maxLength: 40,
      nullable: false
     },
     role: {
      type: 'string',
      minLength: 1,
      maxLength: 10,
      nullable: false
     }
    },
    required: [
      'name', 'username', 'password', 'role'
    ],
    additionalProperties: false,
  }

  login = {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 1,
        maxLength: 25,
        pattern: '^[a-zA-Z0-9]+$',
        nullable: false,
      },
      password: {
        type: 'string',
        minLength: 1,
        maxLength: 40,
        nullable: false,
      }
    },
    required: [
      'username', 'password'
    ],
    additionalProperties: false
  }
}

export default AuthValidator;