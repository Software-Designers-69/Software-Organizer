import { React } from 'react';
import { useNavigate } from "react-router-dom";


import './AdderWiki.css';

function AdderWiki(props) {
    let navigate = useNavigate();

    const routeChange = () => {
        let path = '/Wiki';
        navigate(path, {
            state: {
                project: props.project
            },
        });
    }

    return (
        <div className='AdderWiki'>
            <span class="material-symbols-outlined" id="adderwiki-icon" onClick={routeChange}>
                edit
            </span>
        </div>
    )
}

export default AdderWiki