'use strict';

const { Component } = require('inferno');

module.exports = class extends Component {
  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.props.content }}></div>;
  }
};
