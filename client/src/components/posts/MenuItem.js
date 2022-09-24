const MenuItem = ({ title, subtitle, icon }) => {
  return (
    <ul className="hover1">
      <i className={icon}></i>
      <div className="post_menu_text">
        <span>{title}</span>
        {subtitle && <span className="menu_post_col">{subtitle}</span>}
      </div>
    </ul>
  );
};

export default MenuItem;
