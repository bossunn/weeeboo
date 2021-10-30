// const loggedReducer = (state = false, action) => {
//     switch(action.type) {
//         case "SIGN_IN": 
//             return !state;
//         default: 
//             return state;
//     }
// }

// export default loggedReducer;

const isActive = (state = false, action) => {
    switch(action.type) {
        case 'IS_ACTIVE': 
            return !state;
        default: 
            return state;
    }
}

export default isActive;