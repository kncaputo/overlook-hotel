let url = `https://fe-apps.herokuapp.com/api/v1/overlook/1904/`

let apiCalls = {
  fetchData(key) {
    return fetch(`${url}${key}/${key}`)
      .then(response => response.json())
      .then(data => data[key])
      .catch(err => err)
  },

  postData(newPost, onSuccess) {
    return fetch(`${url}bookings/bookings`, {
      method: 'POST',
      headers: {
  	    'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      onSuccess();
    })
    .catch(err => console.log(err))
  }
}

export default apiCalls;
