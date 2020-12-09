debugger
let CurrenState={
    
    isLoggedIn:false
}

export const AuthReducer=(state  = CurrenState,action)=>{
    
  
    
    switch (action.type) {     
        case 'LOGIN':
         
          return {
           ...state,isLoggedIn: true
          };
          case 'LOGOUT':
          
          return {
           ...state,isLoggedIn: false
          };
          default:
            return state;
        }
}