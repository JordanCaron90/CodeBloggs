const asyncWrapper = (fn) => {
    return async (req,res,next) => {
        try {
            const data = await fn(req,res, next);
            return [data,null];
        } catch (error) {
            console.error(error);
            return [null,error];
        }
    } 
}

module.exports = asyncWrapper;