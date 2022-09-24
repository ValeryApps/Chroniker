import React, { useEffect, useRef, useState } from "react";
// import { searchUser } from "../../functions/user";
import { useClickOutside } from "../../helpers/clickOutside";
// import { Return, Search } from "../../svg";
import { Link } from "react-router-dom";
import Search from "@mui/icons-material/Search";

const SearchMenu = ({ color, setVisible, token }) => {
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const el = useRef(null);
  const input = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
  });
  // useEffect(() => {
  //   input.current.focus();
  // }, []);
  // const handleSearch = async (e) => {
  //   const data = await searchUser(e.target.value, token);
  //   if (e.target.value === "") {
  //     setResult([]);
  //   }
  //   setResult(data?.data);
  // };
  return (
    <div className="header_left search_area scrollbar" ref={el}>
      <div className="search_wrap">
        <div className="header_logo">
          {/* <div className="circle hover1" onClick={() => setVisible(false)}>
            <Return color={color} />
          </div> */}
        </div>
        <div className="search" onClick={() => input.curren?.focus()}>
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Facebook"
            ref={input}
            onFocus={() => setIconVisible(false)}
            onBlur={() => setIconVisible(true)}
            // onKeyUp={handleSearch}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>Edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar">
        {result?.map((usr) => (
          <Link to={`/profile/${usr.username}`} key={usr.username}>
            <div className="search_user_item hover1">
              <img src={usr.picture} alt="" />
              <span>
                {usr.first_name} {usr.last_name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchMenu;
