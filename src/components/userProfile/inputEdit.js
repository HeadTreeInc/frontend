import React from "react";

const InputEdit = ({ Placeholder, Label, isDisabled, name, value, onChange, type }) => {
  return (
    <>
      <label className="mb-0">{Label}</label>
      <div class="input-group border-bottom mb-3">
        <input disabled={isDisabled} type={type ? type : "text"} class="form-control border-0" placeholder={Placeholder} name={name} value={value} onChange={onChange} />
        {!isDisabled && <span class="input-group-text bg-transparent border-0 cursor"><img src={"/assets/images/bytesize_edit.png"} alt="" /></span>}
      </div>
    </>
  );
}
export default InputEdit;