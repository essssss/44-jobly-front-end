import "./CompanyCard.css";

const CompanyCard = ({ name, description }) => {
    return (
        <div className="CompanyCard">
            <h4>{name}</h4>
            <h5>{description}</h5>
        </div>
    );
};
export default CompanyCard;
