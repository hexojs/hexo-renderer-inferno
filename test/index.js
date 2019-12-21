'use strict';

require('chai').should();
const fs = require('hexo-fs');
const pathFn = require('path');

describe('Inferno renderer', () => {
    const r = require('../lib/compile');

    it('default', () => {
        const expected = '<div><h1>Hello world!</h1></div>';
        const path = pathFn.join(__dirname, 'fixture', 'simple.jsx');
        fs.readFile(path).then(text => {
            const result = r({text: text, path: path})({
                content: '<h1>Hello world!</h1>'
            });
            result.should.eq(expected);
        });
    });

    it('import', () => {
        const expected = '<!doctype html>\n<html><h1>Hello world!</h1><p>From inferno.js</p></html>';
        const path = pathFn.join(__dirname, 'fixture', 'complex.jsx');
        fs.readFile(path).then(text => {
            const result = r({text: text, path: path})({
                title: 'Hello world!',
                content: 'From inferno.js'
            });
            result.should.eq(expected);
        });
    });
});
