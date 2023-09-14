import { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";

import JoblyApi from "./api";

const Companies = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function getCompaniesData() {
            const companiesData = await JoblyApi.getCompanies();
            console.log(companiesData);
            setCompanies(companiesData);
        }
        getCompaniesData();
    }, []);

    return (
        <div>
            <h1>Check out these Companies!</h1>
            <ul>
                {companies.map((company) => (
                    <li key={company.name}>
                        <CompanyCard
                            name={company.name}
                            description={company.description}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Companies;
