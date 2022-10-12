import { React } from 'react';
import { useNavigate } from "react-router-dom";


import './AdderDocument.css';

function AdderDocument(props) {
    let navigate = useNavigate();

    const routeChange = () => {
        let path = '/adddocument';
        navigate(path, {
            state: {
                project: props.project
            },
        });
    }

    return (
        <div className='AdderDocument'>
            <span class="material-symbols-outlined" id="adderdocument-icon" onClick={routeChange}>
                upload_file
            </span>
        </div>
    )
}

export default AdderDocument