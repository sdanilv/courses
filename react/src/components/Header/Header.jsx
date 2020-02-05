import React from "react";
import {NavLink} from "react-router-dom"
import style  from "./Header.module.css";


const Header = () =>{
    return(
        <div className={style.Header}>
            <NavLink to="/students" activeClassName={style.active}> Students</NavLink>
            <NavLink to="/courses" activeClassName={style.active}> Courses</NavLink>
        </div>
    )
};

export default Header;