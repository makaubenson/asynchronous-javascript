'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const getCountryData = function (country) {
//   //Old School way of making Ajax Call
//   const request = new XMLHttpRequest();

//   //Open Request
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`); //needs 2 arguments 1:TYPE OF REQUEST(GET, POST,DELETE, PUT) 2: url we are making request to(endpoint)

//   //Send Request
//   request.send(); //this will send the request to the endpoint
//   //The request fetchedata to be received)

//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);

//     //convert data to js object from JSON
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//   <article class="country">
//   <img class="country__img" src="${data.flags.png}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${data.population}</p>
//     <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>

//   </div>
// </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('Kenya');
// getCountryData('usa');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${data.population}</p>
      <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>

    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = 1;
};

// // CALLBACK HELL
// const getCountryAndNeighbor = function (country) {
//   //Old School way of making Ajax Call: country 1
//   const request = new XMLHttpRequest();
//   //Open Request
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`); //needs 2 arguments 1:TYPE OF REQUEST(GET, POST,DELETE, PUT) 2: url we are making request to(endpoint)
//   //Send Request
//   request.send(); //this will send the request to the endpoint
//   //The request fetchedata to be received)

//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);

//     //convert data to js object from JSON
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     //render country 1
//     renderCountry(data);

//     //get Neighbor Country : country 2
//     const neighbor = data.borders[0];

//     if (!neighbor) return; // Guard Clause

//     //second Ajax Call : 2
//     const request2 = new XMLHttpRequest();
//     //Open Request
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
//     //Send Request
//     request2.send();

//     request2.addEventListener('load', function () {
//       //   console.log(this.responseText);

//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// // getCountryAndNeighbor('Kenya');
// getCountryAndNeighbor('usa');
// How to Avoid Callback Hell: Using Promises
///////////Old Way of Fetching APIs//////////
// const request = new XMLHttpRequest();
//   //Open Request
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   //Send Request
//   request.send();
///////////New way of Fetching APIs//////////
// const request = fetch('https://restcountries.com/v3.1/name/kenya');
// console.log(request);
//consuming promises
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       //reading data from the body property (call JSON property)
//       return response.json(); //returns new promise
//     }) // handling the promise created by response.json()
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
//arrow functions:simplified form
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };
// getCountryData('Kenya');

//Chaining Promises
// const getCountryData = function (country) {
//   //country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       //country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbour'));
// };
// getCountryData('usa');

//Handling Errors in Rejected Promises
//method 1: adding second callback function on the then() method
// const getCountryData = function (country) {
//   //country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(
//       response => response.json(),
//       err => alert(err) //error handling/catching
//     )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       //country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(
//       response => response.json(),
//       err => alert(err)
//     )
//     .then(data => renderCountry(data[0], 'neighbour'));
// };

// btn.addEventListener('click', function () {
//   getCountryData('usa');
// });

//method 2 : handling errors globally
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
const getJSON = function (url, errorMsg = 'Something went Wrong') {
  return fetch(url).then(response => {
    console.log(response);
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
// const getCountryData = function (country) {
//   //country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not Found!! (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       //country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       //will catch any error occuring in the promise chain
//       console.error(`${err} !!!! `);
//       renderError(`Something Went Wrong!!!!!! ${err.message} Try Again!?!`);
//     })
//     .finally(() => {
//       //this callback will be called whether promise is fulfilled or rejected
//       //used to executed something that needs to be executed no matter the result of the promise execution
//       //works promises.
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  //country 1
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country Not Found!!!'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No Neighbor Found!');

      //country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country Not Found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      //will catch any error occuring in the promise chain
      console.error(`${err} !!!! `);
      renderError(`Something Went Wrong!!!!!! ${err.message} Try Again!?!`);
    })
    .finally(() => {
      //this callback will be called whether promise is fulfilled or rejected
      //used to executed something that needs to be executed no matter the result of the promise execution
      //works promises.
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData('usa');
});

getCountryData('australia');
