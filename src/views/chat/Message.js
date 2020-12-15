import React from "react";

export default ({ username }) => {

  return (
    <>
      <div className="media">
      
        <div className="media-body">
          <h5 className="mt-0">{username}</h5>
      
        </div>
      </div>
      <div className="dropdown-divider"></div>
    </>
  );
};
