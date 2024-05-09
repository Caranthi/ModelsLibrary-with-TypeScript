import Header from "./Header";
import {useEffect, useState} from "react";
import {subscribe} from "../events";
import InitialPopup from "./InitialPopup";
import Models from "./Models";
import ErrorForm from "./ErrorForm";

const ModelsLibrary = () => {
    const [filteredSpecies, setFilteredSpecies] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        subscribe('filterSpecies', (data: any) => {
            setFilteredSpecies(data.detail);
        })
    });
    useEffect(() => {
        subscribe('error', (data: any) => {
            setError(data.detail);
        });
    });

    return (
        <div>
            <InitialPopup/>
            <Header/>
            <Models filteredSpecies={filteredSpecies}/>
            <ErrorForm error={error}/>
        </div>
    );
}

export default ModelsLibrary;
