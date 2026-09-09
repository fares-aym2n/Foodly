module.exports = {
  "/api/food": {
    "get": {
      "tags": [
        "Food"
      ],
      "summary": "Get all food items",
      "description": "Retrieves all food items with sorting, filtering, field selection, and pagination. Category and restaurant details are automatically populated.",
      "parameters": [
        {
          "$ref": "#/components/parameters/pageQuery"
        },
        {
          "$ref": "#/components/parameters/limitQuery"
        },
        {
          "$ref": "#/components/parameters/sortQuery"
        },
        {
          "$ref": "#/components/parameters/fieldsQuery"
        },
        {
          "name": "name",
          "in": "query",
          "required": false,
          "description": "Filter by food name",
          "schema": {
            "type": "string",
            "example": "Chicken Alfredo Pasta"
          }
        },
        {
          "name": "price[gt]",
          "in": "query",
          "required": false,
          "description": "Filter price greater than value",
          "schema": {
            "type": "number",
            "example": 7
          }
        },
        {
          "name": "price[lt]",
          "in": "query",
          "required": false,
          "description": "Filter price less than value",
          "schema": {
            "type": "number",
            "example": 60
          }
        },
        {
          "name": "rating[gt]",
          "in": "query",
          "required": false,
          "description": "Filter rating greater than value",
          "schema": {
            "type": "number",
            "example": 1
          }
        },
        {
          "name": "rating[lt]",
          "in": "query",
          "required": false,
          "description": "Filter rating less than value",
          "schema": {
            "type": "number",
            "example": 5
          }
        },
        {
          "name": "isAvailable",
          "in": "query",
          "required": false,
          "description": "Filter by availability status",
          "schema": {
            "type": "boolean",
            "example": true
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Food items retrieved successfully",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "resutls": {
                    "type": "integer",
                    "example": 1
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "string",
                        "example": "success"
                      },
                      "doc": {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/Food"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "post": {
      "tags": [
        "Food"
      ],
      "summary": "Create a new food item",
      "description": "Creates a new food item. Minimum price is $5. Requires **admin** role.",
      "security": [
        {
          "bearerAuth": []
        },
        {
          "cookieAuth": []
        }
      ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "required": [
                "name",
                "description",
                "price"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "example": "Grilled Salmon"
                },
                "description": {
                  "type": "string",
                  "example": "Fresh Atlantic salmon with garlic herb butter and steamed asparagus"
                },
                "price": {
                  "type": "number",
                  "minimum": 5,
                  "example": 28
                },
                "rating": {
                  "type": "number",
                  "minimum": 1,
                  "maximum": 5,
                  "default": 5,
                  "example": 4.9
                },
                "isAvailable": {
                  "type": "boolean",
                  "default": true,
                  "example": true
                },
                "category": {
                  "type": "string",
                  "description": "ObjectId of Category",
                  "example": "660c1e5a4f3a2b1c8e9f0201"
                },
                "restaurant": {
                  "type": "string",
                  "description": "ObjectId of Restaurant",
                  "example": "660c1d2e4f3a2b1c8e9f0101"
                }
              }
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "Food item created successfully",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "success"
                  },
                  "data": {
                    "$ref": "#/components/schemas/Food"
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Validation error (e.g. price below 5, missing name)",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              },
              "example": {
                "status": "faild",
                "message": "Invalid Input Data. Price Must be atleast 5$"
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized - Missing or invalid token",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden - Admin role required",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    }
  },
  "/api/food/{id}": {
    "get": {
      "tags": [
        "Food"
      ],
      "summary": "Get food item by ID",
      "description": "Retrieves a single food item by ID. Populates category (`name`) and restaurant (`name address`).",
      "parameters": [
        {
          "$ref": "#/components/parameters/mongoIdParam"
        }
      ],
      "responses": {
        "200": {
          "description": "Food item details retrieved successfully",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "success"
                  },
                  "data": {
                    "$ref": "#/components/schemas/Food"
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Invalid ObjectId format",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "404": {
          "description": "Food item not found",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    },
    "patch": {
      "tags": [
        "Food"
      ],
      "summary": "Update a food item",
      "description": "Updates fields of an existing food item. Requires **admin** role.",
      "security": [
        {
          "bearerAuth": []
        },
        {
          "cookieAuth": []
        }
      ],
      "parameters": [
        {
          "$ref": "#/components/parameters/mongoIdParam"
        }
      ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "example": "Grilled Atlantic Salmon"
                },
                "description": {
                  "type": "string",
                  "example": "Fresh Atlantic salmon with garlic herb butter and grilled veggies"
                },
                "price": {
                  "type": "number",
                  "minimum": 5,
                  "example": 32
                },
                "rating": {
                  "type": "number",
                  "minimum": 1,
                  "maximum": 5,
                  "example": 5
                },
                "isAvailable": {
                  "type": "boolean",
                  "example": true
                },
                "category": {
                  "type": "string",
                  "example": "660c1e5a4f3a2b1c8e9f0201"
                },
                "restaurant": {
                  "type": "string",
                  "example": "660c1d2e4f3a2b1c8e9f0101"
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Food item updated successfully",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "success"
                  },
                  "data": {
                    "$ref": "#/components/schemas/Food"
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Validation error or invalid ID",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden - Admin role required",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "404": {
          "description": "Food item not found",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    },
    "delete": {
      "tags": [
        "Food"
      ],
      "summary": "Delete a food item",
      "description": "Deletes a food item by ID. Requires **admin** role.",
      "security": [
        {
          "bearerAuth": []
        },
        {
          "cookieAuth": []
        }
      ],
      "parameters": [
        {
          "$ref": "#/components/parameters/mongoIdParam"
        }
      ],
      "responses": {
        "204": {
          "description": "Food item deleted successfully (No Content returned)"
        },
        "400": {
          "description": "Invalid ObjectId format",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden - Admin role required",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "404": {
          "description": "Food item not found",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    }
  }
};
