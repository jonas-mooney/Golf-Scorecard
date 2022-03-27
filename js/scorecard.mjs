
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

  // function toInput(header) {
  //  let name = document.createElement('input');
  //  header.prepend(name);
  // }

  let table = document.createElement('table');
  let holeRow = document.createElement('tr');
  let holeRowLabel = document.createElement('h4');
  holeRowLabel.append('HOLE')
  holeRow.append(holeRowLabel);

  let proRow = document.createElement('tr');
  let proRowLabel = document.createElement('h4');
  proRowLabel.append('PRO');
  proRow.append(proRowLabel);

  let handicapRow = document.createElement('tr');
  let handicapRowLabel = document.createElement('h4')
  handicapRowLabel.append('HANDICAP');
  handicapRow.append(handicapRowLabel);

  let playerOne = document.createElement('tr');
  playerOne.append('Add Player Name');
  // playerOne.addEventListener('click', toInput(playerOne));

  let playerTwo = document.createElement('tr');
  playerTwo.append('Add Player Name');

  let playerThree = document.createElement('tr');
  playerThree.append('Add Player Name');

  let playerFour = document.createElement('tr');
  playerFour.append('Add Player Name')

  let parRow = document.createElement('tr');
  let parRowLabel = document.createElement('h4');
  parRowLabel.append('PAR');
  parRow.append(parRowLabel);


  ////////////////////////////////////////////////////////////////////////////

  courseData.holes.forEach(holeNumber => {
    holeNumber = holeNumber.hole;
    let header = document.createElement('th');
    let textNode = document.createTextNode(holeNumber);
    header.appendChild(textNode);
    holeRow.appendChild(header);
  });

  //////////////////

  let proTotal = 0;
  courseData.holes.forEach(pro => {
    proTotal += pro.teeBoxes[0].meters;
    let meters = pro.teeBoxes[0].meters;
    let header = document.createElement('th');
    let textNode = document.createTextNode(meters);
    header.appendChild(textNode);
    proRow.appendChild(header);
  })
  let proTotalElement = document.createElement('th');
  proTotalElement.append(proTotal);
  proRow.appendChild(proTotalElement);

  //////////////////

  courseData.holes.forEach(pro => {
    let handicap = pro.teeBoxes[0].hcp;
    let header = document.createElement('th');
    let textNode = document.createTextNode(handicap);
    header.appendChild(textNode);
    handicapRow.appendChild(header);
  })
  let handicapPlaceholder = document.createElement('th');
  handicapRow.appendChild(handicapPlaceholder);

  //////////////////

  let playerOneTotal = 0;
  courseData.holes.forEach(hole => {
    let header = document.createElement('th');
    let textNode = document.createElement('input');
    playerOneTotal += textNode.value;
    header.appendChild(textNode);
    playerOne.appendChild(header);
  })
  let oneTotal = document.createElement('th');
  oneTotal.append(playerOneTotal);
  playerOne.appendChild(oneTotal);

  //////////////////

  let playerTwoTotal = 0;
  courseData.holes.forEach(hole => {
    let header = document.createElement('th');
    let textNode = document.createElement('input');
    header.appendChild(textNode);
    playerTwo.appendChild(header);
  })
  let twoTotal = document.createElement('th');
  twoTotal.append(playerTwoTotal);
  playerTwo.appendChild(twoTotal);

  //////////////////

  let playerThreeTotal = 0;
  courseData.holes.forEach(hole => {
    let header = document.createElement('th');
    let textNode = document.createElement('input');
    header.appendChild(textNode);
    playerThree.appendChild(header);
  })
  let threeTotal = document.createElement('th');
  threeTotal.append(playerThreeTotal);
  playerThree.appendChild(threeTotal);

  //////////////////

  let playerFourTotal = 0;
  courseData.holes.forEach(hole => {
    let header = document.createElement('th');
    let textNode = document.createElement('input');
    header.appendChild(textNode);
    playerFour.appendChild(header);
  })
  let fourTotal = document.createElement('th');
  fourTotal.append(playerFourTotal);
  playerFour.appendChild(fourTotal);

  //////////////////

  let parTotal = 0;
  courseData.holes.forEach(pro => {
    parTotal += pro.teeBoxes[0].par;
    let par = pro.teeBoxes[0].par;
    let header = document.createElement('th');
    let textNode = document.createTextNode(par);
    header.appendChild(textNode);
    parRow.appendChild(header);
  })
  let parTotalElement = document.createElement('th');
  parTotalElement.append(parTotal);
  parRow.appendChild(parTotalElement);

  ////////////////////////////////////////////////////////////////////////////

  let totalLabel = document.createElement('h5');
  totalLabel.append('TOT');
  holeRow.appendChild(totalLabel);



  ////////////////////////////////////////////////////////////////////////////



  scorecard.appendChild(table);
  table.appendChild(holeRow);
  table.appendChild(proRow);
  table.appendChild(handicapRow);
  table.appendChild(playerOne);
  table.appendChild(playerTwo);
  table.appendChild(playerThree);
  table.appendChild(playerFour);
  table.appendChild(parRow);


}

// #courseScorecard