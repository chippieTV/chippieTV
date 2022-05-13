/**
 * lets consider skills over time
 * skills that are focus at some point get high and so we can plot interests
 * working on a project will develop a skill
 * interest in a skill may not reflect actual skill
 * 
 * This will be a sparse dataset but maybe it's interesting
 */

type ArrayMember<T extends any[]> = T[number];

type Interest = ArrayMember<[0,1,2,3,4,5,6,7,8,9,10]>;

interface Skill {
    readonly name: string;
    readonly interestScore: number; // this is average score
    readonly entries?: SkillEntry[];
}

interface SkillEntry {
    readonly interest: Interest;
    readonly date: Date;
}

const skills: Skills = {
    PhotoShop: {
        name: "PhotoShop",
        interestScore: 8
    },
    TypeScript: {
        name: "TypeScript",
        interestScore: 8
    }
}

type Skills = { [skill: string]: Skill };


export const SkillsList: React.FC<{}> = () => (
    <ul>
        {Object.entries(skills).map(([key, val]) =><SkillItem key={key} skill={val} /> )}
	</ul>
)

export const SkillItem: React.FC<{ skill: Skill }> = props => (
    <li>
        <div>{props.skill.name}</div>
        <div>({props.skill.interestScore})</div>
    </li>
);

export default SkillsList;
