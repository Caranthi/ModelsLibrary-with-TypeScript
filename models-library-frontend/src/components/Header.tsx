import React from "react";
import '../styles/Header.css'
import {publish} from "../events";

const Header = () => {
    const onTitleClick = () => {
        window.location.reload();
    };
    const onInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            publish('filterSpecies', e.currentTarget.value);
        }
    };

    return (
        <div>
            <div className="Header">
                <p onClick={onTitleClick} className="HeaderTitle">
                    Models Library
                </p>
                <input type="text" placeholder="Type model species..." onKeyDown={onInput} className="HeaderInput"/>
            </div>
        </div>
    );
}

export default Header;
