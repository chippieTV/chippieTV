import * as styles from "./Project.module.css";

import * as React from "react";

import {
    type Client as ClientType,
    type Project as ProjectType
} from "./validate";

type Props = {
    readonly project: ProjectType;
};


// var _id = id.split("-"),
// if(_id[1]) {
//     console.log('this is a project');
//     // use i so can use same code as inner loop.. could be confusing?!
//     var i = _id[1] - 1;
// } else {
//     console.log('this is a client root');
//     // default to the first project so we have something to display
//     var i = 0;
// }

export const Project: React.FC<Props> = props => {
    return (
        <div className={styles.project}>
            <div id={props.project.project_id} className={styles.projectDisplayTitle}>
                {props.project.project_title}
            </div>
            
            { props.project.images && <img src={`/img/clients/${props.project.images[0].filename}`} /> }

            <div className="project-display-description">
                {props.project.project_description_s}
            </div>
        </div>
    );
}



export const Workbox: React.FC<ClientType> = props => (
    <>
        <div className="workbox-client-name">{props.client_name}</div>
        <div className="workbox-description-s">{props.client_description_s}</div>
        <div className="workbox-description-l">{props.client_description_l}</div>
    </>
);


export const ProjectSubNav: React.FC<ProjectType[]> = props => (
    <div id="sub-nav" className="projects">
        {/* TODO reverse this order and handle clicks */}
        {props.map(project => {
            return <div onClick={() => console.log(project.project_id)} className="project-display-title">{project.project_title}</div>
        })}
    </div>
);

export default Project;
