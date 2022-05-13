// import { useState } from 'react'
// import logo from './logo.svg'
import "./App.css";

import Header from "ui/tcf/Header";

import {
  Profile as ProfileContents,
  SkillsList,
  Summary as ProfileSummary
} from "ui/contents/profile";

const App = () => {
  return (
    <div className="App">
      <Header />

      <ProfileContents />
      <ProfileSummary />
      <SkillsList />
    </div>
  )
}

export default App;
