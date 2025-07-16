const apiResponder = (req, res, next) => {
    res.apiSuccess = (message = "Request successful", data, extraData = {}) => {
        return res.status(200).json({
            success: true,
            message: message,
            ...extraData,
            data: data,
        });
    };

    res.apiError = (
        message = "Internal Server Error",
        statusCode = 500,
        error = null
    ) => {
        let output = { success: false, message: message };
        if (error) {
            output.error = error.message;
            console.log("Error:", error);
        }
        return res.status(statusCode).json(output);
    };
    next();
};

module.exports = apiResponder;
