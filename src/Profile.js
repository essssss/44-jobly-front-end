import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";

import JoblyApi from "./api";
import JobCard from "./JobCard";

const Profile = ({
    applyToJob,
    token,
    currentUserApplications = [],
    username,
    firstName,
    lastName,
    currentUser,
}) => {
    const [jobApplications, setJobApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(currentUserApplications);
        const fetchJobData = async () => {
            const jobDataPromises = currentUserApplications.map(async (id) => {
                const fetchedJobData = await fetchJobApplicationData(id);
                return fetchedJobData.job;
            });

            try {
                const resolvedJobData = await Promise.all(jobDataPromises);
                setJobApplications(resolvedJobData);
            } catch (error) {
                console.error("Error fetching job data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobData();
    }, [currentUserApplications, isLoading]);

    const fetchJobApplicationData = async (id) => {
        try {
            const fetchedApplicationData = await JoblyApi.getJobById(id);

            return fetchedApplicationData;
        } catch (error) {
            console.error("Error fetching job application data:", error);
            return null; // Handle the error as needed
        }
    };

    return token ? (
        <div>
            <h1>Welcome, {currentUser.username}</h1>
            <p>
                Your First Name is {currentUser.firstName} and your Last Name is{" "}
                {currentUser.lastName}
            </p>
            <Link to="profile/edit">
                <small>edit profile</small>
            </Link>
            {isLoading ? ( // Conditionally render loading indicator
                <p>Loading...</p>
            ) : jobApplications.length > 0 ? (
                <>
                    <h3>Here are your applications:</h3>
                    <ul>
                        {jobApplications.map((job) => (
                            <li key={job.id}>
                                <JobCard
                                    currentUserApplications={
                                        currentUserApplications
                                    }
                                    applyToJob={applyToJob}
                                    username={username}
                                    id={job.id}
                                    title={job.title}
                                    companyName={job.company.name}
                                    companyHandle={job.company.handle}
                                    salary={job.salary}
                                    equity={job.equity}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <h3>
                    <Link to="/jobs">Go apply to some jobs!</Link>
                </h3>
            )}
        </div>
    ) : (
        <Redirect to="/" />
    );
};
export default Profile;
