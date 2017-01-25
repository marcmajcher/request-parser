'use strict';

module.exports = {

  /* Takes an HTTP request (GET or POST) and an optional express-style route
     as parameters, returns a "req" object with the query keys and values and
     the body of the request parsed out. If a route is passed with /:params
     then the value of the params should be parsed out, as well. If the body
     contains JSON, convert the body text into an object.
  */
  parse: (request, route) => {
    return {
      query: undefined,
      params: undefined,
      body: undefined
    };
  }
};
