'use strict';

const inferno = require('inferno');
const Component = require('./component.jsx');

module.exports = class extends inferno.Component {
  render() {
    return <html>
      <h1>{this.props.title}</h1>
      <Component content={this.props.content} />
    </html>;
  }
};
