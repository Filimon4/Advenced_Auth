class ApiError extends Error {
    status: number;
    errors: any;

    constructor(status: number, message: string, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;

    }

    static UnathorizedError() {
        return new ApiError(401, "User is not authenticate")
    }

    static BabRequest(message: string, errors: any = []) {
        return new ApiError(400, message, errors)
    }
}

export default ApiError