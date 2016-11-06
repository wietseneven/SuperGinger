class Api {
  constructor() {
    this.endpoints = {
      "level": "/levels/",
      "setScore": "/setScore/"
    };
  }

  get(endpoint, param, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const result = JSON.parse(this.responseText);
        if (callback) callback(result);
      }
    };
    xhttp.open("POST", this.endpoints[endpoint] + param, true);
    xhttp.send();
  }
}

export default Api;