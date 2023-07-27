import ApiError from "../exceptions/api-error.js";

// @ts-ignore
export default (err, res) => {
    if (err instanceof ApiError) {
        return res
            .status(err.status)
            .json({message: err.message, errors: err.errors});
    }
    return res.status(500).json({message: "Unknow Error"});
};
