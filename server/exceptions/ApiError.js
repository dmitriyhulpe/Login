module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    /* Static функции можна использовать не создавая экземпляр класса */

    static UnauthorizedError() {
        return new ApiError(401, 'User is not logged in')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }
}