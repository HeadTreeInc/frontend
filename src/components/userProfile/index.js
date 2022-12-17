import React, { useState } from 'react';
import SideBar from '../partial/sidebar';
import Header from '../partial/header';
import Filter from '../../utils/filter';
import { NewTable } from '../../utils/newTable';

const UserProfile = () => {

    const [filter, setFilter] = useState({ resultPerPage: 10 });
    const [refresh, setRefresh] = useState(0);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <SideBar state="profile" />
          <main role="main" className={"ml-sm-auto col-lg-10 expanded-right"} id="app-main-div">
          <Header title={"User Profile"}/>
            <div className='mt-1'>
                <Filter filter={filter} setFilter={setFilter} refresh={refresh} setRefresh={setRefresh} />
                <NewTable disableAction={true}
                    columns={[{
                    name: "Date", filter: true
                    }, { name: "Buyer Name", filter: true },
                    {
                    name: "Confirmation Fee", filter: true
                    },
                    {
                    name: "Discounting Fee", filter: true
                    }]}
                    data={''}
                />
              </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default UserProfile