// Polyfills
import 'whatwg-fetch'

// Globals
global.React = require('react')
global.ReactDOM = require('react-dom')

require('./styles/main.scss')
require('./app.js')
