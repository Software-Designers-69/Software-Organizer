import { React, useState, useEffect } from 'react';
import { ColumnDirective, ColumnsDirective, KanbanComponent } from '@syncfusion/ej2-react-kanban';
import { db } from '../../firebase';
import { updateDoc, doc } from "firebase/firestore";

import './Kanban.css';
import Adder from '../Adder/Adder';

function Kanban(props){
    const [stories, setStories] = useState([]);

    useEffect(() => {
        props.project.UserStories.map((story)=>{
            setStories(stories => [...stories, story]);
        })
    },[])

    const handleChange = async () => {
        const prref = doc(db, 'Projects', props.project.id);
        await updateDoc(prref, {
            UserStories: []
        })

        await updateDoc(prref, {
            UserStories: [...stories]
        })
    };

    return (<KanbanComponent dataSource={stories} keyField="UserStatus"

            cardSettings={{ contentField: "UserStory",headerField: "UserTitle", selectionType: "Multiple" }}

            width="100%" height="100%" dialogClose={handleChange} enablePersistence = {true} dragStop={handleChange}>
            <ColumnsDirective>
                <ColumnDirective headerText='To Do' keyField="New"></ColumnDirective>
                <ColumnDirective headerText='In Progress' keyField="In Progress"></ColumnDirective>
                <ColumnDirective headerText='Done' keyField="Done"></ColumnDirective>
            </ColumnsDirective>
        <Adder project={props.project} />

        </KanbanComponent>);
    
}


export default Kanban;