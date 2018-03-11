import React from "react";

const Profile = ({mis}) => {
  // console.log(mis);

  return (
    <div style={{ color: "black" }}>
      <p>{mis[0]}</p>
      <ul>
        {Object.entries(mis[1]).map(([date, url], i) => (
          <li key={i}>
          {`${date} ${url}`}
          </li>
        ))}
        {/* {mis[1].map((link, i)=> <li key={i}>{link}</li>)} */}
      </ul>
    </div>
  );
};

export default Profile;