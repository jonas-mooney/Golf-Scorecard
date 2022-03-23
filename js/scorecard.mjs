
let courseData = 0;

let scorecard = document.querySelector('#courseScorecard');

let courseId = localStorage.getItem('Choice');

export function getData() {
  return fetch(`https://golf-courses-api.herokuapp.com/courses/${courseId}`)
  .then(response => response.json())
  .then(data => courseData = data.data)
  .then(() => {
    renderScorecard(courseData);
  })
}

function renderScorecard(courseData) {
  document.querySelector('#courseOptions').innerHTML = null;
  document.querySelector('#header').innerHTML = courseData.name;
  
  console.log(courseData);
  // console.log(courseData.holes[0].teeBoxes[0].hcp);
  // console.log(courseData.holes[0].teeBoxes[0].par);

  let table = document.createElement('table');
  let headerRow = document.createElement('tr');
  let row2 = document.createElement('tr');

  courseData.holes.forEach(holeNumber => {
    holeNumber = holeNumber.hole;
    let header = document.createElement('th');
    let textNode = document.createTextNode(holeNumber);
    header.appendChild(textNode);
    headerRow.appendChild(header);
  });

  courseData.holes.forEach(pro => {
    let par = pro.teeBoxes[0].par;
    // let tableRow = document.createElement('tr');
    let textNode = document.createTextNode(par);
    row2.appendChild(textNode);
    
    
  })





  table.appendChild(headerRow);
  scorecard.appendChild(table);

  table.appendChild(row2);







}

// #courseScorecard