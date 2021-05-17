// router.js

export const router = {};
const body = document.querySelector('body');
const title = document.querySelector('header h1');

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(state, back) {
  // go to Home page
  if (state == null || state.name == 'home') {
    body.className = ''; 
    title.innerText = 'Journal Entries';

    // add entry to browser's session history stack
    if (back == false) {
      history.pushState({page: state}, '', "./"); 
    }
  }

  // go to Settings page
  else if (state.name == 'settings') {
    body.className = 'settings';
    title.innerText = 'Settings'; 

    // add entry to browser's session history stack
    if (back == false) {
      window.history.pushState({page: state}, '', '#settings');  
    }
  }

  // go to Entry page
  else if (state.name == 'entry') {
    body.className = 'single-entry'; 
    title.innerText = 'Entry ' + state.id;

    let eachEntry = document.createElement('entry-page');
    eachEntry.entry = document.getElementById(state.id).entry;
    body.removeChild(document.getElementsByTagName("entry-page")[0]);
    body.appendChild(eachEntry);

    // add entry to browser's session history stack
    if (back == false) {
      history.pushState({page: state}, '', '#entry'.concat(state.id));
    }
  }
}
