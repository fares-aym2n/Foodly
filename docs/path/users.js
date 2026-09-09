module.exports = {
  "/api/user/register": {
    "post": {
      "tags": [
        "Authentication & Users"
      ],
      "summary": "Register a new user",
      "description": "Registers a new user account with an uploaded avatar image. Encrypts password with bcrypt and returns a JWT authentication token.",
      "requestBody": {
        "required": true,
        "content": {
          "multipart/form-data": {
            "schema": {
              "type": "object",
              "required": [
                "name",
                "email",
                "password",
                "avatar"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Full name of the user",
                  
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "description": "Valid unique email address",
                  
                },
                "password": {
                  "type": "string",
                  "format": "password",
                  "description": "Account password (min 3 characters)",
                  
                },
                "avatar": {
                  "type": "string",
                  "format": "binary",
                  "description": "User profile avatar image file (JPEG, PNG, etc. MIME type must begin with 'image/')"
                }
              }
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "User registered successfully",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "data": {
                    "$ref": "#/components/schemas/User"
                  },
                  "token": {
                    "type": "string",
                    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Validation error, non-image file, or email already registered",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              },
              "examples": {
                "duplicateEmail": {
                  "summary": "Email already exists",
                  "value": {
                    "status": "faild",
                    "message": "The email is already exist"
                  }
                },
                "nonImageFile": {
                  "summary": "Non-image upload",
                  "value": {
                    "status": "faild",
                    "message": "file must be an image"
                  }
                },
                "validationError": {
                  "summary": "Missing required field",
                  "value": {
                    "status": "faild",
                    "message": "Invalid Input Data. the name is required. Please enter a valid email"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "/api/user/login": {
    "post": {
      "tags": [
        "Authentication & Users"
      ],
      "summary": "Authenticate user",
      "description": "Authenticates user with email and password. Sets an HTTP-only cookie named `token` (valid for 90 days) and returns the JWT in the response body.",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "required": [
                "email",
                "password"
              ],
              "properties": {
                "email": {
                  "type": "string",
                  "format": "email",
                  "example": "test1@gmail.com"
                },
                "password": {
                  "type": "string",
                  "format": "password",
                  "example": "test1234"
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Authentication successful",
          "headers": {
            "Set-Cookie": {
              "schema": {
                "type": "string",
                "example": "token=eyJhbGciOiJIUzI1Ni...; Path=/; HttpOnly; Max-Age=7776000"
              },
              "description": "HttpOnly authentication cookie"
            }
          },
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "token": {
                    "type": "string",
                    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Incorrect email or password",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              },
              "example": {
                "status": "faild",
                "message": "Incorrect email or password"
              }
            }
          }
        }
      }
    }
  },
  "/api/user/logout": {
    "get": {
      "tags": [
        "Authentication & Users"
      ],
      "summary": "Log out user",
      "description": "Clears the `token` HTTP-only cookie.",
      "responses": {
        "200": {
          "description": "Logged out successfully",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "success"
                  },
                  "message": {
                    "type": "string",
                    "example": "You Logged out!"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "/api/user/me": {
    "get": {
      "tags": [
        "Authentication & Users"
      ],
      "summary": "Get current user profile",
      "description": "Retrieves the authenticated user's profile information based on decoded JWT token.",
      "security": [
        {
          "bearerAuth": []
        },
        {
          "cookieAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "Profile retrieved successfully",
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
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          }
        },
        "401": {
          "description": "Missing, invalid, or expired token",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              },
              "examples": {
                "invalidToken": {
                  "summary": "Invalid token",
                  "value": {
                    "status": "faild",
                    "message": "Invalid Token. Please log in and try again"
                  }
                },
                "expiredToken": {
                  "summary": "Expired token",
                  "value": {
                    "status": "faild",
                    "message": "Your session has expired. Please log in again"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
