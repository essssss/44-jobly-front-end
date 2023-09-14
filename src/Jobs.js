import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./api";
import SearchBar from "./SearchBar";
const Jobs = () => {
    const INITIAL_STATE = "";
    const [jobs, setJobs] = useState([]);
    const [jobsSearchData, setJobsSearchData] = useState(INITIAL_STATE);

    const searchFn = async () => {
        const filteredJobsData = await JoblyApi.getJobs({
            title: jobsSearchData,
        });
        setJobs(filteredJobsData);
    };
    async function getJobsData() {
        const jobsData = await JoblyApi.getJobs();
        setJobs(jobsData);
    }
    useEffect(() => {
        getJobsData();
    }, []);

    const clearSearch = (e) => {
        e.preventDefault();
        setJobsSearchData(INITIAL_STATE);
        getJobsData();
    };

    useEffect(() => {
        async function getJobsData() {
            const jobsData = await JoblyApi.getJobs();
            setJobs(jobsData);
        }
        getJobsData();
    }, []);
    return (
        <div>
            <h1>Check out these jobs!</h1>
            <SearchBar
                searchFn={searchFn}
                searchData={jobsSearchData}
                setSearchData={setJobsSearchData}
                clearSearch={clearSearch}
            />
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <JobCard
                            title={job.title}
                            companyName={job.companyName}
                            companyHandle={job.companyHandle}
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
