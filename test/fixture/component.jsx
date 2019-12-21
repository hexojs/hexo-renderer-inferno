'use strict';

const { Component } = require('inferno');

module.exports = class extends Component {
    render() {
        return <p>{this.props.content}</p>;
    }
};
