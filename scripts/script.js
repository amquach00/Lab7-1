// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

let entryNum = 0;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;

        entryNum++;
        newPost.id = entryNum;
        newPost.addEventListener('click', () => {
          setState({name: 'entry', id: newPost.id}, false);
        });

        document.querySelector('main').appendChild(newPost);
      });
    });
});

document.querySelector('header h1').addEventListener('click', () => {
if (history.state != null && history.state.name != 'home') {
    setState({name: 'home'}, false);
  };
});
    
document.querySelector('header img').addEventListener('click', () => {
  if (history.state == null || history.state.name != 'settings') {
      setState({name: 'settings'}, false);
  }
});

window.addEventListener('popstate', (e) => {
  setState(e.state, true);
});