const users = require('./path/users');
const restaurants = require('./path/restaurants');
const categories = require('./path/categories');
const food = require('./path/food');

module.exports = {
  paths: { ...users, ...restaurants, ...categories, ...food },
  openapi: '3.0.3',
  info: {
    title: 'Foodly API',
    version: '1.0.0',
    description:
      '## 🍔 Foodly API Documentation\n\nWelcome to the official interactive documentation for **Foodly REST API**',
  },
  servers: [
    {
      url: 'https://foodly-api.vercel.app',
      description: 'Production Server',
    },
    {
      url: 'http://localhost:3000',
      description: 'Development Server',
    },
  ],
  tags: [
    {
      name: 'Authentication & Users',
      description:
        'User registration, authentication, session management, and profile retrieval',
    },
    {
      name: 'Restaurants',
      description:
        'Restaurant catalog, top rating spotlights, and restaurant administration',
    },
    {
      name: 'Categories',
      description: 'Food menu categories and classification',
    },
    {
      name: 'Food',
      description:
        'Menu items, pricing, availability, and food administration',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Enter your JWT token in the format: Bearer <token>',
      },
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
        description: "JWT authentication cookie named 'token'",
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '660c1d2e4f3a2b1c8e9f0123',
          },
          name: {
            type: 'string',
            example: 'new user',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'test@example.com',
          },
          role: {
            type: 'string',
            enum: ['user', 'admin'],
            example: 'user',
          },
          avatar: {
            type: 'string',
            example: 'user-1788608701168.jpeg',
          },
        },
      },
      Restaurant: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '660c1d2e4f3a2b1c8e9f0101',
          },
          name: {
            type: 'string',
            example: 'Gourmet Bistro',
          },
          description: {
            type: 'string',
            example:
              'Authentic Mediterranean cuisine and fresh seafood',
          },
          address: {
            type: 'string',
            example: '456 Ocean Drive, Alexandria',
          },
          phone: {
            type: 'string',
            example: '+201012345678',
          },
          rating: {
            type: 'number',
            minimum: 1,
            maximum: 5,
            example: 4.8,
          },
          isOpen: {
            type: 'boolean',
            example: true,
          },
          owner: {
            type: 'string',
            example: 'Chef Ahmad',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-09-08T05:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-09-08T05:00:00.000Z',
          },
          category: {
            type: 'array',
            description: 'Virtual populated category references',
            items: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '660c1e5a4f3a2b1c8e9f0201',
                },
                name: {
                  type: 'string',
                  example: 'Seafood',
                },
              },
            },
          },
        },
      },
      Category: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '660c1e5a4f3a2b1c8e9f0201',
          },
          name: {
            type: 'string',
            example: 'Seafood',
          },
          description: {
            type: 'string',
            example:
              'Fresh fish, shrimp, and seafood specialties',
          },
          restaurant: {
            type: 'string',
            description: 'ObjectId of the associated restaurant',
            example: '660c1d2e4f3a2b1c8e9f0101',
          },
          food: {
            type: 'array',
            description:
              'Virtual populated food items in this category',
            items: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '660c1f8b4f3a2b1c8e9f0301',
                },
                name: {
                  type: 'string',
                  example: 'Grilled Salmon',
                },
                price: {
                  type: 'number',
                  example: 28,
                },
                rating: {
                  type: 'number',
                  example: 4.9,
                },
              },
            },
          },
        },
      },
      Food: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '660c1f8b4f3a2b1c8e9f0301',
          },
          name: {
            type: 'string',
            example: 'Grilled Salmon',
          },
          description: {
            type: 'string',
            example:
              'Fresh Atlantic salmon with garlic herb butter and steamed asparagus',
          },
          price: {
            type: 'number',
            minimum: 5,
            example: 28,
          },
          rating: {
            type: 'number',
            minimum: 1,
            maximum: 5,
            example: 4.9,
          },
          isAvailable: {
            type: 'boolean',
            example: true,
          },
          category: {
            type: 'object',
            description: 'Populated category details',
            properties: {
              _id: {
                type: 'string',
                example: '660c1e5a4f3a2b1c8e9f0201',
              },
              name: {
                type: 'string',
                example: 'Seafood',
              },
            },
          },
          restaurant: {
            type: 'object',
            description: 'Populated restaurant details',
            properties: {
              _id: {
                type: 'string',
                example: '660c1d2e4f3a2b1c8e9f0101',
              },
              name: {
                type: 'string',
                example: 'Gourmet Bistro',
              },
              address: {
                type: 'string',
                example: '456 Ocean Drive, Alexandria',
              },
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'faild',
          },
          message: {
            type: 'string',
            example: 'Invalid Input Data. the name is required',
          },
        },
      },
    },
    parameters: {
      mongoIdParam: {
        name: 'id',
        in: 'path',
        required: true,
        description: 'MongoDB document ObjectId',
        schema: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$',
          example: '660c1d2e4f3a2b1c8e9f0101',
        },
      },
      pageQuery: {
        name: 'page',
        in: 'query',
        required: false,
        description: 'Page number for pagination',
        schema: {
          type: 'integer',
          default: 1,
          minimum: 1,
          example: 1,
        },
      },
      limitQuery: {
        name: 'limit',
        in: 'query',
        required: false,
        description: 'Maximum number of items returned per page',
        schema: {
          type: 'integer',
          default: 100,
          minimum: 1,
          example: 5,
        },
      },
      sortQuery: {
        name: 'sort',
        in: 'query',
        required: false,
        description:
          "Field to sort by. Prefix with '-' for descending order (e.g. `-rating`).",
        schema: {
          type: 'string',
          example: '-rating',
        },
      },
      fieldsQuery: {
        name: 'fields',
        in: 'query',
        required: false,
        description:
          'Comma-separated list of fields to include in the response (e.g. `name,rating`).',
        schema: {
          type: 'string',
          example: 'name,rating',
        },
      },
      addressQuery: {
        name: 'address',
        in: 'query',
        required: false,
        description: 'search on address field.',
        schema: {
          type: 'string',
          example: 'Maadi',
        },
      },
    },
  },
};
