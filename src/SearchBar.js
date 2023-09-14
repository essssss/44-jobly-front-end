import { useState } from "react";

const SearchBar = ({ searchData, setSearchData }) => {
    const handleChange = (e) => {
        const { value } = e.target;
        setSearchData(value);
    };

    return (
        <div>
            <h2>Search for things!</h2>
            <form>
                <label htmlFor="term">Term:</label>
                <input
                    id="term"
                    required={true}
                    type="text"
                    name="term"
                    value={searchData}
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};
export default SearchBar;
