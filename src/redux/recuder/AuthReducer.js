
let CurrenState={
    userName:"",
    isLoggedIn:false
}

export const AuthReducer=(state  = CurrenState,action)=>{
    
    switch (action.type) {     
        case 'LOGIN':
         
          return {
           ...state,isLoggedIn: true, userName:action.username
          };
          case 'LOGOUT':
          
          return {
           ...state, isLoggedIn: false,userName:""
          };
  
          default:
            return state;
        }
}