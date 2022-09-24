import * as React from "react";

interface Props {
    readonly children: React.ReactNode;
}

const Blocks: React.FC<Props> = props => (
    <div id="blocks-container" className="blocks-wrapper">
        {props.children}
    </div>
);

export default Blocks;
