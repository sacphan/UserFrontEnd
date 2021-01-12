let CurrenState={
    Winner:null,
    HightLine:null
};


export const GameReducer=(state  = CurrenState,action)=>{
    
    switch (action.type) {     
        case 'Winner':
         
          return {
           ...state,Winner:action.Winner,HightLine:action.HightLine
          }; 
          default:
            return state;
        }
}