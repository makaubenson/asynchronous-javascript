# ASYNCHRONOUS JAVASCRIPT

## Synchronous Js

- To understand asynchronous, lests understand what synchronous really is.
- In synchronous js, code is executed line by line in the order they appear in the script.
- Each line waits for the previous line to executed.
- Asynchronous is `blocking` - it does block execution of the rest of the code.

## ASynchronous Js

- `Asynchronous code` is executed after a task that runs is the background finishes.
- Asynchronous is non-blocking - it does not block execution of the rest of the code.
- Asynchronous means not occuring at the same time.

## What Are Ajax Calls?

- AJAX stands for Asynchronous Javascript and XML: It allows us to communicate with remote web servers in an `asynchronous way.`
- With AJAX calls we can request data from web servers dynamically without reloading the page.

### How AJAX works

![Ajax Calls](https://user-images.githubusercontent.com/59168713/180642274-56762acf-a71d-4c22-9284-f3778c9e7fc9.png)

## API (APPLICATION PROGRAMMING INTERFACE)

- We can define APIs as piece of software that can be used by another software in order to allow applications to talk/communicate to each other.
- There are many types of APIS.
- For this case, lets talk about `Online` APIS. or just APIs.
- `An Online API ` is an application running on a web server that receives requests for data, and sends data back as response.
- There plenty of APIs that exist for almost everything.

### API Data Formats

- AJAX (X Stands for XML)
- People dont use `XML` anymore, `JSON` has become the most popular API format today.

- Without `CORS` being set to `yes` or `unknown` we cant access a public api from our code.
  `CORS` stands for Cross Origin Resource Sharing.

#### Old School way of making Ajax Call

```
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
```

## How the Web Works: Requests and Responses

- When we make a request to the web server, we get response with the data requested(whether an entire web page or data from an api)- This process is called `Request-Response Model` or `Client-Server Architecture`.

![how-web-works](https://user-images.githubusercontent.com/59168713/180642293-d126dc99-544c-4c67-b63f-92658cd6db15.png)

### CALLBACK HELL

- Having alot of nested callbacks to execute asynchronous code.
- Look at the example below.

```
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
```

- It makes code hard to maintain and reason about.
- Has posibility of many bugs.

## How to Avoid Callback Hell

### Promises

- A `promise` is an `object` that is used as a placeholder for the future result of an asynchronous operation.
- We can also say its a container for an asynchronous delivered value.
- Or a container for a future value.(future value example: response coming from ajax call)

#### Why Use Promises

- We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results.
- We can chain promises for a sequence of asynchronous operations thus `escaping callback hell`.

#### The Promise Lifecycle

- `Pending` - Before the future value is available. During this state, the asynchronous task is still running in the background.
- `Settled` - when the task finally finishes. There are 2 types of settled promises: `fulfilled` and `rejected`. `Fulfilled` is when the task results to a value, or operation is a success and data available for use, while `rejected` states that there has been an error during the `asynchronous task`. Promise is only settled once, the state then remains that way forever, it is impossible to change that state. These states are uselful when we use a promise to get a result, which is called `consuming a promise.`. We consume a promise when we already have a promise. For promise to exist it must be created.`Fetch()` function builds the promise and gives it back to us to consume.

### consuming promises

```
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      //reading data from the body property (call JSON property)

      return response.json(); //returns new promise
    }) // handling the promise created by response.json()
    .then(function (data) {
      console.log(data);
    });
};
getCountryData('Kenya');
```

getCountryData('Kenya');

- `fetch(`https://restcountries.com/v3.1/name/${country}`)` Returns a promise.
- `then(function ( response ) { console.log(response); });` is then used to handle the `fulfilled promise`.
- `response.json(); ` - returns new promise and thus we need to handle the promise too.

###### Simplified:Using arrow functions

```
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
getCountryData('Kenya');
```

- `then()` returns a promise no matter if we return anything or not. If we return a value it becomes the fulfillment value of the returned promise.

### error handling in promises

#### Method 1:adding second callback function on the then() method

```
const getCountryData = function (country) {
  //country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      response => response.json(),
      err => alert(err) //error handling/catching
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      //country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(
      response => response.json(),
      err => alert(err)
    )
    .then(data => renderCountry(data[0], 'neighbour'));
};

btn.addEventListener('click', function () {
  getCountryData('usa');
});
```
