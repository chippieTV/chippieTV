import React from "react";

import * as styles from "./Header.module.css";

const Header: React.FC<{}> = () => (
    <div className={styles.container}>
        <div className={styles.left} />
        <div className={styles.right} />
    </div>
)

export default Header;
