import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone'
import { Line, Circle } from 'rc-progress';
import DocViewer from "react-doc-viewer";

function downloadTheFile(result) {
  if (result.filebase64.includes("base64,")) {
    result["filebase64"] = result.filebase64.split("base64,")[1]
  }
  if (result.name.split(".").pop() === "png" || result.name.split(".").pop() === "PNG") {
    console.log(result.name);
    let link = document.createElement("a");
    console.log(link);
    link.download = result.name.split(".")[0] + ".png";
    link.href = 'data:application/png;base64,' + encodeURI(result.filebase64);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (result.name.split(".").pop() === "jpg" || result.name.split(".").pop() === "JPG") {
    let link = document.createElement("a");
    link.download = result.name.split(".")[0] + ".jpeg";
    link.href = 'data:application/jpeg;base64,' + encodeURI(result.filebase64);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (result.name.split(".").pop() === "pdf" || result.name.split(".").pop() === "PDF") {
    let link = document.createElement("a");
    link.download = result.name.split(".")[0] + ".PDF";
    link.href = 'data:application/pdf;base64,' + encodeURI(result.filebase64);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function getSourceType(mime) {
  return ((mime === "png" || mime === "PNG") ? "data:image/png;base64," :
    (mime === "jpg" || mime === "JPG") ? "data:image/jpeg;base64," :
      (mime === "pdf" || mime === "PDF") ? "data:application/pdf;base64," : "")
}

function viewTheFile(result) {
  if (result.filebase64.includes("base64,")) {
    result["filebase64"] = result.filebase64.split("base64,")[1]
  }
  let mime = result.name.split(".").pop()
  let sourceType = getSourceType(mime)
  return (
    <>
      {
        (mime === "pdf" || mime === "PDF") ?
          <iframe title="Document Preview" frameborder="0" height="100%" className="col-md-12 m-0 p-0"
            src={sourceType + encodeURI(result.filebase64 ? result.filebase64 : "")}></iframe>
          :
          <img src={sourceType + encodeURI(result.filebase64 ? result.filebase64 : "")} alt={result.name} />
      }
    </>
  )
}


export const FileInput = ({ hideVault, name, value, onChange, error, onUploadCancel, onView, isEditable, extra_class }) => {
  console.log("selectedfile", value, name);

  const [uploadProgress, toggleUplaodProgress] = useState(!isEditable ? 100 : 0)
  const [showDoc, toggleShowDoc] = useState(false)

  let isFileSelected = value && value.name ? true : false

  useEffect(() => {
    if (isFileSelected && uploadProgress < 100) {
      setTimeout(() => {
        toggleUplaodProgress(uploadProgress + 35)
      }, 1000);
    }
  }, [value, uploadProgress])

  const onDrop = ((acceptedFiles, fileRejections, event) => {
    // console.log("acceptedFilesss", acceptedFiles);
    if (acceptedFiles.length) {
      let event = {
        target: { name: name, files: acceptedFiles },
        persist: () => console.log("onDrop called")
      }
      onChange(event)
      toggleUplaodProgress(0)
    }
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      {showDoc ? (
        <div className={"modal d-block show "} id="docPreview">
          <div className="modal-dialog modal-xl border-inner" id="parent_class">
            <div className="modal-content">
              <div className="modal-header primary">
                <h4 className="modal-title text-white">{value.name}</h4>
                <button type="button" className="close" onClick={() => { toggleShowDoc(false) }}>×</button>

              </div>
              <div className="modal-body">
                <div className="calc-inner-modal col-md-12 m-0 p-0" >
                  <div className="d-flex m-0 p-0" style={{ "height": "90%" }}>
                    <div className={"tab-pane active show col-md-12"}>
                      {viewTheFile(value)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className={"custom-file-upload" + (error ? " border-danger" : "") + (extra_class ? (" " + extra_class) : "")}>
        {isFileSelected ? (
          <>
            {uploadProgress >= 100 ? (
              <div
                className="selectedFile-div align-items-center"
              >
                <img className="" src={"assets/images/pdf_file.png"} />
                <label className="file-text m-0">{value.name}</label>
                {isEditable ? (
                  <label
                    onClick={onUploadCancel}
                    className="cursor m-0">
                    <img src={"assets/images/edit.png"} />
                  </label>
                ) : null}
                <img
                  style={
                    {
                      width: "22px",
                      height: "22px"
                    }
                  }
                  src={"assets/images/show_pass.png"}
                  className='cursor' onClick={() => toggleShowDoc(true)}
                />
                <img src={"assets/images/download_light.png"} className='cursor'
                  onClick={() => downloadTheFile(value)}
                />
              </div>
            ) : (
              <>
                <Line percent={uploadProgress}
                  style={{ marginLeft: '1%', width: '85%' }}
                  strokeWidth={2} strokeColor="#1B94B7" />
                <img
                  onClick={onUploadCancel}
                  src={"assets/images/cancel-icon.png"} color={"#fff"} />
              </>
            )}
          </>
        ) : (
          <>
            {isEditable ? (
              <>
                <div
                  {...getRootProps()}
                  className={`dragDrop-div ${isDragActive ? "dragDrop-div-active" : ""}`}
                >
                  <img src={"assets/images/drag.png"} />
                  <span>Drag & Drop</span>
                </div>
                <label
                  className="browse-div cursor text-center m-0"
                  for={name}
                >
                  <img src={"assets/images/folder.png"} />
                  Browse
                </label>
                <div
                  className="vault-div"
                >
                  <img src={"assets/images/vault-white.png"} color={"#fff"} />
                  Vault
                </div>
              </>
            ) :
              <label className="font-wt-600">No Document Found</label>}
          </>
        )
        }
      </div >
      <input
        {...getInputProps()}
        id={name}
        onChange={(e) => { onChange(e); toggleUplaodProgress(0) }}
        type="file" className={"d-none"}
        name={name}
      />
    </>)
}