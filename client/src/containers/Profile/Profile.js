import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ mis }) => {
  // console.log(mis);
  const { link, userName } = mis[1];
  const length = Object.keys(mis).length;
  return (
    length && (
      <div style={{ color: "black" }}>
        <p>{mis[0]}</p>
        <ul>
          <li>
            <p className="link">link: {link}</p>
            <Link to={`profile/${userName}`}>
              <p className="userNamw">By {userName}</p>
            </Link>
          </li>
          {/* {mis[1].map((link, i)=> <li key={i}>{link}</li>)} */}
        </ul>
      </div>
    )
  );
};

export default Profile;
