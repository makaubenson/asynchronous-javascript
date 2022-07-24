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
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${data.population}</p>
      <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
      
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// CALLBACK HELL
const getCountryAndNeighbor = function (country) {
  //Old School way of making Ajax Call: country 1
  const request = new XMLHttpRequest();
  //Open Request
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`); //needs 2 arguments 1:TYPE OF REQUEST(GET, POST,DELETE, PUT) 2: url we are making request to(endpoint)
  //Send Request
  request.send(); //this will send the request to the endpoint
  //The request fetchedata to be received)

  request.addEventListener('load', function () {
    //   console.log(this.responseText);

    //convert data to js object from JSON
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //render country 1
    renderCountry(data);

    //get Neighbor Country : country 2
    const neighbor = data.borders[0];

    if (!neighbor) return; // Guard Clause

    //second Ajax Call : 2
    const request2 = new XMLHttpRequest();
    //Open Request
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    //Send Request
    request2.send();

    request2.addEventListener('load', function () {
      //   console.log(this.responseText);

      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbor('Kenya');
getCountryAndNeighbor('usa');
