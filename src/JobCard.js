import "./JobCard.css";

const JobCard = ({ title, salary, equity, company }) => {
    return (
        <div className="JobCard">
            <h4>{title}</h4>
            <h5>{company}</h5>
            <p>
                <small className="JobCardSalary">SALARY: {salary}</small>
                {equity && (
                    <small className="JobCardEquity">|| EQUITY:{equity}</small>
                )}
            </p>
        </div>
    );
};
export default JobCard;
