
let courseData = 0;

let scorecard = document.querySelector('#courseScorecard');

let courseId = localStorage.getItem('Choice');

class Utils {
  static newGuide() {
    return `${s4()}-${s4()}-${s4()}-${s4()}`;

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
  }
}

export function getData() {
  return fetch(`https://golf-courses-api.herokuapp.com/courses/${courseId}`)
  .then(response => response.json())
  .then(data => courseData = data.data)
  .then(() => {
    renderScorecard(courseData);
  })
}

function renderScorecard(courseData) {
  document.querySelector('#header').innerHTML = courseData.name
  document.querySelector('#courseOptions').innerHTML = null;
///HOLE
    let holeRow = '';
    holeRow += `<h3>HOLE</h3>`;
    courseData.holes.forEach((holeNumber, index) => {
      holeNumber = holeNumber.hole;
      holeRow += `<th>${holeNumber}</th>`
      if (index == 8) {
        holeRow += `<th>OUT</th>`
        holeRow += `<th rowspan='2'></th>`
      }
      if (index == 17) {
        holeRow += `<th>IN</th>`
        holeRow += `<th>TOT</th>`
      }
      document.querySelector('#holeNumberRow').innerHTML = holeRow;
    });
///ROW
      let proRow = '';
      let proTotal = 0;
      let proTotalTwo = 0;
      proRow += `<h3>PRO</h3>`;
      courseData.holes.forEach((pro, index) => {
      pro = pro.teeBoxes[0].meters;
      proRow += `<th>${pro}</th>`
      if (index <= 8) {
        proTotal += pro;
      }
      if (index == 8) {
        proRow += `<th>${proTotal}</th>`
        proRow += `<th></th>`
      }
      if (index > 8 && index <= 17) {
        proTotalTwo += pro;
      }
      if (index == 17) {
        proRow += `<th>${proTotalTwo}</th>`
        proRow += `<th>${proTotal + proTotalTwo}</th>`
      }
      document.querySelector('#proRow').innerHTML = proRow;
      });
///HANDICAP
      let handicapRow = '';
      handicapRow += `<h3>HANDICAP</h3>`;
      courseData.holes.forEach((handicap, index) => {
      handicap = handicap.teeBoxes[0].hcp;
      handicapRow += `<th>${handicap}</th>`
      if (index === 8) {
        handicapRow += `<th></th>`
        handicapRow += `<th></th>`
      }
      if (index == 17) {
        handicapRow += `<th></th>`
        handicapRow += `<th></th>`
      }
      document.querySelector('#handicapRow').innerHTML = handicapRow;
      })
// PLAYER ONE
      let playerOneRow = '';
      let playerOneIds = [];
      playerOneRow += `<input type='text' class='nameOfPlayer' id='123' placeholder='Enter Player Name'>`;
      courseData.holes.forEach((hole, index) => {
        let randomId = Utils.newGuide();
        playerOneRow += `<th><input type='text' id='${randomId}' onkeyup='getOneTotal()'></th>`;
        playerOneIds.push(randomId);
        if (index == 8) {
          playerOneRow += `<th id='oneOut'>0</th>`
          playerOneRow += `<th>GA</th>`
        }
        if (index == 17) {
          playerOneRow += `<th id='oneIn'>0</th>`
          playerOneRow += `<th id='oneTotal'>0</th>`
        }

      })
        document.querySelector('#playerOneRow').innerHTML = playerOneRow;

      // console.log(playerOneIds);

      window.getOneTotal = () => {
        let inputOneTotal = 0;
        for (let i=0; i < playerOneIds.length; i++) {
          let input = document.getElementById(playerOneIds[i]);
          inputOneTotal += +input.value;
        }
        document.querySelector('#oneOut').innerText = inputOneTotal;
      }
      
      //keyup

///PAR
      let parRow = '';
      let parTotal = 0;
      let parTotalTwo = 0;
      parRow += `<h3>PAR</h3>`;
      courseData.holes.forEach((par, index) => {
      par = par.teeBoxes[0].par;
      parRow += `<th>${par}</th>`;
      if (index <= 8) {
        parTotal += par;
      }
      if (index == 8) {
        parRow += `<th>${parTotal}</th>`
        parRow += `<th></th>`
      }
      if (index > 8 && index <= 17) {
        parTotalTwo += par;
      }
      if (index == 17) {
        parRow += `<th>${parTotalTwo}</th>`
        parRow += `<th>${parTotal + parTotalTwo}</th>`
      }
      document.querySelector('#parRow').innerHTML = parRow;
      })


    //let proTotal = 0;
//   courseData.holes.forEach(pro => {
//     proTotal += pro.teeBoxes[0].meters;
//     let meters = pro.teeBoxes[0].meters;
//     let header = document.createElement('th');
//     let textNode = document.createTextNode(meters);
//     header.appendChild(textNode);
//     proRow.appendChild(header);
//     if (meters == 157) {
//       let proHalfTotal = document.createElement('th');
//       proHalfTotal.append(2651);
//       proRow.appendChild(proHalfTotal);
//     }
//   })
//   let proTotalElement = document.createElement('th');
//   proTotalElement.append(proTotal);
//   proRow.appendChild(proTotalElement);
} 








// function renderScorecard(courseData) {
//   document.querySelector('#courseOptions').innerHTML = null;
//   document.querySelector('#header').innerHTML = courseData.name;
  
//   console.log(courseData);
//   // console.log(courseData.holes[0].teeBoxes[0].hcp);
//   // console.log(courseData.holes[0].teeBoxes[0].par);

//   // function toInput(header) {
//   //  let name = document.createElement('input');
//   //  header.prepend(name);
//   // }

