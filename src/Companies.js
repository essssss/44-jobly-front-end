import { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import CompanyCard from "./CompanyCard";

import JoblyApi from "./api";
import SearchBar from "./SearchBar";

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [companySearchData, setCompanySearchData] = useState("");

    async function getCompaniesData() {
        let companiesData;
        companySearchData
            ? (companiesData = await JoblyApi.getCompanies({
                  name: companySearchData,
              }))
            : (companiesData = await JoblyApi.getCompanies());
        setCompanies(companiesData);
        console.log(companiesData);
    }
    useEffect(() => {
        getCompaniesData();
    }, [companySearchData]);

    return (
        <div>
            <h1>Check out these Companies!</h1>
            <SearchBar
                searchData={companySearchData}
                setSearchData={setCompanySearchData}
            />
            <ul>
                {companies.length > 0 ? (
                    companies.map((company) => (
                        <li key={company.handle}>
                            <Link to={`companies/${company.handle}`}>
                                <CompanyCard
                                    name={company.name}
                                    description={company.description}
                                />
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>No Matching Companies</p>
                )}
            </ul>
        </div>
    );
};

export default Companies;
