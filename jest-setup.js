// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import '@testing-library/jest-dom';
// Mock `window.location` with Jest spies and extend expect
import 'jest-location-mock';

import { configure } from '@testing-library/dom';

window.React = React;

configure({
  testIdAttribute: 'id',
});
