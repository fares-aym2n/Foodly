module.exports = {
  "/api/category": {
    "get": {
      "tags": [
        "Categories"
      ],
      "summary": "Get all categories",
      "description": "Retrieves all categories matching query filters with sorting, field selection, and pagination.",
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
          "description": "Filter by category name",
          "schema": {
            "type": "string",
            "example": "Desserts"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Categories retrieved successfully",
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
                          "$ref": "#/components/schemas/Category"
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
        "Categories"
      ],
      "summary": "Create a new category",
      "description": "Creates a new category. Requires **admin** role.",
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
                "description"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "example": "Seafood"
                },
                "description": {
                  "type": "string",
                  "example": "Fresh fish, shrimp, and seafood specialties"
                },
                "restaurant": {
                  "type": "string",
                  "description": "ObjectId of associated restaurant",
                  "example": "660c1d2e4f3a2b1c8e9f0101"
                }
              }
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "Category created successfully",
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
                    "$ref": "#/components/schemas/Category"
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Validation error",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              },
              "example": {
                "status": "faild",
                "message": "Invalid Input Data. Category must has a name. Category must have a description"
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
  "/api/category/{id}": {
    "get": {
      "tags": [
        "Categories"
      ],
      "summary": "Get category by ID",
      "description": "Retrieves a category by ID, populating virtual `food` items with `name`, `price`, and `rating`.",
      "parameters": [
        {
          "$ref": "#/components/parameters/mongoIdParam"
        }
      ],
      "responses": {
        "200": {
          "description": "Category retrieved successfully",
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
                    "$ref": "#/components/schemas/Category"
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
          "description": "Category not found",
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
        "Categories"
      ],
      "summary": "Update a category",
      "description": "Updates an existing category. Requires **admin** role.",
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
                  "example": "Seafood & Grill"
                },
                "description": {
                  "type": "string",
                  "example": "Fresh fish, shrimp, and charcoal-grilled dishes"
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
          "description": "Category updated successfully",
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
                    "$ref": "#/components/schemas/Category"
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
          "description": "Category not found",
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
        "Categories"
      ],
      "summary": "Delete a category",
      "description": "Deletes a category by ID. Requires **admin** role.",
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
          "description": "Category deleted successfully (No Content returned)"
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
          "description": "Category not found",
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
