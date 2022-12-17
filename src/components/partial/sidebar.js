import React, { useState } from 'react';

const Sidebar = ({state}) => {

  const [invoice, setInvoice] = useState(false);

  return (
    <nav className={"col-md-2 d-md-block sidebar px-3 py-4 bg-white"} id="app-nav-div" style={{ height: "100%" }}>
      <div className="top-sticky2">
        <div className="logo px-0 justify-content-center">
          <a href="/dashboard">
            <img height="60" className="default_logo" src="assets/images/user.png" />
            <h2 className='my-2'>Antonio Olson</h2>
          </a>
        </div>
      </div>
      <div className="menu-overflow">
        <div className="sidebar-sticky " id="scrollbarStyle-custom">
          <div className="col-md-12">
            <div className="row">
              <ul className="nav flex-column">
                <a className="nav-link mb-2" href='/dashboard'>
                    <li className={"nav-item " + ((state === 'dashboard') ? 'active2' : 'text-dark')} >
                        <span className='mx-2 font-size-14'>
                        <i class="fa fa-compass" aria-hidden="true"></i>
                        </span>
                        <span className='mx-2 font-size-14'>Dashboard</span>
                    </li>
                </a>
                <a className="nav-link mb-2" href='/buyer'>
                    <li className={"nav-item " + ((state === 'buyer') ? 'active2' : 'text-dark')} >
                        <span className='mx-2 font-size-14'>
                        <i class="fa fa-calendar-o" aria-hidden="true"></i>
                        </span>
                        <span className='mx-2 font-size-14'>Buyer Management</span>
                    </li>
                </a>
                <a className="nav-link accordion invoiceacc mb-2" id={((state === 'limit' || state === 'quotes' || state === 'contract' || state === 'applyFin' || state === 'approvedFin') ? 'accordionExample' : '')}>
                  <li className='accordion-item border-0'>
                    <li className={"nav-item " + ((state === 'limit' || state === 'quotes' || state === 'contract' || state === 'applyFin' || state === 'approvedFin') ? 'active2' : ' text-dark')} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" >
                      <span className='mx-2 font-size-14' >
                      <i class="fa fa-coins" aria-hidden="true"></i>
                      </span>
                      <span className='mx-2 font-size-14'>Invoice Discounting
                      {/* <span className='mx- font-size-14' onClick={() => setInvoice(invoice ? false : true)}>
                        <i className="fa fa-chevron-down text-secondary font10 mx-10"></i>
                      </span> */}
                      </span>
                    </li>
                  </li>
                  <ul className="nav flex-column">
                    <a className="nav-link mb-2" href='/limit'>
                      <li className={"nav-item " + ((state === 'limit') ? 'active1' : 'text-dark')} >
                          <span className='mx-5 font-size-14'>
                          <i class="fa fa fa-bar-chart" aria-hidden="true"></i>
                          <span className='mx-2 font-size-14'>Apply for Limit</span>
                          </span>
                      </li>
                    </a>
                    <a className="nav-link mb-2" href='/quotes'>
                      <li className={"nav-item " + ((state === 'quotes') ? 'active1' : 'text-dark')} >
                          <span className='mx-5 font-size-14'>
                          <i class="fa fa-quote-left" aria-hidden="true"></i>
                          <span className='mx-2 font-size-14'>Quotes</span>
                          </span>
                      </li>
                    </a>
                    <a className="nav-link mb-2" href='/contract'>
                      <li className={"nav-item " + ((state === 'contract') ? 'active2' : 'text-dark')} >
                          <span className='mx-5 font-size-14'>
                          <i class="fa fa-file-text" aria-hidden="true"></i>
                          <span className='mx-2 font-size-14'>Contract</span>
                          </span>
                      </li>
                    </a>
                    <a className="nav-link mb-2" href='/applyFin'>
                      <li className={"nav-item " + ((state === 'applyFin') ? 'active2' : 'text-dark')} >
                          <span className='mx-5 font-size-14'>
                          <i class="fa fa-money" aria-hidden="true"></i>
                          <span className='mx-2 font-size-14'>Apply for Finance</span>
                          </span>
                      </li>
                    </a>
                    <a className="nav-link mb-2" href='/approvedFin'>
                      <li className={"nav-item " + ((state === 'approvedFin') ? 'active2' : 'text-dark')} >
                          <span className='mx-5 font-size-14'>
                          <i class="fa fa-check-square" aria-hidden="true"></i>
                          <span className='mx-2 font-size-14'>Approved Finance</span>
                          </span>
                      </li>
                    </a>
                  </ul>
                </a >
                <a className="nav-link mb-2" href='/profile'>
                    <li className={"nav-item " + ((state === 'profile') ? 'active2' : 'text-dark')} >
                        <span className='mx-2 font-size-14'>
                        <i class="fa fa-user" aria-hidden="true"></i>
                        </span>
                        <span className='mx-2 font-size-14'>User Profile</span>
                    </li>
                </a>
              </ul >
            </div >
          </div >
        </div >
      </div >
    </nav >
  );
};

export default Sidebar