import { useState } from "react";

const SearchBar = ({ searchData, setSearchData, searchFn, clearSearch }) => {
    const handleChange = (e) => {
        const { value } = e.target;
        setSearchData(value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        searchFn();
    };

    return (
        <div>
            <h2>Search for things!</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="term">Term:</label>
                <input
                    id="term"
                    required={true}
                    type="text"
                    name="term"
                    value={searchData}
                    onChange={handleChange}
                />
                <button type="submit">Search!</button>
                <button onClick={clearSearch}>Clear Search</button>
            </form>
        </div>
    );
};
export default SearchBar;
