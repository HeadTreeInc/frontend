import React from "react";

const filter = ({ filter, setFilter, refresh, setRefresh }) => {

  const handleKeyDown = (event) => {
    event.persist();
    if (event.keyCode === 13) {
      setRefresh(refresh + 1)
    }
  };

  const handleChange = async (event) => {
    event.persist()
    setFilter({ ...filter, [event.target.name]: event.target.value })
  }

  return (

    <div className="d-flex align-items-center justify-content-between">
      <div className="">
        <button type="button" className="btn btn-light bg-white px-4 border border-radius-12 text-start d-none"><img src={"assets/images/filter.png"} alt="" /><span className="px-2">Filter</span></button>
      </div>
      <div className="input-group mb-3 col-md-3 currency mt-3 pe-1">
        <span className="input-group-text bg-white border-end-0" id="basic-addon1"><img src={"assets/images/search.png"} alt="search" /></span>
        <input type="text" name='search'
          onKeyDown={handleKeyDown} onChange={handleChange}
          className="form-control border-start-0" placeholder="Search" />
      </div>
    </div>
  );
}
export default filter;