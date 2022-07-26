'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
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
  countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
const getJSON = function (url, errorMsg = 'Something went Wrong') {
  return fetch(url).then(response => {
    // console.log(response);
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
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
/*
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
*/
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
/*
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
*/
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
/*
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

*/
///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'


4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
/*
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
  countriesContainer.style.opacity = 1;
};

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(function (response) {
      //   console.log(response);
      if (!response.ok)
        throw new Error(`Problem with Geocoding, ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.log(`${err.message} !!!!`);
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/

// console.log('Test Start');
// setTimeout(() => console.log('O sec timer'), 0);

// Promise.resolve('Resolved Promise 1').then(res => console.log(res));

// Promise.resolve('Resolved Promise 2').then(res => {
//   for (let i = 0; i < 1000000; i++) {}
// });
// console.log('Test End');

// Test Start
// script.js:345 Test End
// script.js:344 Resolved Promise 1
// script.js:342 O sec timer

//Building A Promise : Simulate with lottery example: Fulfilled promise means to win the lottery while a rejected promise means to lose the lottery.
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('LOTTERY DRAW IS HAPPENING');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('YOU WIN'); //marks this promise as fulfilled promise.
//     } else {
//       reject(new Error('You Lost your money'));
//     }
//   }, 2000);
// });

//consuming the created promise
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisification

//promisifying setTimeout()
// const wait = function (seconds) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

//consume promise
// wait(2)
//   .then(function () {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 sec'));

//creating fulfilled promises immediately
// Promise.resolve('This is resolved').then(() => console.log('x'));

//creating rejected promises immediately
// Promise.reject('This is rejected').catch(x => console.error(x));//script.js:392 This is rejected
// Promise.reject(new Error('REJECTED')).catch(x => console.error(x)); //REJECTED

//Promisifying the Geolocation API

//convert callback based API to a promise based API
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );

//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPosition().then(pos => console.log(pos));

// const renderCountry = function (data, className = '') {
//   const html = `
//       <article class="country ${className}">
//       <img class="country__img" src="${data.flags.png}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${data.population}</p>
//         <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>

//       </div>
//     </article>`;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };
// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })

//     .then(function (response) {
//       //   console.log(response);
//       if (!response.ok)
//         throw new Error(`Problem with Geocoding, ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.log(`${err.message} !!!!`);
//     });
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// btn.addEventListener('click', whereAmI);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input.
 This function returns a promise which creates a new image (use document.createElement('img'))
  and sets the .src attribute to the provided image path. When the image is done loading,
   append it to the DOM element with the 'images' class, and resolve the promise. 
   The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), 
   reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
/*
const wait = function (seconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image Not Found'));
    });
  });
};
let currentImg;
createImage('img/img-1.jpg')
  .then(function (img) {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(function (img) {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .catch(err => console.error(err));
*/

//consuming promises with ASYNC/ AWAIT

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );

//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// const whereAmI = async function () {
//   try {
//     //geo location
//     const pos = await getPosition();
//     // console.log(pos);
//     const { latitude: lat, longitude: lng } = pos.coords;

//     //reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await resGeo.json();
//     // console.log(dataGeo);
//     //we can have one or more await statements inside the async function
//     //await will stop the execution as from the point it is declared it the promise (fetch call) is fulfilled
//     //the result of the await statement below will be resolved value of the promise, thus it can be stored in a variable
//     // const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//     // console.log(res);

//     //country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error('Problem getting country data');
//     // console.log(res);
//     const data = await res.json();
//     // console.log(data);
//     renderCountry(data[0]);

//     return `2:You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     // console.error(err);
//     renderError(`2:Error: ${err.message}`);

//     //reject promise returned from async function
//     throw err;
//   }
// };

// whereAmI();

// console.log('1: Will Get Location');
// const city = whereAmI();
// console.log(city);
// city
//   .then(res => console.log(res))
//   .finally(() => console.log(`3: Finished getting the location`));

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(city);
//   } catch (err) {
//     console.error(`2: ${err.message}`);
//   }
//   console.log(`3: Finished getting the location`);
// })();

//running promises in parallel
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//     // console.log(data1.capital, data2.capital, data3.capital);
//     //to run the above ajax calls in parrale use, Promise.all()

//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     // console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.log(err);
//   }
// };

// get3Countries('usa', 'canada', 'kenya');

//Promise.race()
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//   ]);
//   // console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request Took tooo long meen'));
//     }, sec);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/tanzania`),
//   timeout(1 * 1000),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

//Promise.allSettled()
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another Success'),
// ]).then(res => console.log(res));

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

//Promise.any()
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates 
Coding Challenge #2, this time using async/await
 (only the part where the promise is consumed). 
Compare the two versions, think about the big
 differences, and see which one you like more.
Don't forget to test the error handler, and to set
 the network speed to 'Fast 3G' in the dev tools
  Network tab.

PART 2
1. Create an async function 'loadAll' that receives
 an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the
 images with the 'createImage' function
  (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console!
 Is it like you expected?
4. Use a promise combinator function to actually
 get the images from the array 😉
5. Add the 'paralell' class to all the images
 (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// PART 1
// const loadNPause = async function () {
//   try {
//     // Load image 1
//     let img = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     // Load image 2
//     img = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     // Load image 3
//     img = await createImage('img/img-3.jpg');
//     console.log('Image 3 loaded');
//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadNPause();

//part 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async function (img) {
      return await createImage(img);
    });
    console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);

    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (error) {
    console.error(error);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
