export const getRequest = () => {
  return 'sandeep';
}
export const putRequest = () => {
  return 'sandeep';
}
export const postRequest = () => {
  return 'sandeep';
}


 export const putData = (url, data) => {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *omit
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    method: 'POST', // *GET, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *same-origin
    redirect: 'follow', // *manual, error
    referrer: 'no-referrer', // *client
  })
  .then(response => response.json()) // parses response to JSON
}



//   
//   fetch('https://8gcs1j9jwa.execute-api.us-west-2.amazonaws.com/beta/temperature?tenantId=fxpal&roomId=1234', {
//       method: 'PUT',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         temperature: 756375,
//         temperatureScale: 'F',
//       }),
//     })
//     .then(response => {
//       if (response.status >= 200 && response.status < 300) {
//         console.warn(response);
//       } else {
//         const error = new Error(response.statusText);
//         error.response = response;
//         console.warn(error);
//         throw error;
//       }
//     })
//     .catch(error => { console.log('request failed', error); });
// }
// 