import { ErrorResponse } from "../../lib/types"
import { ExpressJoiError } from "express-joi-validation"

export class BaseError extends Error implements ErrorResponse {
  public error: boolean = true
  public name: string = "api-error"
  public message: string = "Server Error"
  public statusCode: number = 400
  public details: object = {}

  constructor() {
    super()
  }
}

export class InternalServerError extends BaseError {
  name = "internal-server-error"
  statusCode = 400

  constructor() {
    super()
  }
}

export class RouteNotFoundError extends BaseError {
  name = "route-not-found-error"
  message = "This route could not be found"
  statusCode = 400
  constructor() {
    super()
  }
}

export class JoiError extends BaseError {
  name = "joi-error-validation"
  message = "Validation Error"
  statusCode = 400
  constructor(joiError: ExpressJoiError) {
    super()
    this.details = { validation_errors: joiError.error?.details }
  }
}

export class EmailExistsError extends BaseError {
  name = "this-email-already-exists"
  message = "This email already exists"
  statusCode = 400
  constructor() {
    super()
  }
}
export class AuthLoginError extends BaseError {
  name = "email-or-password-incorrect"
  message = "Email or password is incorrect"
  statusCode = 400
  constructor() {
    super()
  }
}

export class EmailNotFoundError extends BaseError {
  name = "email-not-found"
  message = "No user found with this email"
  statusCode = 400
  constructor() {
    super()
  }
}

export class InvalidAccessToken extends BaseError {
  name = "auth-access-token-error"
  message = "Invalid access token"
  statusCode = 401

  constructor() {
    super()
  }
}

export class AccessTokenExpired extends BaseError {
  name = "access-token-expired"
  message = "Access token has expired"
  statusCode = 401

  constructor() {
    super()
  }
}
