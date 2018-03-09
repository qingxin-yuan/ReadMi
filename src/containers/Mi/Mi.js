import React, { Component } from "react";
// import Mi from './Mi';

const Mi = ( {mis} ) => {
  console.log(mis);

  return (
    <div style={{ color: "black" }}>
      <p>{mis[0]}</p>
      <ul>
      {mis[1].map((link, i)=> <li key={i}>{link}</li>)}
      </ul>
    </div>
  );
};
export default Mi;
