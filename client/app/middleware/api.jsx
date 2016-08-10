

// export const CALL_API = Symbol('Call API')
//
// export default store => next => action => {
//
//     const callAPI = action[CALL_API]
//     // So the middleware doesn't get applied to every single action
//     if (typeof callAPI === 'undefined') {
//         return next(action)
//     }
//
//     let { endpoint, types, authenticated } = callAPI
//
//     const [ requestType, successType, errorType ] = types
//
//     // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
//     return callApi(requestType, endpoint, authenticated).then(
//         response =>
//     next({
//         response,
//         authenticated,
//         type: successType
//     }),
//         error => next({
//         error: error.message || 'There was an error.',
//         type: errorType
//     })
//     )
// }