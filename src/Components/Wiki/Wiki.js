import React from 'react';
import AdderDocument from '../AdderDocument/AdderDocument';
import AdderWiki from '../AdderWiki/AdderWiki';

function Wiki(props) {
  return (
    <div>
        <h3>{props.project.ProjectWiki}</h3>
        <AdderWiki project = {props.project} />
        <AdderDocument project={props.project} />
    </div>
  )
}

export default Wiki
