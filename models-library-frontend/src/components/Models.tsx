import React, {useEffect, useRef, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {publish} from "../events";
import '../styles/Models.css';

const Models = (props: { filteredSpecies: string; }) => {
    interface Model {
        id: number,
        species: string,
        colour: string,
        firstAppearance: number,
        weight: number,
    }

    const [initialModels, setInitialModels] = useState<Model[]>([]);
    const [currentModels, setCurrentModels] = useState<Model[]>(initialModels);
    const [newSpecies, setNewSpecies] = useState<string>('');
    const [newColour, setNewColour] = useState<string>('');
    const [firstAppearance, setFirstAppearance] = useState<number>(0);
    const [newWeight, setNewWeight] = useState<number>(0);
    const initialSpecies: string[] = ['Blue Whale', 'Tiger Shark', 'Humpback Whale'];
    const initialColours: string[] = ['Blue', 'Green', 'Black'];
    const initialAppearances: number[] = [2021, 2021, 2022];
    const initialWeights: number[] = [172, 86, 242];

    const speciesInput: React.MutableRefObject<HTMLInputElement | null> = useRef(null); // TODO
    const colourInput: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const appearanceInput: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const weightInput: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/').then((response: AxiosResponse<any>) => {
            console.log('Models: ', response.data);
            setInitialModels(response.data);

            if (response.data.length === 0) {
                for (let i = 0; i < initialSpecies.length; i++) {
                    let modelData = {
                        species: initialSpecies[i], colour: initialColours[i], firstAppearance: initialAppearances[i],
                        weight: initialWeights[i]
                    };

                    axios.post('http://localhost:8080/', modelData).then((response) => {
                        console.log('Added model: ', response.data);
                    }).then(() => {
                        axios.get('http://localhost:8080/').then((response) => {
                            console.log('Initial Models: ', response.data);
                            setInitialModels(response.data);
                        });
                    }).catch(error => {
                        console.error('ERROR: ', error);
                        publish('error', error.response.data);
                    });
                }
            }
        }).catch(error => {
            console.error('ERROR: ', error);
            publish('error', error.response.data);
        });
    }, []);
    useEffect(() => {
        if (props.filteredSpecies !== '') {
            setCurrentModels(initialModels.filter((model) => model.species.toUpperCase().includes(props.filteredSpecies.toUpperCase())));
        } else {
            setCurrentModels(initialModels);
        }
    }, [props.filteredSpecies, initialModels]);

    const browseWikipedia = (species: string) => {
        const searchURL: string = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(species)}`;
        window.open(searchURL, '_blank');
    };
    const deleteModel = (id: number) => {
        axios.delete(`http://localhost:8080/${id}`).then((response) => {
            console.log(response.data);

            axios.get('http://localhost:8080/').then((response) => {
                console.log('Models: ', response.data);
                setCurrentModels(response.data);
            }).catch(error => {
                console.log('ERROR: ', error);
                publish('error', error.response.data);
            });
        }).catch(error => {
            console.log('ERROR: ', error);
            publish('error', error.response.data);
        })
    };
    const add = () => {
        let modelData = {species: newSpecies, colour: newColour, firstAppearance: firstAppearance, weight: newWeight};

        axios.post('http://localhost:8080/', modelData).then((response) => {
            console.log('Added model: ', response.data);

            axios.get('http://localhost:8080/').then((response) => {
                console.log('Models: ', response.data);
                setCurrentModels(response.data);

                clearInputs();
            });
        }).catch(error => {
            console.error('ERROR: ', error);
            publish('error', error.response.data);
        });
    };
    const onSpeciesInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setNewSpecies(e.currentTarget.value);
    }
    const onColourInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setNewColour(e.currentTarget.value);
    }
    const onAppearanceInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setFirstAppearance(parseInt(e.currentTarget.value));
    }
    const onWeightInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setNewWeight(parseInt(e.currentTarget.value));
    }
    const clearInputs = () => {
        if (speciesInput.current) {
            speciesInput.current.value = '';
        }
        if (colourInput.current) {
            colourInput.current.value = '';
        }
        if (appearanceInput.current) {
            appearanceInput.current.value = String(0);
        }
        if (weightInput.current) {
            weightInput.current.value = String(0);
        }
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Species</th>
                    <th>Colour</th>
                    <th>First Appearance</th>
                    <th>Weight [g]</th>
                    <th>Context action</th>
                </tr>
                </thead>
                <tbody>
                {currentModels.map((model) => (
                    <tr key={model.id}>
                        <td onClick={() => browseWikipedia(model.species)} className="hyperLink">{model.species}</td>
                        <td>{model.colour}</td>
                        <td>{model.firstAppearance}</td>
                        <td>{model.weight}</td>
                        <td>
                            <button onClick={() => deleteModel(model.id)}>DELETE</button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td>
                        <input type="text" placeholder="Species..." defaultValue={newSpecies} onInput={onSpeciesInput} ref={speciesInput}/>
                    </td>
                    <td>
                        <input type="text" placeholder="Colour..." defaultValue={newColour} onInput={onColourInput} ref={colourInput}/>
                    </td>
                    <td>
                        <input type="number" defaultValue={firstAppearance} onInput={onAppearanceInput} ref={appearanceInput}/>
                    </td>
                    <td>
                        <input type="number" defaultValue={newWeight} onInput={onWeightInput} ref={weightInput}/>
                    </td>
                    <td>
                        <button onClick={() => add()}>ADD</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Models;
