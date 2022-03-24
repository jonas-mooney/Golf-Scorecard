
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
  headerRow.append('HOLE');

  let proRow = document.createElement('tr');
  proRow.append('PRO');

  let handicapRow = document.createElement('tr');
  handicapRow.append('HANDICAP');

  let playerOne = document.createElement('tr');
  playerOne.append('Add Player Name');

  let playerTwo = document.createElement('tr');
  playerTwo.append('Add Player Name');

  let playerThree = document.createElement('tr');
  playerThree.append('Add Player Name');



  ////////////////////////////////////////////////////////////////////////////
  courseData.holes.forEach(holeNumber => {
    holeNumber = holeNumber.hole;
    let header = document.createElement('th');
    let textNode = document.createTextNode(holeNumber);
    header.appendChild(textNode);
    headerRow.appendChild(header);
  });

  courseData.holes.forEach(pro => {
    let par = pro.teeBoxes[0].par;
    let header = document.createElement('th');
    let textNode = document.createTextNode(par);
    header.appendChild(textNode);
    proRow.appendChild(header);
  })

  courseData.holes.forEach(pro => {
    let handicap = pro.teeBoxes[0].hcp;
    let header = document.createElement('th');
    let textNode = document.createTextNode(handicap);
    header.appendChild(textNode);
    handicapRow.appendChild(header);
  })

  courseData.holes.forEach(hole => {
    let header = document.createElement('input');
    let textNode = document.createElement('input');
    header.appendChild(textNode);
    playerOne.appendChild(header);
  })

  courseData.holes.forEach(hole => {
    let header = document.createElement('input');
    let textNode = document.createElement('input');
    header.appendChild(textNode);
    playerTwo.appendChild(header);
  })

  courseData.holes.forEach(hole => {
    let header = document.createElement('input');
    let textNode = document.createElement('input');
    header.appendChild(textNode);
    playerThree.appendChild(header);
  })


////////////////////////////////////////////////////////////////////////////



  scorecard.appendChild(table);
  table.appendChild(headerRow);
  table.appendChild(proRow);
  table.appendChild(handicapRow);
  table.appendChild(playerOne);
  table.appendChild(playerTwo);
  table.appendChild(playerThree);



}

// #courseScorecard