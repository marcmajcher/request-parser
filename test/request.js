'use strict';

const assert = require('chai').assert;
const r = require('../request.js');

const postRequestJSON = `POST /login HTTP/1.1
Host: localhost
Content-Type: application/json; charset=utf-8
Content-Length: 44

{"email":"user@gmail.com","password":"test"}
`;
const postRequestURL = `POST /login HTTP/1.1
Host: localhost
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Content-Length: 34

email=user@gmail.com&password=test
`;
const getParamRequest = 'GET /books/3 HTTP/1.1';
const getParamRoute = '/books/:id';
const getQueryRequest = 'GET /movies?actor=Christopher%20Lee&year=1973';


describe('Request Parsing', () => {

  it('Should parse out query values', () => {
    const req = r.parse(getQueryRequest);
    assert.deepEqual(req.query, {
      actor: 'Christopher Lee',
      year: '1973'
    });
    assert.isUndefined(req.params);
    assert.isUndefined(req.body);
  });

  it('Should parse out parameters, given a route', () => {
    const req = r.parse(getParamRequest, getParamRoute);
    assert.deepEqual(req.params, {
      id: '3'
    });
    assert.isUndefined(req.query);
    assert.isUndefined(req.body);
  });

  it('Should receive the JSON body of a post request', () => {
    const req = r.parse(postRequestJSON);
    assert.deepEqual(req.body, {
      email: 'user@gmail.com',
      password: 'test'
    });
    assert.isUndefined(req.params);
    assert.isUndefined(req.query);
  });

  it('Should receive the urlencoded body of a post request', () => {
    const req = r.parse(postRequestURL);
    assert.deepEqual(req.body, {
      email: 'user@gmail.com',
      password: 'test'
    });
    assert.isUndefined(req.params);
    assert.isUndefined(req.query);
  });

});
