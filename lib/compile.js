'use strict';

const reval = require('eval');
const babel = require('@babel/core');
const { createElement } = require('inferno-create-element');
const { renderToStaticMarkup } = require('inferno-server');

const babelOptions = {
    presets: [
        '@babel/preset-env'
    ],
    plugins: [
        [
            'babel-plugin-inferno',
            {
                imports: true
            }
        ]
    ]
};
require('@babel/register')(babelOptions);

function compile(data) {
    const js = babel.transform(data.text, Object.assign({ filename: data.path }, babelOptions));
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
