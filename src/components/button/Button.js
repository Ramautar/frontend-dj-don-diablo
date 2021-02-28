import React, { useState } from "react";
import './Button.css';


function Button({children, buttonSize, onClick, type}) {
    const [size] = useState( buttonSize ? buttonSize : 0);

    return (
        <button className={`btn btn-${size}`} onClick={()=>onClick()}>
            {children}
        </button>
    );
}
export default Button;