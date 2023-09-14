import "./JobCard.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

const JobCard = ({ title, salary, equity, companyName, companyHandle }) => {
    return (
        <div className="JobCard">
            <h4>{title}</h4>
            {companyName && (
                <h5>
                    <Link to={`/companies/${companyHandle}`}>
                        {companyName}
                    </Link>
                </h5>
            )}
            <p>
                <small className="JobCardSalary">SALARY: {salary}</small>
                {equity && equity !== "0" && (
                    <small className="JobCardEquity">|| EQUITY:{equity}</small>
                )}
            </p>
        </div>
    );
};
export default JobCard;
