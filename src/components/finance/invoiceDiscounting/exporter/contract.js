import React, { useState } from 'react';
import SideBar from '../../../partial/sidebar';
import Header from '../../../partial/header';
import Filter from '../../../../utils/filter';
import { NewTable } from '../../../../utils/newTable';

const Contract = () => {

  const [filter, setFilter] = useState({ resultPerPage: 10 });
  const [refresh, setRefresh] = useState(0);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <SideBar state="contract" />
          <main role="main" className={"ml-sm-auto col-lg-10 expanded-right"} id="app-main-div">
            <Header title={"Apply for Limit"} />
            <div className='mt-1'>
              <Filter filter={filter} setFilter={setFilter} refresh={refresh} setRefresh={setRefresh} />
              <NewTable disableAction={true}
                columns={[{
                  name: "Date", filter: true
                }, { name: "Buyer Name", filter: true },
                {
                  name: "Factoring Fee", filter: true
                },
                {
                  name: "Interest rate", filter: true
                },
                {
                  name: "Setup fees", filter: true
                },
                {
                  name: "Terms of payments", filter: true
                },
                {
                  name: "Financers selected", filter: true
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

export default Contract