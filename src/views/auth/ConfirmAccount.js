import React, { useState,useEffect  } from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import APIManager from 'src/utils/LinkAPI';
import { useParams } from 'react-router-dom';

const ConfirmAccount = () => {
    debugger
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        async function Init() {
            const id = params.id;
            const requestURL = APIManager + "/api/ConfirmAccount";
            const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                
                },
                body: JSON.stringify(id)
              };
              
              fetch(requestURL, requestOptions)
                .then(response => response.json())
                .then(result => {
                  if (result.code==0)
                  { 
                    alert("Kích hoạt tài khoản thành công");         
                    navigate(`/app/dashboard/`, { replace: true });
                  }
                  else {
                    alert(result.message);
                  } 
                   
                });}
        Init();
      },[]);
     return(
         <div></div>
     )
}
export default ConfirmAccount;