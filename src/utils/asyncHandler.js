// const asyncHandler= (func)=> async (*args) => { return funct(*args)}

const asyncHandler = (requestHandler)=> {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next))
        .catch((error)=> next(error));
    }
}

export default asyncHandler;


// const asyncHandler = (requestHandler)=> async (req,res,next) => {

//     try{
//         await requestHandler(req,res,next);
//     }catch(error){
//         res.status(error.code || 500 ).json({
//             success: false,
//             message: error.message
//         })
//     }
// }