import { create, menus } from "../../data/allMenu";
import AllMenuItem from "./AllMenuItem";

const AllMenu = () => {
  return (
    <div className="all_menu">
      <div className="all_menu_header">Menu</div>
      <div className="all_menu_wrap scrollbar">
        <div className="all_left">
          <div className="all_menu_search">
            <i className="ann_s_ic"></i>
            <input type="text" placeholder="Search Menu" />
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Social</div>
            {menus.slice(0, 6).map((menu, index) => (
              <AllMenuItem
                key={index}
                description={menu.description}
                name={menu.name}
                icon={menu.icon}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Intertainment</div>
            {menus.slice(6, 9).map((menu, index) => (
              <AllMenuItem
                key={index}
                description={menu.description}
                name={menu.name}
                icon={menu.icon}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Shopping</div>
            {menus.slice(9, 11).map((menu, index) => (
              <AllMenuItem
                key={index}
                description={menu.description}
                name={menu.name}
                icon={menu.icon}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Personal</div>
            {menus.slice(11, 15).map((menu, index) => (
              <AllMenuItem
                key={index}
                description={menu.description}
                name={menu.name}
                icon={menu.icon}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Personal</div>
            {menus.slice(15, 17).map((menu, index) => (
              <AllMenuItem
                key={index}
                description={menu.description}
                name={menu.name}
                icon={menu.icon}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Communauty Resources</div>
            {menus.slice(17, 21).map((menu, index) => (
              <AllMenuItem
                key={index}
                description={menu.description}
                name={menu.name}
                icon={menu.icon}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">More From Meta</div>
            {menus.slice(21).map((menu, index) => (
              <AllMenuItem
                key={index}
                description={menu.description}
                name={menu.name}
                icon={menu.icon}
              />
            ))}
          </div>
        </div>
        <div className="all_right">
          <div className="all_right_header">Creact</div>
          {create.map((element, index) => (
            <div className="all_right_item hover1" key={index}>
              <div className="all_right_circle">
                <i className={element.icon}></i>
              </div>
              {element.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
