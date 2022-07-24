'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//Old School way of making Ajax Call
const request = new XMLHttpRequest();

//Open Request
request.open('GET', 'https://restcountries.com/v3.1/name/kenya'); //needs 2 arguments 1:TYPE OF REQUEST(GET, POST,DELETE, PUT) 2: url we are making request to(endpoint)

//Send Request
request.send(); //this will send the request to the endpoint
//The request fetchedata to be received)

request.addEventListener('load', function () {
  //   console.log(this.responseText);

  //convert data to js object from JSON
  const [data] = JSON.parse(this.responseText);
  console.log(data);
});
