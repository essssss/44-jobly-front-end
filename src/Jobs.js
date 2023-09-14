import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./api";
const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function getJobsData() {
            const jobsData = await JoblyApi.getJobs();
            console.log(jobsData);
            setJobs(jobsData);
        }
        getJobsData();
    }, []);
    return (
        <div>
            <h1>Check out these jobs!</h1>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <JobCard
                            title={job.title}
                            company={job.companyName}
                            salary={job.salary}
                            equity={job.equity}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Jobs;
