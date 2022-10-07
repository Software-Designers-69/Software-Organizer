import { React } from 'react';
import { useNavigate } from "react-router-dom";
import './ViewDocuments.css';
import '../UserStories/UserStories.css';
import '../AdderDocument/AdderDocument.css'
function ViewDocuments(props) {
    let navigate = useNavigate();
    const routeChange = (file) => {
        let path = '/showdocument';
        navigate(path, {
            state: {
                file: file
            },
        });
    }
    const Change = () => {
        let path = '/adddocument';
        navigate(path, {
            state: {
                project: props.project
            },
        });
    }
    return (
        <div>
        <div className = "storycont">
            {props.project.Documents.map((file) => {   
            return (
                <div  className="story-div">   
                 <h4>{file.filename}</h4>
                 <h4>{file.fileDescription}</h4>
                 <button className="viewbtn" onClick={()=>routeChange(file)}>View Document</button>  
                 <div className="story-bottom">
                    <p className="story-details">Posted by: {file.UserPoster}</p>
                </div>    
                </div>
            );
            })
        }
        </div>
        <div className='AdderDocument'>
            <span class="material-symbols-outlined" id="adderdocument-icon" onClick={()=>Change()}>
                upload_file
            </span>
        </div>
        </div>
    )
}

export default ViewDocuments