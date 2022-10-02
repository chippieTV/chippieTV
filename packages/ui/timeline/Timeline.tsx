import * as styles from "./Timeline.module.css";

import * as React from "react";

import Blocks from "./Blocks";
import Workbox from "./Workbox";
import { Client as ClientType, CV, cvSchema } from "./validate";
import { data } from "../../../apps/next/json/cv-data";
import Client from "./Client";
import { string } from "zod";

interface Props {}

const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => JSON.parse(data));

export const TimelineContainer: React.FC<Props> = (props) => {
    // const { data, error } = useSWR<CV>("/api/cv", fetcher);

    // //Handle the error state
    // if (error) return <div>Failed to load</div>;
    // //Handle the loading state
    // if (!data) return <div>Loading...</div>;

    if (!cvSchema.safeParse(data)) console.error("CV shape does not match");

    const startDate = Date.parse(data.Config.startDate);
    const endDate = new Date().valueOf();
    const range_ms = Math.round(Math.abs(endDate - startDate)); // 86400000ms in a day
    const range_days = Math.round(Math.abs(endDate - startDate) / 86400000); // 86400000ms in a day


    const getOffset = (date_in: string): number => {
        // get offset converts a date into a % offset
        // (ms since start date / ms in range) * 100 to convert to %
        return (((Date.parse(date_in) - startDate) / range_ms) * 100);
    };

    const getLength = (start: number, end: number) => {
		// project length is x% where x = ((project.duration / _date_range.duration) * 100)
		// inputs already in %
		return (end - start);
	};

    return (
        <div className={styles.container}>
            <h2>Work History{" "}<span className={styles.showTimeline}>&larr; expand timeline &rarr;</span></h2>

            <Workbox />

            <Blocks>
                {
                    Object.entries(data.Clients).map(([id, client]) => (
                        <Client
                            key={id}
                            id={id}
                            {...client}
                            getOffset={getOffset}
                            getLength={getLength}
                        />
                    ))
                }
            </Blocks>
            
        </div>
  );
};

export default TimelineContainer;
