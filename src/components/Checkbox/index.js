import { useState } from 'react';
import './styles.css';

function CheckboxOption({ labelDefault }) {
    const [label, setLabel] = useState(labelDefault);

    return (
        <div className="checkbox-option">
            <input type="checkbox" />
            <input type="text" className="checkbox-label" value={label} onChange={(e) => setLabel(e.currentTarget.value)} />
        </div>
    );
}

export default function Checkbox() {
    const [options, setOptions] = useState([
        'Option 1',
        'Option 2',
        'Option 3',
    ]);
    const [showAddOption, setShowAddOption] = useState(false);

    function handleAddOption() {
        setOptions(old => [
            ...old,
            `Option ${old.length}`
        ]);
    }

    return (
        <div className="checkbox" onMouseEnter={() => setShowAddOption(true)} onMouseLeave={() => setShowAddOption(false)}>
            <input type="text" className="checkbox-label" placeholder="Type here a checkbox label" />
            {options.map((option, index) => (
                <CheckboxOption key={index} labelDefault={option} />
            ))}
            <p className="add-option" onClick={handleAddOption}>{showAddOption ? <u>Add option</u> : '\u00A0'}</p>
        </div>
    )
}
