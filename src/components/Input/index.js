import './styles.css';

export default function Input() {
    return (
        <div className="input">
            <input type="text" className="input-label" placeholder="Type here an input label" /><br />
            <input type="text" className="input-field" />
        </div>
    );
}
