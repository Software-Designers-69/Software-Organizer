import { db, auth } from '../../firebase';
import { useLocation } from "react-router-dom";
import { React, useEffect, useState, useContext } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { EmailContext } from "../../context";
import { PieChart, Pie, Tooltip, Cell} from 'recharts';
import { async } from '@firebase/util';
import UserStories from '../../Components/UserStories/UserStories';

export default function Insights(props){

    const [users, setUsers] = useState([]); //array to store user'
    const userRef = collection(db, "Users"); //collection reference to all users
    const { userEmail, setUserEmail } = useContext(EmailContext); //email address of user logged in
    const { state } = useLocation();
    const {
        pName,
      } = state;      //state from previous page, PROJECT NAME



    useEffect(() => {
        const getUsers = async () => {
          //fetching all users from the database

          const i = query(userRef , where("Email", "==", userEmail));
          const querySnapshot = await getDocs(i);
          querySnapshot.forEach((doc) => {
            setUsers(users => [ ...users,{ ...doc.data(), id: doc.id }]);

          });

        }
        getUsers();
    
    }, []);

    var numDone = 0;
    var numNew = 0;
    var numProgress = 0;

    const membersArray = props.project.ProjectMembers;
    ///counting how many user stories are done,in progress or new
    const storyArray =props.project.UserStories
    let numStories = storyArray.length
    storyArray.forEach((story)=>{
      for(let key in story){
        //Counting the the number of userstatus that are done etc
        if(`${key}`== "UserStatus"){

          if(story[key] == "New"){
            numNew++
          }
          if(story[key] == "Done"){
            numDone++;
          }
          if(story[key] == "In Progress"){
            numProgress++;
          }
        }

      }
    });

    let data = [
        {name: 'User Stories That Is/Are DONE', users: numDone},
        {name: 'User Stories In PROGRESS', users: numProgress},
        {name: 'User Stories That Is/Are NEW', users: numNew},
      ];
      const COLORS = ['#b3ebad', '#e4b1a5', '#dcb7b2'];
      const RADIAN = Math.PI / 180;
      //Calculating the number of user stories to be on percentage
      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };
      let projName = pName.toUpperCase();

    return(

        <div>
            <div style={{textAlign : "center"}}>
            {users.map((user) => {
            return (
              <div
                key={user.id}>
                <h2>{user.Name} {user.Surname}</h2>
              </div>
            );
            })}
            <h3 >
              User Stories For {projName}
            </h3>
            <p>
                The Pie Chart Below Shows User Stories That Are New,
                Still In Progress Or Done.
            </p>
            <br/>

            <h6>
                Total Number Of User Stories :  {numStories}
            </h6>

            <h6>
                Total Number Of Your Members :  {membersArray.length}
            </h6>

            <PieChart width={700} height={700}>
                <Pie
                    dataKey="users"
                    isAnimationActive={true}
                    data={data}

                    cx={350}
                    cy={250}
                    outerRadius={210}
                    fill="#8E0808"
                    label={renderCustomizedLabel}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  </Pie>
                <Tooltip />
            </PieChart>
        </div>
        </div>

    );  
}


















































/* DONT MIND THIS!!! 


const [projects, setProjects] = useState([]); //array to store user's projects'
    const projectRef = collection(db, "Projects"); //collection reference to all projects
    const { userEmail, setUserEmail } = useContext(EmailContext); //email address of user logged in
    const [stories, setStories] = useState([]);



    useEffect(() => {
        const getProjects = async () => {
          //fetching all projects from database
    
          const q = query(projectRef , where("ProjectMembers", "array-contains", userEmail));
    
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setProjects(projects => [ ...projects,{ ...doc.data(), id: doc.id }]);

          });
          
        };
        getProjects();
    
    }, []);

    useEffect(() => {
      projects.map((project) => {
        project.UserStories.map((story) => {
          setStories(stories => [...stories, story])
        })
      })
    },[projects]);
    

    return(
        <div>
            {projects.map((project) => {
            return (
              <div
                key={project.id}>
                <h6>{project.ProjectName}</h6>
              </div>
            );
            })}
          
        {stories.map((story) => {
          return (
            <div key = {story.UserStory}>
              <h1>{story.UserStatus}</h1>
            </div>
          )
        })
        }

        </div>
    );
    const data = [
        {name: 'Geeksforgeeks', users: 400},
        {name: 'Technical scripter', users: 700},
        {name: 'Facebook', users: 200},
      ];

    
    return(

        <div style={{textAlign : "center"}}>
            <h1>
                The User's Productivity
            </h1>
            <PieChart width={700} height={700}>
                <Pie
                    dataKey="users"
                    isAnimationActive={true}
                    data={data}
                    cx={350}
                    cy={250}
                    outerRadius={210}
                    fill="#8E0808"
                    label
                />
                <Tooltip />
            </PieChart>
        </div>

    );*/