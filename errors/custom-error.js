
    class CustomAPIError extends Error{
        constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}
const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}
// trow an error
const throwAnError = () => {
    throw new Error('something went wrong');
}

module.exports = { CustomAPIError, createCustomError, throwAnError }