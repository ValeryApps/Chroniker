import { useRef } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import Group from "@mui/icons-material/Group";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import RoomIcon from "@mui/icons-material/Room";
import { useState } from "react";
import { useClickOutside } from "../../helpers/clickOutside";
import { useSelector } from "react-redux";
import UserMenu from "./userMenu/index";
import SearchMenu from "./SearchMenu";
// import AllMenu from "./AllMenu";

const Header = ({ page }) => {
  const [visible, setVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));

  const userMenu = useRef(null);
  useClickOutside(userMenu, () => {
    setShowUserMenu(false);
  });
  // const element = useRef(null);
  // useClickOutside(element, () => {
  //   setShowUserMenu(false);
  // });

  const color = "#65676b";

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">{/* <Logo /> */}</div>
        </Link>
        <div className="search search1" onClick={() => setVisible(true)}>
          <SearchIcon color={color} />
          <input
            type="text"
            className="hide_input"
            placeholder="Search Facebook"
          />
        </div>
      </div>
      {visible && (
        <SearchMenu color={color} setVisible={setVisible} token={user?.token} />
      )}
      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
        >
          {page === "home" ? <HomeIcon /> : <HomeOutlined />}
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Group color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <AccessTimeOutlinedIcon color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <RoomIcon color={color} />
        </Link>
      </div>
      {user ? (
        <div className="header_right">
          {/* <div
            ref={element}
            className={`circle_icon hover1 ${showAll && "active_header"}`}
          >
            <div
              onClick={() => {
                setShowAll((prev) => !prev);
              }}
            >
              <MenuOutlinedIcon />
            </div>
            {showAll && <AllMenu />}
          </div> */}
          <div className="circle_icon hover1">
            <NotificationsNoneOutlinedIcon />
            <span className="right_notification">5</span>
          </div>
          <div
            className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
            ref={userMenu}
            style={{ border: page === "profile" ? "1rem #1876f2 solid" : "" }}
          >
            <div onClick={() => setShowUserMenu((prev) => !prev)}>
              <div className="profile hover1">
                <img
                  src={user?.picture}
                  alt={user?.username}
                  className="profile_img_header"
                />
              </div>
            </div>
            {showUserMenu && (
              <UserMenu user={user} setShowUserMenu={setShowUserMenu} />
            )}
          </div>
        </div>
      ) : (
        <div className="header_right">
          <Link to="/auth">Sign up</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
