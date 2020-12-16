
let CurrenState={
    userName:"",
    isLoggedIn:false
}

export const AuthReducer=(state  = CurrenState,action)=>{
    
    debugger
    switch (action.type) {     
        case 'LOGIN':
         
          return {
           ...state,isLoggedIn: true,userName:action.username
          };
          case 'LOGOUT':
          
          return {
           ...state,isLoggedIn: false
          };
  
          default:
            return state;
        }
}