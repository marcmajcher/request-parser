#HTTP Request Parser exercise

Sometimes it feels like the req object that express routes use to handle HTTP requests is a little bit magic. It's not! An HTTP request is just a chunk of text composed of headers and, in the case of POST requests, a body. In an attempt to demystify this process, we're going to write our own simple HTTP request parser, to see how it works.

## GET request with query values

We're going to create a parse() method in our request module (in request.js) that takes an HTTP request string, and returns a request object with the proper elements parsed out. For example, a GET request with query values in the URL might look like:

```
GET /movies?actor=Christopher%20Lee&year=1973
```

This will set the .query property on the request object to an object containing the keys and values defined in the URL. In this case, we're setting "actor" to "Christopher Lee" and "year" to "1973" (note: a string, not a number!), so our object would look like:

```js
{
  actor: 'Christopher Lee',
  year: '1973'
}
```

## GET request with url parameters

To simulate the way that express handles routes, we're going to allow parse() to take in a second parameter with a parameter template in it, just like you're used to creating in your express route methods. For example, if we have this URL:

```
GET /books/3
```

And we pass in the parameter string "/books/:id", we'll get the id out of the url, and set the .params property on the request object like:

```js
{
  id: "3"
}
```

## POST request with body data

A POST request will have a body segment following its headers, containing the data passed in. We can also set the request type in our headers, telling us whether the body data is JSON, urlencoded, or something else. For example, posting data to an endpoint might look like this:

```
POST /login HTTP/1.1
Host: localhost
Content-Type: application/json; charset=utf-8
Content-Length: 44

{"email":"user@gmail.com","password":"test"}
```

Which will set the .body property of our request object to:

```js
{
  email: 'user@gmail.com',
  password: 'test'
}
```

If we wanted to use urlencoding to pass the data in the body, we would set the Content-Type in our header to "application/x-www-form-urlencoded", and the body will look like this:

```
email=user@gmail.com&password=test
```

## The Gory Details

If you want to learn literally everything there is to know about the HTTP/1.1 request structure, your source of truth is the standard, here:

[https://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.3](https://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.3)
