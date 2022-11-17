import React from 'react';

const SearchBox = () => (
  <div className="header-search flat-show-search" id="s1">
    <a href="#" className="show-search header-search-trigger">
      <img src='/assets/icon/search-icon.svg' alt='Search'/>
    </a>
    <div className="top-search">
      <form
        action="#"
        method="get"
        role="search"
        className="search-form"
      >
        <input
          type="search"
          id="s"
          className="search-field"
          placeholder="Search..."
          name="s"
          title="Search for"
          required={true}
        />
        <button
          className="search search-submit"
          type="submit"
          title="Search"
        >
          <i className="icon-fl-search-filled"></i>
        </button>
      </form>
    </div>
  </div>
);

export default SearchBox;