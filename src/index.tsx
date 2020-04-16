import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {initLan} from './util';

initLan();
ReactDOM.render(<App />, document.getElementById('app'));
