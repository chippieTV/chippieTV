import * as styles from "./Client.module.css";

import * as React from "react";

import {type Client as ClientType} from "./validate";

type Props = {
    readonly active?: boolean; // true | undefined?
    readonly id: string;
    readonly getOffset: (date: string) => number;
    readonly getLength: (start: number, end: number) => number;
} & ClientType;


export const Client: React.FC<Props> = props => {

    let _block_start: number; // push the earliest date to the block
    let _block_end: number; // push the latest date to the block

    const projects = props.projects.map(p => {
        const start = props.getOffset(p.start);

        // earliest project to set start of client range
        if(!_block_start || (_block_start >= start)) _block_start = start;
        
        // start is start of specific project - last project is end of range
        if(!_block_end || (_block_end <= start)) _block_end = start;

        return {
            ...p,
            css_class: start > 65 ? "" : styles.blockSubL,
            offset: start
        }
    })

    // if client is still active, set to 100% width
    // renderBlock() will fit to maximum width
    // if active _duration AND _block_end should be set to 100
    // const _duration = props.active ? 100 : props.getLength(_block_start, _block_end);

    if (props.active) _block_end = 100;

    const client = {
        // if this object gets reused we should process outside
        // id: props.id,
        // subs: processedProjects,
        client_name: props.client_name,
        client_description_s: props.client_description_s,
        client_description_l: props.client_description_l,
        duration:  props.active ? 100 : props.getLength(_block_start!, _block_end!), // %
        offset: _block_start!, // %
    };


    return (
        <div className={styles.block} id={props.id}>
            <div className={styles.blockTitle} style={{ marginLeft: client.offset + "%" }}>
                {client.client_name}
            </div>

            <div
                className={styles.blockRange}
                style={{
                    marginLeft: client.offset + "%",
                    width: client.duration + "%"
                }}
            />

            {
                projects.map(project => (
                    <div
                        key={project.project_id}
                        id={project.project_id} // replace with click handler
                        className={styles.blockSub}
                        style={{ marginLeft: project.offset + "%"}}
                    >

                        <div className={styles.projectBlock}>
                            <div className={styles.projectTitle}>{project.project_title}</div>
                            <div className={styles.projectDescriptionS}>{project.project_description_s}</div>
                        </div>
                    </div>
                ))
            }

        </div>
    );
};

export default Client;
