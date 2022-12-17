import React, { useState } from "react";
import { Action } from "./action";

export const NewTable = ({ columns, data, options, disableAction, tableContainsNotification }) => {

  const [action, setAction] = useState({ show: false, index: null })

  return (
    <table
      className='tablev2 text-start'>
      <tr className='th'>
        {columns.map((item, index) => {
          return (
            <th
              style={!item.subColumns ? { width: `${100 / columns.length}%` } : {
                width: `${100 / columns.length}%`, height: '3.2rem', alignItems: 'baseline'
              }}
              className='heading'>{item.name}
              {item.filter ? (
                <img className='mx-2' src={"assets/images/down_arrow.png"} />
              ) : null}
              {item.subColumns ? (
                <div className="tableSubColumns" >
                  {item.subColumns.map(i => (
                    <div>{i}</div>
                  ))}
                </div>
              ) : null}
            </th>)
        })}
      </tr>
      {data.length ? data.map((item, index) => {
        return (
          <>
            <tr
              style={item.length == 100 ? { borderBottom: 0, alignItems: "center" } : { alignItems: "center" }}
              className={`th bg-white position-relative tablebodyTr `}
            >
              {
                item.length ? item.map((item, j) => {
                  if (j != 99) {
                    return (
                      <td
                        style={{ width: `${100 / columns.length}%` }}
                        className='heading'>{item}</td>
                    )
                  }
                }) : null
              }
              {disableAction ? null : (
                <td
                  style={{ width: `${100 / columns.length}%` }}
                  className='heading'>
                  <i className="fa fa-ellipsis-v cursor ml-5"
                    onClick={() => setAction({ show: true, index })}
                    aria-hidden="true"></i>
                  {action.show && action.index === index ? (
                    <Action
                      id={index}
                      onDismiss={() => setAction({ show: false, index })}
                      // top={`${6 * (index + 1)}rem`} 
                      options={options} />
                  ) : null}
                </td>
              )}
            </tr>
            {item.length == 100 ? (
              <tr className="w-100 border-0">
                {item[99]}
              </tr>
            ) : null}
          </>
        )
      })
        : <tr className="w-100 py-4 text-center">
          <label className="font-size-16 font-wt-600">No Data Found</label>
        </tr>}
    </table >
  )
}