import * as styles from "./Workbox.module.css";

import * as React from "react";

interface Props {}

export const Workbox: React.FC<Props> = (props) => {
  return (

    <div className={styles.workbox}>
        <div id="workbox-container" />
        <div className="white-fade" />

        <div id="projects-container" />
    </div>

  );
};

export default Workbox;
