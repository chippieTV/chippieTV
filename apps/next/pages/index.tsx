import type { NextPage } from "next";
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import Header from "ui/tcf/Header";
import Timeline from "ui/timeline/Timeline";

import {
  Heading as ProfileHeading,
  Profile as ProfileContents,
  Summary as ProfileSummary
} from "ui/contents/profile";
import { ExampleStyledSkillsList as SkillsList } from "ui/contents/profile/Skills";

const Home: NextPage = () => {
  return (
    <>
        <Header />
        <section className="page-container">

            <div style={{ padding: "16px" }}>
                <ProfileHeading/>
                <Timeline />
                {/* <ProfileContents /> */}
                {/* <ProfileSummary /> */}
                {/* <SkillsList /> */}
            </div>
        </section>
    </>
  )
}

export default Home
