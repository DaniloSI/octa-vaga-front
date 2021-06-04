import { useState } from 'react';
import './styles.css';

import { MdClear } from "react-icons/md";

export default function Checkbox() {
    const [options, setOptions] = useState([
        'Option 1',
        'Option 2',
        'Option 3',
    ]);
    const [mouseOver, setMouseOver] = useState(false);

    function handleAddOption() {
        setOptions(old => [
            ...old,
            '',
        ]);
    }

    function handleDelete(index) {
        setOptions(old => {
            const newOptions = old.slice();
            newOptions.splice(index, 1)
            return newOptions;
        });
    }

    function handleChangeOption(index, newLabel) {
        setOptions(old => {
            const newOptions = old.slice();
            newOptions[index] = newLabel;
            return newOptions;
        });
    }

    return (
        <div className="checkbox" onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
            <input type="text" className="checkbox-label" placeholder="Type here a checkbox label" />
            {options.map((option, index) => (
                <div className="checkbox-option" key={index}>
                    <input type="checkbox" />
                    <input
                        type="text"
                        className="checkbox-label"
                        value={option}
                        onChange={(e) => handleChangeOption(index, e.currentTarget.value)}
                        placeholder="Enter a name for the option here."
                    />
                    {mouseOver && <MdClear className="delete-icon" onClick={() => handleDelete(index)} />}
                </div>
            ))}
            <p className="add-option" onClick={handleAddOption}>{mouseOver ? <u>Add option</u> : '\u00A0'}</p>
        </div>
    )
}
