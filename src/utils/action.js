import React from "react";
import { useEffect } from "react";

export const Action = ({ id, options, top, onDismiss }) => {
  const box = React.createRef();

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
  }, [])

  const handleOutsideClick = (event) => {
    if (box && box.current && !box.current.contains(event.target)) {
      onDismiss()
    }
  }


  return (
    <div ref={box}
      style={{
        // top: top, 
        "top": "0rem",
        "zIndex": 10
      }}
      className="bg-white action-view text-left">
      {options.map((item, index) => {
        return (
          <div className="py-3 px-4 action-label"
            onClick={() => { item.onClick(id); onDismiss() }}>
            <img className="mr-2 " src={`assets/images/${item.icon}`} />
            <label>{item.name}</label>
          </div>
        )
      })}
    </div>
  )
}