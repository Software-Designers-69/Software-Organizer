import React, { useState } from 'react';

import './UserStories.css';
import Adder from '../Adder/Adder';

function UserStories(props) {
  
  return (
    <div>
      <div className = "storycont">
        {props.project.UserStories.map((story) => {
          return (
            <div key={story.id} className="story-div">
              <h4>{story.UserStory}</h4>
              <div className="story-bottom">
                <p className="story-details">Posted by: {story.UserPoster}</p>
                <p className="story-details">Status: {story.UserStatus}</p>
              </div>
            </div>
          );
        })
      }
      </div>
      <Adder project = {props.project}/>
    </div>

  )
}

export default UserStories