import Header from "ui/tcf/Header";

import {
  Heading as ProfileHeading,
  Profile as ProfileContents,
  Summary as ProfileSummary
} from "ui/contents/profile";
import { ExampleStyledSkillsList as SkillsList } from "ui/contents/profile/Skills";


const App = () => {
  return (
    <>
      <Header />

      <div style={{ padding: "16px" }}>
        <ProfileHeading/>

        <ProfileContents />
        <ProfileSummary />
        <SkillsList />
      </div>
    </>
  )
}

export default App;
