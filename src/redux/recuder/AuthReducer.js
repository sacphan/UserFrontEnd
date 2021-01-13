let CurrenState;
if ( localStorage.getItem("Token")){
     
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
        id:0,
        isLoggedIn:false
    }
}

export const AuthReducer=(state  = CurrenState,action)=>{
    
    switch (action.type) {     
        case 'LOGIN':
         
          return {
           ...state,isLoggedIn: true, userName:action.username,id:action.id
          };
          case 'LOGOUT':
          
          return {
           ...state, isLoggedIn: false,userName:"",id:0
          };
  
          default:
            return state;
        }
}