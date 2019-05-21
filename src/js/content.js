'use strict';

console.log("lumo contents");


let log = function (a) {
  console.log('lumo', a)
};

let getAllElements = function () {
  log('getAllElements');

  let elements = document.querySelectorAll('a');
  elements = Array.from(elements);

  return elements.filter( link => link.href !== "" );
};


let getLinks = function (elements) {
  log('getLinks');
  return [ ...new Set( elements.map( link => link.href ) ) ];
};


let getVisitedLinks = function (links) {
  log('getVisitedLinks');
  return new Promise((resolve, reject) => {
    //chiama l'api
    function api(links) {
      log('apiCall');
      const dbLinks = ['https://developer.chrome.com/background_pages.html','b','c','d'];
      return links.filter(link => dbLinks.includes(link))
    }

    resolve(api(links))
  });
};

let allElements = getAllElements();


let render = function (links) {
  log('render');
  console.log(links);
};


getVisitedLinks(getLinks(allElements))
  .then( (visitedLinks) => render(visitedLinks) );