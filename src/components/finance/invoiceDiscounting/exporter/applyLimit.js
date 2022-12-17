import React, { useState } from 'react';
import SideBar from '../../../partial/sidebar';
import Header from '../../../partial/header';
import { NewInput, NewSelect, InputWithSelect } from '../../../../utils/newInput';
import { FileInput } from '../../../../utils/fileInput';
// import { convertImageToPdf } from '../../../../utils/myFunctions';

const most_used_currencies = [
  { id: 47, name: "Rupees", code: "INR", symbol: "₹" },
  { id: 2, name: "Dollars", code: "USD", symbol: "$" },
  { id: 11, name: "Euro", code: "EUR", symbol: "€" },
  { id: 19, name: "Pounds", code: "GBP", symbol: "£" },
  // { id: 44, name: "Dollars", code: "HKD", symbol: "$" },
  // { id: 22, name: "Dollars", code: "CAD", symbol: "$" },
  // { id: 6, name: "Dollars", code: "AUD", symbol: "$" },
  // { id: 63, name: "Switzerland Francs", code: "CHF", symbol: "CHF" },
  // { id: 95, name: "Rand", code: "ZAR", symbol: "R" },
  // { id: 74, name: "Dollars", code: "NZD", symbol: "$" }
]

const ApplyForLimit = () => {

  const [data, setData] = useState({});
  const [errors, setErrors] = useState(0);
  const [currencyData, setcurrencyData] = useState(most_used_currencies);

  const reviewForm = [
    { "name": "Buyer Name", val: "buyerName" },
    { "name": "Previous year annual sales", val: "previousAnnualSale", unit: "buyerCurrency" },
    { "name": "Contact Number:", val: "buyerPhone", unit: "buyerPhoneCode" },
    { "name": "Expected current year’s annual sale", val: "currentAnnualSale", unit: "buyerCurrency" },

    { "name": "Email Id", val: "buyerEmail" },
    { "name": "Inco Terms", val: "incoTerms" },
    { "name": "Website", val: "buyerWebsite" },
    { "name": "Terms of Payment", val: "termsOfPayment" },

    { "name": "Address", val: "buyerAddress" },
    { "name": "Product Details", val: "productDetails" },

    { "name": "DUNS No", val: "buyerDUNSNo" },
    { "name": "HSN Code", val: "buyerHsnCode" },

  ]

  function handleChange(e) {
    e.persist()
    setData({ ...data, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const handleFile = event => {
    event.persist()
    if (!event.target.files.length) {
      return null
    }
    else {
      let file_type = event.target.files[0]["type"].toLowerCase()
      if (!((file_type.includes("pdf")) || (file_type.includes("png")) || (file_type.includes("jpeg")))) {
        setErrors({ ...errors, [event.target.name]: "Files with pdf, png & jpeg extension are allowed" })
        return
      }
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = async (e) => {
        let fileObj = event.target.files[0]
        let fileDataUrl = e.target.result
        if (!file_type.includes("pdf")) {
          // let response = await convertImageToPdf(fileDataUrl, event.target.files[0]["name"]);
          // console.log("pdfconversionresp", response);
          // fileObj = response["file"]
          // fileDataUrl = response['dataUrl']
          // toastDisplay("File converted into pdf format", "success")
        }
        fileObj["filebase64"] = fileDataUrl
        setData({ ...data, [event.target.name]: fileObj })
        setErrors({ ...errors, [event.target.name]: "" });
      }
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <SideBar state="limit" />
          <main role="main" className={"ml-sm-auto col-lg-10 expanded-right"} id="app-main-div">
            <Header title={"Apply for Limit"} />
            <div style={{ width: '91rem', height: '40rem', borderRadius: '2rem' }} className="bg-white align-self-center py-4 shadow ml-9 my-xl-4">
              {!data.buyerName ?
                <div className="d-flex flex-column col-md-12 align-items-center my-xl-3" style={{}}>
                  <div className="form-floating mb-2 w-50 position-relative">
                    <h6 className="mb-4">Select Buyer</h6>
                    <div className="col-md-6">
                      <NewSelect isAstrix={true} label={"Please Select Buyer"}
                        selectData={[{ "label": "Buyer 1", "value": "Buyer 1" }, { "label": "Buyer 2", "value": "Buyer 2" }]} name={"buyerName"}
                        value={data.buyerName} optionLabel={"buyerName"} optionValue={'id'}
                        onChange={handleChange} error={errors.buyerName} />
                    </div>
                  </div>
                </div> :
                <><div className='px-5 py-4 pt-5'>
                  <div className="row">

                  <div className="col-md-4 mb-3">
                        <InputWithSelect isAstrix={true} type={"number"} label={"Enter Limit Required"}
                          selectData={currencyData}
                          selectName={"limitRequiredCurrency"} selectValue={data.limitRequiredCurrency}
                          optionLabel={"code"} optionValue={'code'}
                          name={'limitRequired'} value={data.limitRequired} error={errors.limitRequired}
                          onChange={handleChange} />
                      </div>

                    <div className='w-100'>
                      <label className='font-wt-500 font-size-16 mb-3'><u>Buyer Details</u>
                      </label>
                      <div className="row">
                        {reviewForm.map((item) => {
                          return (
                            <div className="col-md-6">
                              <p className="d-flex d-flex align-items-top mb-2"><span className="col-md-5 px-0 BuyerdetailsLabel">{item.name}</span><span className="mx-3">:</span><span className="col-md-7 BuyerdetailsDesc" > {data[item.val] ? (item.unit ? `${data[item.unit]} ` : "") + (data[item.val]) : "NA"}</span> </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className='w-100'>
                      <label className='font-wt-500 font-size-16 mb-3'><u>Documents</u>
                      </label>
                      <div className='row mt-2'>
                          <div className="col-md-5">
                            <label className="font-size-14">Invoice</label>
                            <div className="row form-group">
                              <div className="col-md-12">
                                <FileInput name={"invoiceDocument"} value={data.invoiceDocument} error={errors.invoiceDocument}
                                  onChange={handleFile} isEditable={false}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <label className="font-size-14">Purchase Order</label>
                            <div className="row form-group">
                              <div className="col-md-12">
                                <FileInput name={"poDocument"} value={data.poDocument} error={errors.poDocument}
                                  onChange={handleFile} isEditable={false}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="row pb-5 mx-4">
                  <button type="button"
                    // onClick={() => handleValidation()}
                    className={`mx-2 new-btn w-15 py-2 px-2 text-white`}>
                    {"Submit"}
                  </button>
                </div>

                </>
                }
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default ApplyForLimit