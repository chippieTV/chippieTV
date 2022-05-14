/**
 * lets consider skills over time
 * skills that are focus at some point get high and so we can plot interests
 * working on a project will develop a skill
 * interest in a skill may not reflect actual skill
 * 
 * This will be a sparse dataset but maybe it's interesting
 */

import React from "react";

type ArrayMember<T extends any[]> = T[number];

type Interest = ArrayMember<[0,1,2,3,4,5,6,7,8,9,10]>;

interface Skill {
    // this is average score
    readonly score: number;
    
    // comes from key, this is ugly but reduces redundant string
    readonly name?: string;
    
    readonly entries?: SkillEntry[];
}

interface SkillEntry {
    readonly interest: Interest;
    readonly date: Date;
}

// pull out into file or db
export const skillsData: Skills = {
    PhotoShop: {
        score: 8
    },
    Illustrator: {
        score:6
    },
    TypeScript: {
        score: 8
    },
    JavaScript: {
        score:6
    },
    React: {
        score: 7
    },
    CSS: {
        score: 6
    },
    HTML: {
        score: 4
    }
}

type Skills = { [skill: string]: Skill };

/**
 * pass in an LI that takes a SKILL
 * @returns UL
 */


interface SkillListProps {
    readonly containerStyle?: string;
    readonly skillsData: Skills;

    // do we need a better interafce here?
    // this should be an LI
    // it's also limiting that we say FC.. what is the better type here?
    readonly LI: React.FC<{skill: Skill}>;
    // readonly LI: React.FC<{skill: Skill}>;
}

export const SkillsList: React.FC<SkillListProps> = (props) => (
    <ul className={props.containerStyle ? props.containerStyle : ""}>
        {Object.entries(props.skillsData).map(([key, val]) => <props.LI key={key} skill={{name: key, score: val.score}} /> )}
	</ul>
)

// Raw LI example
export const SkillItem: React.FC<{ skill: Skill }> = props => (
    <li>
        <div>{props.skill.name}</div>
        <div>({props.skill.score})</div>
    </li>
);

// LI with example inline style (final alt styles will be better managed)
export const StyledSkillItem1: React.FC<{ skill: Skill }> = props => (
    <li style={{ display: "grid", gridTemplateColumns: "1fr 40px", width: "200px", fontWeight: 700, listStyle: "none", lineHeight: "1.4" }}>
        <span style={{ marginRight: "20px" }}>{props.skill.name}</span>
        <span>{props.skill.score}</span>
    </li>
);

export const ExampleStyledSkillsList = () => (
    <SkillsList skillsData={skillsData} LI={StyledSkillItem1} />
);

export default SkillsList;
