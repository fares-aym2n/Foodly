module.exports = {
  "/api/restaurant/top-5-rating": {
    "get": {
      "tags": [
        "Restaurants"
      ],
      "summary": "Get top 5 rated restaurants",
      "description": "Alias route that automatically applies `limit=5` and sorts descending by rating (`sort=-rating`). Also supports optional query parameters for field selection and regex address search.",
      "parameters": [],
      "responses": {
        "200": {
          "description": "List of top 5 rated restaurants",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "resutls": {
                    "type": "integer",
                    "example": 5
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
                          "$ref": "#/components/schemas/Restaurant"
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
    }
  },
  "/api/restaurant": {
    "get": {
      "tags": [
        "Restaurants"
      ],
      "summary": "Get all restaurants",
      "description": "Retrieves restaurants matching query filters with sorting, field selection, and pagination.",
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
          "$ref": "#/components/parameters/addressQuery"
        },
        {
          "name": "rating[gt]",
          "in": "query",
          "required": false,
          "description": "Filter rating greater than value",
          "schema": {
            "type": "number",
            "example": 2
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
          "name": "isOpen",
          "in": "query",
          "required": false,
          "description": "Filter by open status",
          "schema": {
            "type": "boolean",
            "example": true
          }
        }
      ],
      "responses": {
        "200": {
          "description": "List of restaurants retrieved successfully",
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
                          "$ref": "#/components/schemas/Restaurant"
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
        "Restaurants"
      ],
      "summary": "Create a new restaurant",
      "description": "Creates a new restaurant. Requires **admin** role.",
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
                "address",
                "owner"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "example": "Gourmet Bistro"
                },
                "description": {
                  "type": "string",
                  "example": "Authentic Mediterranean cuisine and fresh seafood"
                },
                "address": {
                  "type": "string",
                  "example": "456 Ocean Drive, Alexandria"
                },
                "phone": {
                  "type": "string",
                  "example": "+201012345678"
                },
                "rating": {
                  "type": "number",
                  "minimum": 1,
                  "maximum": 5,
                  "default": 5,
                  "example": 4.8
                },
                "isOpen": {
                  "type": "boolean",
                  "default": true,
                  "example": true
                },
                "owner": {
                  "type": "string",
                  "example": "Chef Ahmad"
                }
              }
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "Restaurant created successfully",
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
                    "$ref": "#/components/schemas/Restaurant"
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
                "message": "Invalid Input Data. Restaurant must has a name. Restaurant must has a description"
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
          "description": "Forbidden - User is not an admin",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              },
              "example": {
                "status": "faild",
                "message": "You are not authorized"
              }
            }
          }
        }
      }
    }
  },
  "/api/restaurant/{id}": {
    "get": {
      "tags": [
        "Restaurants"
      ],
      "summary": "Get restaurant by ID",
      "description": "Retrieves a single restaurant by its MongoDB ObjectId, populating virtual `category` references with their `name`.",
      "parameters": [
        {
          "$ref": "#/components/parameters/mongoIdParam"
        }
      ],
      "responses": {
        "200": {
          "description": "Restaurant details found",
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
                    "$ref": "#/components/schemas/Restaurant"
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Invalid ObjectId format (CastError)",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              },
              "example": {
                "status": "faild",
                "message": "Inavalid _id:invalid-id"
              }
            }
          }
        },
        "404": {
          "description": "Restaurant not found",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              },
              "example": {
                "status": "faild",
                "message": "No document found with that ID"
              }
            }
          }
        }
      }
    },
    "patch": {
      "tags": [
        "Restaurants"
      ],
      "summary": "Update a restaurant",
      "description": "Updates fields of an existing restaurant. Requires **admin** role.",
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
                  "example": "Gourmet Bistro (Updated)"
                },
                "description": {
                  "type": "string",
                  "example": "Renovated fine dining with fresh seafood"
                },
                "address": {
                  "type": "string",
                  "example": "456 Ocean Drive, Alexandria"
                },
                "phone": {
                  "type": "string",
                  "example": "+201099887766"
                },
                "rating": {
                  "type": "number",
                  "minimum": 1,
                  "maximum": 5,
                  "example": 4.9
                },
                "isOpen": {
                  "type": "boolean",
                  "example": true
                },
                "owner": {
                  "type": "string",
                  "example": "Chef Ahmad"
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Restaurant updated successfully",
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
                    "$ref": "#/components/schemas/Restaurant"
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Invalid input or ID format",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
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
        },
        "404": {
          "description": "Restaurant not found",
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
        "Restaurants"
      ],
      "summary": "Delete a restaurant",
      "description": "Deletes a restaurant document by ID. Requires **admin** role.",
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
          "description": "Restaurant deleted successfully (No Content returned)"
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
          "description": "Restaurant not found",
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
