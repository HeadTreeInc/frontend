import axios from 'axios';
// import config from './config'

/**
 * Method for calling APIs.
 * @param {String} method : Method using which the api is called(GET, POST, etc.)
 * @param {String} url : URL of the API
 * @param {Object} obj : Object/data to be sent as input.
 * @returns {Promise} Promise
 */
const call = (method, url, obj = {}) => {
  return new Promise((resolve, reject) => {
    //let token;
    let args = {
      method: method,
      url: 'http://localhost:3212/' + url,
      data: obj
    }
    try {
      axios(args).then(response => {
        // console.log("response console in called api:", response)
        if (response.data.success)
          resolve(response.data.message ? response.data.message : response.data.data ? response.data.data : response.data.disc);
        else
          response.data.message ? reject(response.data.message) : response.data.error ? reject(response.data.error) : reject(response.data.disc)
      }).catch(e => {
        // console.log("Error in called api 1:==>", url, e)
        if (e.response && e.response.status === 401) {
          window.location = '/'
          localStorage.clear();
        } else {
          // console.log("Error in called api 2:==>", url, e)
          reject(e);
        }
        reject(e);
      });

    } catch (error) {
      // console.log('Error in called api 3:==>', url, error);
      reject(error)
    }


  })
}

export default call;