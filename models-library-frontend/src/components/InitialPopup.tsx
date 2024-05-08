import React, {useState} from "react";
import '../styles/InitialPopup.css';

const InitialPopup = () => {
    const [isShown, setIsShown] = useState<boolean>(true);

    const closePopup = () => {
        console.log('Pop-up closed');
        setIsShown(false);
    };

    return (
        <div>
            {isShown && (
                <div className="background">
                    <div className="popup">
                        <p>Click on the species name to read about it on Wikipedia!</p>
                        <button onClick={() => closePopup()} className="btn btn-secondary">GOT IT!</button>
                    </div>
                </div>)}
        </div>
    );
}

export default InitialPopup;
