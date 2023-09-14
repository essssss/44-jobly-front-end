import { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import CompanyCard from "./CompanyCard";

import JoblyApi from "./api";
import SearchBar from "./SearchBar";

const Companies = () => {
    const INITIAL_STATE = "";
    const [companies, setCompanies] = useState([]);
    const [companySearchData, setCompanySearchData] = useState(INITIAL_STATE);

    const searchFn = async () => {
        const filteredCompaniesData = await JoblyApi.getCompanies({
            name: companySearchData,
        });

        setCompanies(filteredCompaniesData);
    };
    async function getCompaniesData() {
        const companiesData = await JoblyApi.getCompanies();
        setCompanies(companiesData);
        console.log(companiesData);
    }
    useEffect(() => {
        getCompaniesData();
    }, []);

    const clearSearch = (e) => {
        e.preventDefault();
        setCompanySearchData(INITIAL_STATE);
        getCompaniesData();
    };
    return (
        <div>
            <h1>Check out these Companies!</h1>
            <SearchBar
                searchFn={searchFn}
                searchData={companySearchData}
                setSearchData={setCompanySearchData}
                clearSearch={clearSearch}
            />
            <ul>
                {companies.map((company) => (
                    <li key={company.handle}>
                        <Link to={`companies/${company.handle}`}>
                            <CompanyCard
                                name={company.name}
                                description={company.description}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Companies;
