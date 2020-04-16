import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {initLan, t} from './util';

initLan();
ReactDOM.render(<App />, document.getElementById('app'));

ReactDOM.render(
  <div className='footer'>
    <a href="https://deepmess.com">{t('', 'DeepMess首页')}</a>
    <div className="spacer" />
    <a href="https://github.com/rinick/deepmess/issues">{t('Send Feedback', '问题回馈')}</a>
  </div>,
  document.getElementById('footer')
);
