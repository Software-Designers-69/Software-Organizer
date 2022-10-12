import { React } from 'react';
import { useNavigate } from "react-router-dom";


import './Adder.css';

function Adder(props) {
    let navigate = useNavigate();

    const routeChange = () => {
        let path = '/add';
        navigate(path, {
        state: {
            project : props.project
            },
        });
    }
    
    return (
        <div className='Adder'>
            <span class="material-symbols-outlined" id="adder-icon" onClick={routeChange}>
                add
            </span>
        </div>
    )
}

export default Adder