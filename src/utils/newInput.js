import React, { useEffect, useState } from "react";

export const NewTextArea = ({ rows, isAstrix, label, type, name, value, onChange, error, onView, isDisabled }) => {
    
    const astrix = <span className="required-field text-danger">*</span>
    const [showLabel, toggleLabel] = useState(false)

    return (
        <div className="row form-group">
        {showLabel || value ? (
            <label className="input-label">{label} {isAstrix ? astrix : ""}</label>) : null}
        <div className="col-md-12">
            <textarea
            style={{ minHeight: "2.5rem" }}
            disabled={isDisabled} type={type}
            placeholder={label + (isAstrix ? " *" : '')}
            onFocus={() => toggleLabel(true)}
            onBlur={() => toggleLabel(false)}
            rows={rows || 1}
            className={"form-control bg-white" + (error ? " border-danger" : "")}
            name={name} value={value} onChange={onChange} />
            {error ? <div class="text-danger mt-2 font-size-12">
            <i class="fa fas fa-exclamation-circle mr-1" aria-hidden="true"></i>
            <b>{error}</b></div> : ''}
        </div>

        </div>
    )
}

export const NewInput = ({ key, highlightBorder, onClick, noIcon, isAstrix, label, type, name, defaultValue, value, onChange, error, onView, isDisabled }) => {

    const [showLabel, toggleLabel] = useState(false)
    const astrix = <span className="required-field text-danger">*</span>

    return (
        <div className="row form-group">
        {showLabel || value ? (
            <label className="input-label">{label} {isAstrix ? astrix : ""}</label>) : null}
        <div onClick={onClick} className={`col-md-12 ${highlightBorder ? 'selectedInput' : ''} `}>
            <input key={key || label} disabled={isDisabled} type={type}
            placeholder={label + (isAstrix ? " *" : '')}
            onFocus={() => toggleLabel(true)}
            onBlur={() => toggleLabel(false)}
            className={"form-control bg-white" + (highlightBorder && " border-0 ") + (error ? " border-danger" : "")}
            name={name} defaultValue={defaultValue || ""} value={value} onChange={onChange} />
            {type === "date" && !noIcon ? (
            <img src={"assets/images/calender.png"} className="input-date-icon" />
            ) : null}
            {error ? <div class="text-danger mt-2 font-size-12">
            <i class="fa fas fa-exclamation-circle mr-1" aria-hidden="true"></i>
            <b>{error}</b></div> : ''}
        </div>
        </div>
    )
}

export const NewSelect = ({ noIcon, isAstrix, label,
  optionValue, optionLabel, selectData,
  name, value, onChange, error, isDisabled, highlightBorder, onClick }) => {

    const [showLabel, toggleLabel] = useState(false)
    const astrix = <span className="required-field text-danger">*</span>

    return (
        <div className="row form-group">
        {showLabel || value ? (
            <label className="input-label">{label} {isAstrix ? astrix : ""}</label>) : null}
        <div
            onClick={onClick}
            className={`col-md-12 ${highlightBorder ? 'selectedInput' : ''} `}>
            <select
            onFocus={() => toggleLabel(true)}
            onBlur={() => toggleLabel(false)}
            disabled={isDisabled} className={"form-control form-select " + (highlightBorder && "border-0") + (error ? " border-danger " : " ")} name={name}
            value={value} onChange={onChange} >
            <option disabled selected value="">{(showLabel || value) ? "" : `${label} ${isAstrix ? " *" : ""}`} </option>
            {selectData.map((item) => (
                <option value={item.value}>{item.label}</option>
            ))}
            </select>
            {error ? <div class="text-danger mt-2 font-size-12">
            <i class="fa fas fa-exclamation-circle mr-1" aria-hidden="true"></i>
            <b>{error}</b></div> : ''}
        </div>
        </div>
    )
}


export const InputWithSelect = ({ defaultSelectValue, defaultValue, key, isAstrix, type, label,
  selectName, selectValue, optionValue, optionLabel, selectData,
  name, value, onChange, error, isDisabled }) => {

    const [showLabel, toggleLabel] = useState(false)
    const astrix = <span className="required-field text-danger">*</span>

    return (
        <div className="row form-group justify-content-start mx-0">
        {showLabel || value ? (
            <label className="input-label">{label} {isAstrix ? astrix : ""}</label>) : null}
        <div className="col-12 px-0 d-flex borderRadius">
            <select key={key || label} disabled={isDisabled} className={"form-control w-20 select-attached" + (error ? " border-danger" : "")} name={selectName}
            defaultValue={defaultSelectValue || ""} value={selectValue} onChange={onChange} >
            {selectData.map((item) => (
                <option value={item[optionValue]}>{item[optionLabel]}</option>
            ))}
            </select>
            <input key={key || label} disabled={isDisabled} type={type}
            placeholder={label + (isAstrix ? " *" : '')}
            onFocus={() => toggleLabel(true)}
            onBlur={() => toggleLabel(false)}
            className={"form-control w-80 bg-white input-attached selectinputform" + (error ? " border-danger" : "")}
            name={name} defaultValue={defaultValue || ""} value={value} onChange={onChange} />
            {/* {error ? <div class="text-danger mt-2 font-size-12">
            <i class="fa fas fa-exclamation-circle mr-1" aria-hidden="true"></i>
            <b>{error}</b></div> : ''} */}
        </div>
        {error ? <div class="text-danger mt-2 font-size-12">
            <i class="fa fas fa-exclamation-circle mr-1" aria-hidden="true"></i>
            <b>{error}</b></div> : ''}
        </div>
    )

}