//   let table = document.createElement('table');
//   let holeRow = document.createElement('tr');
//   let holeRowLabel = document.createElement('h4');
//   holeRowLabel.append('HOLE')
//   holeRow.append(holeRowLabel);

//   let proRow = document.createElement('tr');
//   let proRowLabel = document.createElement('h4');
//   proRowLabel.append('PRO');
//   proRow.append(proRowLabel);

//   let handicapRow = document.createElement('tr');
//   let handicapRowLabel = document.createElement('h4')
//   handicapRowLabel.append('HANDICAP');
//   handicapRow.append(handicapRowLabel);

//   let playerOne = document.createElement('tr');
//   playerOne.append('Add Player Name');
//   // playerOne.addEventListener('click', toInput(playerOne));

//   let playerTwo = document.createElement('tr');
//   playerTwo.append('Add Player Name');

//   let playerThree = document.createElement('tr');
//   playerThree.append('Add Player Name');

//   let playerFour = document.createElement('tr');
//   playerFour.append('Add Player Name')

//   let parRow = document.createElement('tr');
//   let parRowLabel = document.createElement('h4');
//   parRowLabel.append('PAR');
//   parRow.append(parRowLabel);


//   ////////////////////////////////////////////////////////////////////////////

//   courseData.holes.forEach(holeNumber => {
//     holeNumber = holeNumber.hole;
//     let header = document.createElement('th');
//     let textNode = document.createTextNode(holeNumber);
//     header.appendChild(textNode);
//     holeRow.appendChild(header);
//     if (holeNumber == 8) {
//       let outHeader = document.createElement('th');
//       outHeader.append('OUT');
//       holeRow.appendChild(outHeader);
//     }
//   });

//   //////////////////

//   let proTotal = 0;
//   courseData.holes.forEach(pro => {
//     proTotal += pro.teeBoxes[0].meters;
//     let meters = pro.teeBoxes[0].meters;
//     let header = document.createElement('th');
//     let textNode = document.createTextNode(meters);
//     header.appendChild(textNode);
//     proRow.appendChild(header);
//     if (meters == 157) {
//       let proHalfTotal = document.createElement('th');
//       proHalfTotal.append(2651);
//       proRow.appendChild(proHalfTotal);
//     }
//   })
//   let proTotalElement = document.createElement('th');
//   proTotalElement.append(proTotal);
//   proRow.appendChild(proTotalElement);

//   //////////////////

//   courseData.holes.forEach(pro => {
//     let handicap = pro.teeBoxes[0].hcp;
//     let header = document.createElement('th');
//     let textNode = document.createTextNode(handicap);
//     header.appendChild(textNode);
//     handicapRow.appendChild(header);
//     if (handicap == 17) {
//       let handicapTotal = document.createElement('th');
//       handicapTotal.append('');
//       handicapRow.appendChild(handicapTotal);
//     }
//   })
//   let handicapPlaceholder = document.createElement('th');
//   handicapRow.appendChild(handicapPlaceholder);

//   //////////////////

//   let playerOneTotal = 0;
//   courseData.holes.forEach(hole => {
//     let header = document.createElement('th');
//     let textNode = document.createElement('input');
//     playerOneTotal += textNode.value;
//     header.appendChild(textNode);
//     playerOne.appendChild(header);
//   })
//   let oneTotal = document.createElement('th');
//   oneTotal.append(playerOneTotal);
//   playerOne.appendChild(oneTotal);

//   //////////////////

//   let playerTwoTotal = 0;
//   courseData.holes.forEach(hole => {
//     let header = document.createElement('th');
//     let textNode = document.createElement('input');
//     header.appendChild(textNode);
//     playerTwo.appendChild(header);
//   })
//   let twoTotal = document.createElement('th');
//   twoTotal.append(playerTwoTotal);
//   playerTwo.appendChild(twoTotal);

//   //////////////////

//   let playerThreeTotal = 0;
//   courseData.holes.forEach(hole => {
//     let header = document.createElement('th');
//     let textNode = document.createElement('input');
//     header.appendChild(textNode);
//     playerThree.appendChild(header);
//   })
//   let threeTotal = document.createElement('th');
//   threeTotal.append(playerThreeTotal);
//   playerThree.appendChild(threeTotal);

//   //////////////////

//   let playerFourTotal = 0;
//   courseData.holes.forEach(hole => {
//     let header = document.createElement('th');
//     let textNode = document.createElement('input');
//     header.appendChild(textNode);
//     playerFour.appendChild(header);
//   })
//   let fourTotal = document.createElement('th');
//   fourTotal.append(playerFourTotal);
//   playerFour.appendChild(fourTotal);

//   //////////////////

//   let parTotal = 0;
//   courseData.holes.forEach(pro => {
//     parTotal += pro.teeBoxes[0].par;
//     let par = pro.teeBoxes[0].par;
//     let header = document.createElement('th');
//     let textNode = document.createTextNode(par);
//     header.appendChild(textNode);
//     parRow.appendChild(header);
//   })
//   let parTotalElement = document.createElement('th');
//   parTotalElement.append(parTotal);
//   parRow.appendChild(parTotalElement);

//   ////////////////////////////////////////////////////////////////////////////

//   let totalLabel = document.createElement('h5');
//   totalLabel.append('TOT');
//   holeRow.appendChild(totalLabel);



//   ////////////////////////////////////////////////////////////////////////////



//   scorecard.appendChild(table);
//   table.appendChild(holeRow);
//   table.appendChild(proRow);
//   table.appendChild(handicapRow);
//   table.appendChild(playerOne);
//   table.appendChild(playerTwo);
//   table.appendChild(playerThree);
//   table.appendChild(playerFour);
//   table.appendChild(parRow);


// }

// #courseScorecard