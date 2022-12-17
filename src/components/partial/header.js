import React, { useEffect, useState } from 'react';

const Header = ({title}) => {

  const [profile, setProfile] = useState(false);

  return (<>
    <div className='breadcrumb-grid mx-9'>
      <div className={`d-flex breadcrumb-bg`}>
        <div className="ml-auto pr-4">
          <ul className="nav-top d-flex flex-md-row">
            {title == 'Buyer Management' && <li>
              <button className="btn btn-red btn-sm">
                <span>Add Buyer</span>
              </button>
            </li>}
            <li className='active'>
              <i class="fa fa-bell" aria-hidden="true"></i>
            </li>
            <li className='font-size-16'>
              <span className="profile-icon">
                <img src='assets/images/user_icon.jpg' />
                <span onClick={() => setProfile(profile ? false : true)}>
                <i className="fa fa-chevron-down text-secondary font10 mx-2"></i>
                </span>
              </span>
              {profile && <div id="ProfileCard" >
                <ul>
                  <a href={'/profile'} ><li><i class="fa fa-user-edit active2"></i>Edit Profile</li></a>
                  <a href={'/changepassword'} ><li><i class="fas fa-key fa-lg text-primary"></i>Change Password</li></a>
                  <li
                  // onClick={() => logout()}
                  ><i class="fas fa-sign-out-alt fa-lg text-primary"></i> Logout</li>
                </ul>
              </div>}
            </li>

          </ul>
        </div>
      </div >
      <ul className="breadcrumb-show">
        <li>
          <h2>{title}</h2>
          {/* <p>{total}</p> */}
        </li>
      </ul>
    </div>
  </>
  )
}

export default Header;