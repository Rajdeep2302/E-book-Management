/**
 * Async Handler Wrapper
 * Eliminates the need for try-catch in every controller
 * @param {Function} fn - Async function to wrap
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
