import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <div>
    <App />
    <div
      dangerouslySetInnerHTML={{
        __html: `
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- arithmetic -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-3283235194066083"
     data-ad-slot="8660046198"ya
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`,
      }}
    />
    <div id="output" />
  </div>,
  document.getElementById('app')
);
