import React, { useState } from 'react';
import './ExtractKeyValueRightPanel.css';
import { useFileContext } from '../FileContext';

import UploadInterface from '../UploadInterface';

 

// const ExtractKeyValueRightPanel: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {
const ExtractKeyValueRightPanel = (   ) => {
      type InputPair = {
            key: string;
            optional: string;
            expanded: boolean;
      };
        const { ExtractKeyValue } = useFileContext();


       const [inputPairs, setInputPairs] = useState<InputPair[]>([{ key: '', optional: '', expanded: false }]);

    const handleAddInputPair = (): void => {
        if (inputPairs.length < 10) {
            setInputPairs([...inputPairs, { key: '', optional: '', expanded: false }]);
        }
    };

    const toggleExpand = (index: number): void => {
        const newInputPairs = inputPairs.map((pair, i) => {
            if (i === index) {
                return { ...pair, expanded: !pair.expanded };
            }
            return pair;
        });
        setInputPairs(newInputPairs);
    };

    // Function to remove an input pair
    const handleRemoveInputPair = (index: number): void => {
            const newInputPairs = inputPairs.filter((_, i) => i !== index);
            setInputPairs(newInputPairs);
      };


    return (
      <div>
            
            {/* <button className="ExtractKeyValue_extract_button" onClick={onButtonClick}>Extract Full Content</button> */}
            <button className="ExtractKeyValue_extract_button" onClick={ExtractKeyValue}>Extract Key-Value</button>
            <h2 className="ExtractKeyValueRightPanel_header">Leave-out Info</h2>
            <li className="ExtractKeyValue_checkbox_list">
                <label>
                    <input type="checkbox" /> Personal ID Info
                </label>
            </li>

            <h2 className="ExtractKeyValueRightPanel_header">Your Keys</h2>
            <div className='ExtractKeyValue_expanding_input_container'>
            
            <div>
                {inputPairs.map((pair, index) => (
                    <div key={index} className="ExtractKeyValue_input_group">
                        <input className='ExtractKeyValueRightPanel_input'
                            type="text"
                            placeholder="Key name"
                            value={pair.key}
                            onChange={(e) => {
                                const newInputPairs = inputPairs.map((innerPair, i) => {
                                    if (i === index) {
                                        return { ...innerPair, key: e.target.value };
                                    }
                                    return innerPair;
                                });
                                setInputPairs(newInputPairs);
                            }}
                        />
                        {pair.expanded && (
                            <input className='ExtractKeyValueRightPanel_input'
                                type="text"
                                placeholder="(Optional) Key Definition"
                                value={pair.optional}
                                onChange={(e) => {
                                    const newInputPairs = inputPairs.map((innerPair, i) => {
                                        if (i === index) {
                                            return { ...innerPair, optional: e.target.value };
                                        }
                                        return innerPair;
                                    });
                                    setInputPairs(newInputPairs);
                                }}
                            />
                        )}
                        <button onClick={() => toggleExpand(index)}>
                            {pair.expanded ? '^' : 'v'}
                        </button>
                        <button onClick={() => handleRemoveInputPair(index)} disabled={inputPairs.length <= 1}>-</button>
                    </div>
                ))}
                <button onClick={handleAddInputPair} disabled={inputPairs.length >= 10}>+</button>
            </div>
        </div>




















                   
                   










              
            
            </div>
            
    );
}

export default ExtractKeyValueRightPanel;

