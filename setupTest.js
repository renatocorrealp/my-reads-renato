import React from 'react';
import { XMLHttpRequest } from 'xmlhttprequest';

const localStorageMock = (() => {
  let store = {}
  return {
    getItem(key) {
      return store[key]
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    }
  };
})()
// TODO remover
localStorageMock.token='jumzpanw';
global.localStorage = localStorageMock

// Mock for http requests
global.XMLHttpRequest = XMLHttpRequest;

// Mock for React Router
const rrd = require('react-router-dom');
rrd.BrowserRouter = ({children}) => <div>{children}</div>
module.exports = rrd;
