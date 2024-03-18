class DnmValidator {
  createDataScheme = {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
        nullable: false,
      },
      picOne: {
        type: 'string',
        minLength: 1,
        maxLength: 40,
        nullable: false,      
      },
      picTwo: {
        type: 'string',
        minLength: 0,
        maxLength: 40,
        nullable: true,
      },
      UIC: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
        nullable: false,
      },
      description: {
        type: 'string',
        minLength: 1,
        nullable: false,
      },
      crNumber: {
        type: 'string',
        minLength: 3,
        maxLength: 45,
        nullable: false,
      },
      status: {
        type: 'string',
        enum: ['1', '2', '3', '4', '5', '6', '7'],
        nullable: false
      },
      timeline: {
        type: 'string',
        enum: ['1', '2', '3', '4'],
        nullable: false,
      },
      category: {
        type: 'string',
        enum: ['1', '2', '3'],
        nullable: false
      },
      subCategory: {
        anyOf: [
          { type: 'string', enum: ['1', '2', '3', '4'] },
          { type: 'null' }, // Allow subCategory to be null (optional)
        ],
      },
    },
    required: [
      'title',
      'picOne',
      'picTwo',
      'UIC',
      'crNumber',
      'description',
      'status',
      'timeline',
      'category',
    ],
    additionalProperties: true,
  }

  updateDataScheme = {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        // minLength: 1,
        // maxLength: 3
      },
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
        nullable: false,
      },
      picOne: {
        type: 'string',
        minLength: 1,
        maxLength: 40,
        nullable: false,      
      },
      picTwo: {
        type: 'string',
        minLength: 0,
        maxLength: 40,
        nullable: true,
      },
      UIC: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
        nullable: false,
      },
      description: {
        type: 'string',
        minLength: 1,
        nullable: false,
      },
      crNumber: {
        type: 'string',
        minLength: 3,
        maxLength: 45,
        nullable: false,
      },
      status: {
        type: 'string',
        enum: ['1', '2', '3', '4', '5', '6'],
        nullable: false
      },
      timeline: {
        type: 'string',
        enum: ['1', '2', '3', '4'],
        nullable: false,
      },
      category: {
        type: 'string',
        enum: ['1', '2', '3'],
        nullable: false
      },
      subCategory: {
        anyOf: [
          { type: 'null' }, // Allow subCategory to be null (optional)
          { type: 'string', enum: ['1', '2', '3', '4'] },
        ],
      },
    },
    required: [
      'id',
      'title',
      'picOne',
      'picTwo',
      'UIC',
      'crNumber',
      'description',
      'status',
      'timeline',
      'category',
      'subCategory'
    ],
    additionalProperties: true,
  }
}

export default DnmValidator;