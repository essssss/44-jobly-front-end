import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";

const Company = () => {
    const [company, setCompany] = useState(null);
    const { handle } = useParams();

    useEffect(() => {
        async function getCompanyData() {
            try {
                const companyData = await JoblyApi.getCompany(handle);
                setCompany(companyData);
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        }
        getCompanyData();
    }, [handle]);

    return (
        <div>
            {company ? (
                <div>
                    <h1>{company.name}</h1>
                    <p>{company.description}</p>
                    <ul>
                        {company.jobs.map((j) => (
                            <li key={j.id}>
                                <JobCard
                                    title={j.title}
                                    salary={j.salary}
                                    equity={j.equity}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Company;
