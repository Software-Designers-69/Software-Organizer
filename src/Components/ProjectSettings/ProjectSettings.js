import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";


import './ProjectSettings.css'

function ProjectSettings(props) {
    let navigate = useNavigate();


    const goBack = () => {
        navigate(-1);
    };

    const deleteProject = async () => {
        //handles delete on single project
        await deleteDoc(doc(db, "Projects", props.project.id));
        goBack();
    };

    const tryDelete = () => {
        //confrms intention to delete a single project
        let isExecuted = window.confirm(
            //pop up to confirm deletion
            "Are you sure you want to delete this project?"
        );
        if (isExecuted) {
            deleteProject();
        }
    };
  return (
    <div>
        <h3>General</h3>
        <div className="deletediv">
            <h4>Delete Project</h4>
            <button className='deletep' onClick={tryDelete}>Delete</button>
        </div>

    </div>
  )
}

export default ProjectSettings