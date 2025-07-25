const asyncHandler = (promiseHandler) => {
    return (req, res, next) => {
        Promise.resolve(promiseHandler(req, res, next)).catch(next);
    };
};
export default asyncHandler;