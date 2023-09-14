import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./api";
import SearchBar from "./SearchBar";
const Jobs = () => {
    const INITIAL_STATE = "";
    const [jobs, setJobs] = useState([]);
    const [jobsSearchData, setJobsSearchData] = useState(INITIAL_STATE);

    async function getJobsData() {
        let jobsData;
        jobsSearchData
            ? (jobsData = await JoblyApi.getJobs({
                  title: jobsSearchData,
              }))
            : (jobsData = await JoblyApi.getJobs());
        setJobs(jobsData);
        console.log(jobsData);
    }

    useEffect(() => {
        getJobsData();
    }, [jobsSearchData]);

    return (
        <div>
            <h1>Check out these jobs!</h1>
            <SearchBar
                searchData={jobsSearchData}
                setSearchData={setJobsSearchData}
            />
            <ul>
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <li key={job.id}>
                            <JobCard
                                title={job.title}
                                companyName={job.companyName}
                                companyHandle={job.companyHandle}
                                salary={job.salary}
                                equity={job.equity}
                            />
                        </li>
                    ))
                ) : (
                    <p>No Matching Jobs</p>
                )}
            </ul>
        </div>
    );
};

export default Jobs;
