import React from "react";

const InputDropdown = ({ Label, Dropdown, Dropdownname, Placeholder, name, value, onChange, type }) => {
  return (
    <>
      <label className="mb-0">{Label}</label>
      <div class="input-group mb-3 border-bottom">
        <button class="btn dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"> <span className="me-2">{Dropdownname}</span></button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item">{Dropdown}</a></li>
        </ul>
        <input type={type ? type : "text"} class="form-control border-0" placeholder={Placeholder} name={name} value={value} onChange={onChange} />
        <span class="input-group-text bg-transparent border-0 cursor"><img src={"/assets/images/bytesize_edit.png"} alt="" /></span>
      </div>
    </>
  );
}
export default InputDropdown;