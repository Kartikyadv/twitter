
export const getResponseResolver = (success, code, message, data) => {
    
    try {
        return {
            "success": success,
            "code": code,
            "message": message,
            "data": data
        }
    } catch (error) {
        // res.json(getResponseResolver(400,`Error in getResponseResolver f(x)`, {"Error": error}));
        console.log(error);
    }

};