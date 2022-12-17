import React, { useState, useEffect, useRef } from "react";
import Logo from "../../logo.svg";
import RefImg from "../../bg_1.png";
import { ToastContainer } from "react-toastify";
// import SelectField from "../common-components/SelectField";
import axios from "axios";
import BgImg from '../../bg.png'
import call from "../../service";
// import toastDisplay from "../../utils/toastNotification";
// import { platformBackendUrl } from "../../urlConstants";
import { InputWithSelect, NewInput, NewSelect } from "../../utils/newInput";

const onboardingTabs = [
  { name: "Company Type" },
  { name: "KYC details" },
  { name: "Company details" },
  { name: "Personal details" },
  { name: "Create password"}
]

const FieldTypes = [
  {
    name: 'Import/Export', type: "finTech", typeId: 19, techType: 2,
    soleProprietorship: true, partnership: true, pvtPubLtd: true, llp: true, foreign: true
  },
  {
    name: 'Banks/Finance/NBFC', type: 'finTech', typeId: 8, techType: 2,
    soleProprietorship: true, partnership: true, pvtPubLtd: true, llp: true, foreign: true
  },
  {
    name: 'Channel Partner', type: "CP", typeId: 20, techType: null,
    individual: true, soleProprietorship: true, partnership: true, pvtPubLtd: true, llp: true
  },
  {
    name: 'Franchise Partner', type: "FP", typeId: 20, techType: null,
    individual: true, soleProprietorship: true, partnership: true, pvtPubLtd: true, llp: true
  }
]

export const companyTypes = [
  { name: 'Individual', alt: "individual", aadharDocument: true, panDocument: true },
  { name: 'Sole Proprietorship', alt: "soleProprietorship", gstDocument: true, iecDocument: true, iecDocumentIgnore1: true, iecDocumentIgnore2: true, iecDocumentIgnore3: true },
  { name: 'Partnership', alt: "partnership", gstDocument: true, iecDocument: true, iecDocumentIgnore1: true, iecDocumentIgnore2: true, iecDocumentIgnore3: true },
  { name: 'PVT/PUB. LTD', alt: 'pvtPubLtd', gstDocument: true, iecDocument: true, cinDocument: true, iecDocumentIgnore1: true, iecDocumentIgnore2: true, iecDocumentIgnore3: true },
  { name: 'LLP', alt: "llp", gstDocument: true, iecDocument: true, iecDocumentIgnore1: true, iecDocumentIgnore2: true, iecDocumentIgnore3: true },
  { name: 'Foreign Entity/INC', alt: "foreign" }
]

const kycDocTypes = [
  { name: 'CIN Number', alt: "cinDocument" },
  { name: 'GST Number', alt: "gstDocument" },
  { name: 'IEC Number', alt: "iecDocument" },
  { name: 'PAN Number', alt: "panDocument" },
  { name: 'Aadhar Number', alt: "aadharDocument" }
]

const cpDocTypes = [
  { name: 'PAN Number' },
  { name: 'Aadhar Number' }
]

const formTitles = [
  { name: "Select your field" },
  { name: "Select your company type" },
  { name: "Enter your registration details" },
  { name: "Enter your company details" },
  { name: "Enter your personal details" },
  { name: "Create password" }
]

export const industryData = [
  { value: "apparelTextile", name: "Apparels & Textile" },
  { value: "industrialMech", name: "Industrial & Mechanical" },
  { value: "foodBeverage", name: "Food & Beverage" },
  { value: "electronicConsumer", name: "Electronics & Consumer Goods" },
  { value: "eCommerce", name: "E-Commerce" },
  { value: "gamingMedia", name: "Gaming & Media" },
  { value: "fmcg", name: "FMCG" },
  { value: "medicalPharma", name: "Medical & Pharmaceutical" },
  { value: "auto", name: "Auto" },
  { value: "frozenFood", name: "Frozen Foods" },
  { value: "ITStaffing", name: "IT Staffing" },
  { value: "argo", name: "AGRO" },
  { value: "govtEntity", name: "Buyer/Supplier Government Entity" },
  { value: "oilGas", name: "Oil/Gas" },
  { value: "diamond", name: "Diamond" },
  { value: "preciousStone", name: "Precious Stone" },
  { value: "gold", name: "Gold" },
  { value: "others", name: "Others" },
];

