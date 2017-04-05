const jsdom = require('jsdom')
const { shallow, render, mount } = require('enzyme')
global.React = require('react')
global.ReactDOM = require('react-dom')
global.document = jsdom.jsdom({
	url: `https://gist.githubusercontent.com/hubgit/90452/raw/e4829fd2e8c7131e29940477b4c2dc9a83c095d1/blank-html-template`,
})
global.shallow = shallow
global.render = render
global.mount = mount
global.window = global.document.defaultView
