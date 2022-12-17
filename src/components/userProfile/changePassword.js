import React, { useState } from 'react';
import SideBar from '../partial/sidebar';
import Header from '../partial/header';
import { NewInput } from '../../utils/newInput';

const ChangePassword = () => {

    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        e.persist()
        setData({ ...data, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: "" })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <SideBar state="changepassword" />
                    <main role="main" className={"ml-sm-auto col-lg-10 expanded-right"} id="app-main-div">
                        <Header title={"Change Password"} />
                        <div style={{ width: '91rem', height: '25rem', borderRadius: '2rem' }} className="bg-white align-self-center py-4 shadow ml-9 my-xl-4">
                            <div className="d-flex flex-column col-md-12 align-items-center my-xl-3" style={{}}>
                                <div className="form-floating mb-2 w-50 position-relative">
                                    <div className="form-floating mb-5 w-70 position-relative">
                                        <NewInput type="text" name={"currentPassword"} value={data["currentPassword"]} onChange={handleChange}
                                            label={"Enter Current Password *"} error={errors["currentPassword"]} />
                                    </div>
                                    <div className="form-floating mb-5 w-70 position-relative">
                                        <NewInput type="text" name={"newPassword"} value={data["newPassword"]} onChange={handleChange}
                                            label={"Enter New Password *"} error={errors["newPassword"]} />
                                    </div>
                                    <div className="form-floating mb-5 w-70 position-relative">
                                        <NewInput type="text" name={"confirmPassword"} value={data["confirmPassword"]} onChange={handleChange}
                                            label={"Confirm New Password *"} error={errors["confirmPassword"]} />
                                    </div>
                                    <button type="button"
                                        className={`border-0 mb-2 text-white enableQuotebtn`}>
                                        <b>{"Submit"}</b>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default ChangePassword