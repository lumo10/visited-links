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
  let links = elements.map( link => link.href );
  let uniqueLinks = new Set (links);
  return [ ...uniqueLinks ];
};


let getVisitedLinks = function (links) {
  log('getVisitedLinks');
  return new Promise((resolve, reject) => {
    //chiama l'api
    function api(links) {
      log('apiCall');
      let dbLinks = localStorage.getItem('lumoVisitedLink');

      if(!dbLinks)
        return [];

      dbLinks = JSON.parse(dbLinks);

      return links.filter(link => dbLinks.includes(link))
    }

    resolve(api(links))
  });
};

let allElements = getAllElements();

allElements.forEach(el=>{
  el.addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    let links = JSON.parse(localStorage.getItem('lumoVisitedLink'));
    let currentLink = this.href;

    if(links){
      links.push(currentLink)
    }else{
      links = [currentLink]
    }

    localStorage.setItem('lumoVisitedLink', JSON.stringify(links))

  });
});

let render = function (links) {
  log('render');

  let elements = [];
  links.forEach( (link) => {
    let currentLinkElements = allElements.filter(el => el.href === link);
    elements = elements.concat(currentLinkElements);
  });

  elements.forEach( el => {

    el.style.color= "red";
  })
};


getVisitedLinks(getLinks(allElements))
  .then( (visitedLinks) => render(visitedLinks) );