const Registration = () => {
  const refOtp1 = useRef(null);
  const refOtp2 = useRef(null);
  const refOtp3 = useRef(null);
  const refOtp4 = useRef(null);

  const [stepperProgress, updateStepperProgress] = useState(0);
  const [tab, setTab] = useState(0)
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [showLoader, setShowLoader] = useState(false);
  const [showReferralPopup, toggleReferralPopup] = useState(false);
  const [isEmailVerified, toggleIsEmailVerified] = useState(false);
  const [isMobVerified, toggleIsMobVerified] = useState(false);
  const [otpPopup, setOtpPopup] = useState({ show: false, type: "" });

  const astrix = <span className="required-field text-danger">*</span>;

  const handleNext = () => {
    setTab(tab + 1)
  }

  const handleBack = () => {
    setTab(tab - 1)
  }

  const handleFieldChange = (index, type) => {
    console.log('index: ', index);
    console.log('type: ', type);
    setData({ ...data, [type]: index })
  }

  function handleChange(e) {
    e.persist()
    if (e.target.name === "contactNo") {
      toggleIsMobVerified(false)
    }
    if (e.target.name === "email") {
      toggleIsEmailVerified(false)
    }
    if (e.target.name.includes('otp')) {
      let currentIndex = e.target.name.split("p")[1] / 1
      if (e.target.value) {
        if (currentIndex == 1) {
          refOtp2.current.focus()
        }
        if (currentIndex == 2) {
          refOtp3.current.focus()
        }
        if (currentIndex == 3) {
          refOtp4.current.focus()
        }
      }
      else {
        if (currentIndex == 4) {
          refOtp3.current.focus()
        }
        if (currentIndex == 3) {
          refOtp2.current.focus()
        }
        if (currentIndex == 2) {
          refOtp1.current.focus()
        }
      }
    }
    setData({ ...data, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  async function validateReferralCode() {
    if (!data["referalCode"]) {
      return setErrors({ ...errors, "referalCode": "Enter Referral Code" })
    }
    setShowLoader(true)
    call("POST", 'verifyrefercode', { "referCode": data.referalCode }).then(result => {
      setShowLoader(false)
      if (result.length) {
        toggleReferralPopup(false)
      }
      else {
        setData({ ...data, "referalCode": "" })
        setErrors({ ...errors, "referalCode": "Invalid Referal Code" })
      }
    }).catch(err => {
      setShowLoader(false)
      setData({ ...data, "referalCode": "" })
      setErrors({ ...errors, "referalCode": "Something went wrong" })
    })
  }

  async function sendOtp(type) {
    if (type === "email" && !data.email) {
      return null
    }
    if (type === "mob" && !data.contactNo) {
      return null
    }
    setShowLoader(true)
    call("POST", 'sendVerifyOtp', type === "email" ? { sendOnEmail: true, email: data.email } :
      { sendOnMob: true, contactNo: "+" + data.phoneCode + "" + data.contactNo }).then(result => {
        setShowLoader(false)
        if (result) {
        //   toastDisplay(result, "success")
          setOtpPopup({ show: true, type })
        }
      }).catch(err => {
        setShowLoader(false)
        // toastDisplay(err, 'error')
      })
  }

  async function verifyOtp(type) {
    setShowLoader(true)
    let req = {
      otp: data.otp1 + "" + data.otp2 + "" + data.otp3 + "" + data.otp4
    }
    call("POST", 'sendVerifyOtp', type === "email" ? { ...req, verifyEmail: true, email: data.email } :
      { ...req, verifyMob: true, contactNo: "+" + data.phoneCode + "" + data.contactNo }).then(result => {
        setShowLoader(false)
        if (result) {
        //   toastDisplay(result, "success")
          setOtpPopup({ show: false, type: "" })
          setData({ ...data, otp1: "", otp2: "", otp3: "", otp4: "" })
          setErrors({})
          if (type === "email") {
            toggleIsEmailVerified(true)
          }
          else {
            toggleIsMobVerified(true)
          }
        }
      }).catch(err => {
        setShowLoader(false)
        // toastDisplay(err, 'error')
      })
  }

  console.log('data => ', data);

  return (
    <>{showLoader && (<div className="loading-overlay"><span><img className="" src="assets/images/loader.gif" alt="description" /></span></div>)}
      {showReferralPopup ? (
        <div className="modal show" id="" style={{ display: "block" }}>
          <div className="modal-dialog modal-m border-inner" >
            <div className="modal-content px-4 mx-4 py-2">
              <div className="modal-header border-0">
                <button type="button" className="close" onClick={() => toggleReferralPopup(false)}>×</button>
              </div>
              <h6 className="modal-title text-dark text-center">Enter who referred you</h6>
              <img
                className="cursor my-4" src={RefImg} alt="logo" height="250rem" width="100%"
              />
              <div className="form-floating mb-4 w-100 py-2 position-relative ">
                <input
                  type="text"
                  className={`form-control enterOtpInput  ${errors["referalCode"] ? "border-danger" : ""}`}
                  name={"referalCode"}
                  value={data["referalCode"]}
                  onChange={handleChange}
                  placeholder={"Enter Referral Code"}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      validateReferralCode()
                    }
                  }}
                />
                {errors["referalCode"] ? (
                  <span className="text-danger fontValid">{errors["referalCode"]}</span>
                ) : (
                  ""
                )}
                <i
                  style={{
                    "left": "85%",
                    "top": "1.3rem"
                  }}
                  onClick={validateReferralCode}
                  className="position-absolute cursor
                fas fa-2x fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      ) : null
      }
      {otpPopup.show ? (
        <div className="modal show" id="" style={{ display: "block" }} >
          <div className="modal-dialog modal-m border-inner" >
            <div className="modal-content px-4 mx-4 py-2">
              <div className="modal-header border-0">
                <button type="button" className="close" onClick={() => setOtpPopup({ show: false, type: "" })}>×</button>
              </div>
              <h6 className="modal-title text-dark text-center">{`Verify ${otpPopup.type === "mob" ? "Mobile Number" : "Email Id"}`}</h6>
              <div className="py-4 justify-content-center d-flex flex-column align-items-center">
                <>
                  <label className="cursor w-90" >Enter OTP</label>
                  <div className="form-group mb-4 w-85 d-flex flex-row justify-content-between"
                    style={{ height: "3rem" }}
                  >
                    <input type="text" id="otp1" ref={refOtp1} maxLength={1} className={" form-control w-15 h-100" + (!errors.otp ? '' : ' border-danger')} name="otp1" value={data.otp1} onChange={handleChange} />
                    <input type="text" id="otp2" ref={refOtp2} maxLength={1} className={" form-control w-15 h-100" + (!errors.otp ? '' : ' border-danger')} name="otp2" value={data.otp2} onChange={handleChange} />
                    <input type="text" id="otp3" ref={refOtp3} maxLength={1} className={" form-control w-15 h-100" + (!errors.otp ? '' : ' border-danger')} name="otp3" value={data.otp3} onChange={handleChange} />
                    <input type="text" id="otp4" ref={refOtp4} maxLength={1} className={" form-control w-15 h-100" + (!errors.otp ? '' : ' border-danger')} name="otp4" value={data.otp4} onChange={handleChange} />
                  </div>
                  {errors.otp && <label className="w-90 text-danger">{errors.otp}</label>}
                  <label className="cursor w-90 light-font" >{`An OTP has been sent on your mentioned 
                  ${otpPopup.type === "mob" ? "Mobile Number" : "Email Id"}`}</label>
                  <div className="row w-100 p-4">
                    <label
                      onClick={() => sendOtp(otpPopup.type)}
                      className="cursor w-50 text-color1" >Resend OTP</label>
                    <label
                      onClick={() => setOtpPopup({ show: false, type: "" })}
                      className="cursor w-50 text-color1" >{`Change ${otpPopup.type === "mob" ? "Mobile Number" : "Email Id"}`}</label>
                  </div>
                  <button type="button"
                    onClick={() => verifyOtp(otpPopup.type)}
                    class={`new-btn py-2 w-50 mb-4 text-white`}>
                    {"Verify OTP"}
                  </button>
                </>
              </div>
            </div>
          </div>
        </div>

      ) : null}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <div className="row bg-img">
        <div className="w-100 align-items-center signup-div d-none">
          <div className="col-6">
            <h4><b>Sign up</b></h4>
          </div>
          <div className="col-6 text-center">
            <img onClick={() => { window.location = "/" }}
              style={{}}
              className="cursor" src={Logo} alt="logo" height="60px"
            />
          </div>
        </div>
        <div className="col-md-12 justify-content-center d-flex mb-4 pb-4">
          <div className="d-flex flex-column stepper-div ">
            <h5 style={{}} className="font-size-45 font-wt-600 my-4 py-4 text-center signup-h">Sign up</h5>
            <div>
                <ul className="nav nav-tabs-custom align-items-end" id="myTab" role="tablist">
                    {onboardingTabs.map((item, index) => {
                    return (
                        <li>
                          <a className={"nav-link formTab pl-4 pr-4 cursor-pointer font-size-14" + (tab === index ? " formActiveTab show" : "")}>
                            {item.name}
                          </a>
                        </li>
                    )
                    })}
                </ul>
                <ul className="next-button">
                  <li><button disabled={tab === 0 ? true : false} onClick={handleBack} >{"<< Previous"}</button></li>
                  <li><button disabled={tab === 4 ? true : false} onClick={handleNext} >{"Next >>"}</button></li>
                </ul>
                <div style={{ width: '55rem', height: '36rem', borderRadius: '2rem' }} className="bg-white align-self-center py-3 shadow ml-7 my-xl-5">
                  <div className="d-flex flex-column col-md-12 align-items-center" style={{}}>
                    {tab === 0 && <h5 className="pb-4 font-size-20 font-wt-500"><u>Select your Field</u></h5>}
                    {tab != 0 && <h5 className="pb-4 font-size-20 font-wt-500"><u>Enter your details</u></h5>}
                    {tab == 0 && (
                        <>
                          {FieldTypes.map((item, index) => (
                            <div
                              onClick={() => handleFieldChange(index, "workField")} className={`new-btn py-2 w-35 mb-4 ${data.workField === index ? "text-white" : 'text-dark bg-white'}`}>
                              {item.name}
                            </div>
                          ))}</>
                    )}

                    {tab === 1 && (
                      <div className="form-floating mb-2 w-50 position-relative">
                      <NewInput type="text" name={"gstNumber"} value={data["gstNumber"]} onChange={handleChange}
                        label={"Enter GST Number"} error={errors["gstNumber"]} />
                    </div>
                    )}

                    {tab === 2 && (
                      <>
                      <div className="form-floating mb-2 w-50 position-relative">
                      <NewInput type="text" name={"companyName"} value={data["companyName"]} onChange={handleChange}
                        label={"Company Name *"} error={errors["companyName"]} />
                    </div>
                    <div className="form-floating mb-2 w-50 position-relative">
                <NewSelect
                  label={"Select Industry Type"}
                  selectData={industryData} name="industryType" value={data.industryType} onChange={handleChange}
                  optionLabel={"name"} optionValue={"value"} error={errors["industryType"]} />
              </div>
              {/* <div className="form-floating mb-2 w-50 position-relative">
                <NewSelect
                  label={"Select Country *"}
                  selectData={countryData} name="country" value={data.country} onChange={handleChange}
                  optionLabel={"name"} optionValue={"sortname"} error={errors["country"]} />
              </div> */}
              <div className="form-floating mb-2 w-50 position-relative">
                <NewInput type="text" name={"companyAddress"} value={data["companyAddress"]} onChange={handleChange}
                  label={"Company Address *"} error={errors["companyAddress"]} />
              </div>
              <div className="form-floating mb-2 w-50 position-relative">
                <NewInput type="text" name={"companyCity"} value={data["companyCity"]} onChange={handleChange}
                  label={"Company City *"} error={errors["companyCity"]} />
              </div>
              <div className="form-floating mb-2 w-50 position-relative">
                <NewInput type="text" name={"companyPostalCode"} value={data["companyPostalCode"]} onChange={handleChange}
                  label={"Company Postal Code *"} error={errors["companyPostalCode"]} />
              </div>
                      </>
                    
                    )}

                    {tab === 3 && (
                      <>
                      <div className="form-floating mb-2 w-50 position-relative">
                        <InputWithSelect selectData={[{ name: "Mr" }, { name: 'Miss' }]}
                          selectName="nameTitle" selectValue={data.nameTitle} optionLabel={'name'} optionValue={'name'}
                          onChange={handleChange} type="text" name={"contactPerson"} value={data["contactPerson"]}
                          label={"Full Name *"} error={errors["contactPerson"]}
                        />
                      </div>
                      <div className="form-floating mb-2 w-50 position-relative">
                        <NewInput type={"email"} name={"email"}
                          value={data["email"]}
                          onChange={handleChange} label={"Email Id *"} error={errors["email"]} />
                        {data.email ? (
                          <i
                            style={{
                              "left": "90%",
                              "top": "0.8rem"
                            }}
                            onClick={() => sendOtp("email")}
                            className={`position-absolute cursor fa font-size-18 ${isEmailVerified ? "fa-check" : ""} ${isEmailVerified ? "text-success" : ""}`}></i>
                        ) : null}
                      </div>
                      {/* <div className="form-floating mb-2 w-50 position-relative">
                        <InputWithSelect
                          selectData={countryData} selectName={"phonecode"} selectValue={data.phoneCode} optionLabel={"phonecode"}
                          optionValue={'phonecode'}
                          type="number" name={"contactNo"} value={data["contactNo"]}
                          onChange={handleChange}
                          label={"Mobile Number *"} error={errors["contactNo"]} />
                        {data.contactNo ? (
                          <i
                            style={{
                              "left": "90%",
                              "top": "0.8rem"
                            }}
                            onClick={() => sendOtp("mob")}
                            className={`position-absolute cursor fa font-size-18 ${isMobVerified ? "fa-check" : ""} ${isMobVerified ? "text-success" : ""}`}></i>
                        ) : null}
                      </div> */}
                      </>
                    )}

                    {tab === 4 && (
                      <>
                      <div className="form-floating mb-2 w-50 position-relative">
                        <NewInput type="password" name={"password"}
                          value={data["password"]}
                          onChange={handleChange}
                          label={"Enter password *"} error={errors["password"]} />
                      </div>
                      <div className="form-floating mb-2 w-50 position-relative">
                        <NewInput type="password" name={"repassword"}
                          value={data["repassword"]}
                          onChange={handleChange}
                          label={"Re-enter password *"} error={errors["repassword"]} />
                      </div>
                      <div class="form-check mb-2 w-50">
                        {/* <label className={`font-wt-400 mb-4 cursor ${data.referalCode ? 'text-color1' : ""}`}
                          onClick={() => toggleReferralPopup(true)}
                        ><b>{data.referalCode ? "Refferal Code Applied" : "I have a referral code"}</b>
                          {!data.referalCode ? (
                            <i class="fas fa fa-arrow-right mx-1"></i>) : " !"}
                        </label> */}
                        <label class="form-check-label text-center" for="tcAccept">
                          <input class="form-check-input new-check-box" type="checkbox" name="tcAccept" id="tcAccept"
                            onChange={handleChange}
                            checked={data.tcAccept}
                          />
                          I Agree to the
                          <span
                            onClick={() => { window.open("Privacy_&_Cookie_Policy.pdf", "_blank") }}
                            className="text-primary cursor"> Terms & Conditions</span> and <span
                              onClick={() => { window.open("Privacy_&_Cookie_Policy.pdf", "_blank") }}
                              className="text-primary cursor">Privacy policy</span> of Trade reboot fin</label>
                      </div>
                      <button type="button"
                        disabled={!data.tcAccept}
                        onClick={handleNext}
                        class={`new-btn py-2 w-25 mb-4 text-white my-4`}>
                        {"Register"}
                      </button>
                    </>
                    )}

                    <label className="font-wt-400 font-size-14" >Already registered? <span
                      onClick={() => { window.location = 'login' }}
                      className="text-primary cursor">Login</span></label>

                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default Registration;