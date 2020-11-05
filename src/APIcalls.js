let apiCalls = {
  fetchData(key) {
    return fetch(`https://fe-apps.herokuapp.com/api/v1/overlook/1904/${key}/${key}`)
      .then(response => response.json())
      .then(data => console.log(data[key]))
      .catch(err => console.log(err))
  },

  postData(newPost, onSuccess) {
    return fetch(this.url, {
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
