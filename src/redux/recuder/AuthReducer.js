let CurrenState;
if ( localStorage.getItem("Token")){
     debugger
    var getToken= localStorage.getItem("Token");
    var token = JSON.parse(getToken);
    if(token.exprire > new Date().toLocaleString()){
        CurrenState={
            userName:"",
            isLoggedIn:true
        }
    }
}
else {
     CurrenState={
        userName:"",
        isLoggedIn:false
    }
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