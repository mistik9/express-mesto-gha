const AuthError = require('./AuthError');
const BadRequest = require('./BadRequest');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');
const ServerError = require('./ServerError');

module.exports = { AuthError, BadRequest, ConflictError, ForbiddenError, NotFoundError, ServerError }