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

![ajaximg]

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
