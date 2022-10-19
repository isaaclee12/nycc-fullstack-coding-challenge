// This file is for testing functionality.
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// This function tests whether it renders at all
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

