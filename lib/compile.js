'use strict';

const reval = require('eval');
const babel = require('@babel/core');
const { createElement } = require('inferno-create-element');
const { renderToStaticMarkup } = require('inferno-server');

require('@babel/register');

function compile(data) {
    const js = babel.transform(data.text, { filename: data.path });
    const Component = reval(js.code, data.path, null, true);

    return function(locals) {
        const element = createElement(Component.default || Component, locals);
        let markup = renderToStaticMarkup(element);

        if (markup.slice(0, 5).toLowerCase() === '<html') {
            markup = '<!doctype html>\n' + markup;
        }

        return markup;
    };
}

module.exports = compile;
