let courseData = 0;
let scorecard = document.querySelector('#courseScorecard');

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
  return fetch(`https://golf-courses-api.herokuapp.com/courses/${localStorage.getItem('Choice')}`)
  .then(response => response.json())
  .then(data => courseData = data.data)
  .then(() => {
    renderScorecard(courseData);
  })
}

function renderScorecard(courseData) {
  console.log(courseData.name)
  document.querySelector('#header').innerHTML = courseData.name;
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

      window.getOneTotal = () => {
        let oneTotal = 0;
        let oneOut = 0;
        let oneIn = 0;
        for (let i=0; i < 9; i++) {
          let input = document.getElementById(playerOneIds[i]);
          oneOut += +input.value;
        }
        for (let i=9; i < 18; i++) {
          let input = document.getElementById(playerOneIds[i]);
          oneIn += +input.value;
        }

        document.querySelector('#oneOut').innerText = oneOut;
        document.querySelector('#oneIn').innerText = oneIn;
        document.querySelector('#oneTotal').innerText = oneOut + oneIn;
      }
      
// PLAYER TWO
      let playerTwoRow = '';
      let playerTwoIds = [];
      playerTwoRow += `<input type='text' class='nameOfPlayer' id='123' placeholder='Enter Player Name'>`;
      courseData.holes.forEach((hole, index) => {
        let randomId = Utils.newGuide();
        playerTwoRow += `<th><input type='text' id='${randomId}' onkeyup='getTwoTotal()'></th>`;
        playerTwoIds.push(randomId);
        if (index == 8) {
          playerTwoRow += `<th id='twoOut'>0</th>`
          playerTwoRow += `<th>GA</th>`
        }
        if (index == 17) {
          playerTwoRow += `<th id='twoIn'>0</th>`
          playerTwoRow += `<th id='twoTotal'>0</th>`
        }

      })
        document.querySelector('#playerTwoRow').innerHTML = playerTwoRow;

      window.getTwoTotal = () => {
        let twoTotal = 0;
        let twoOut = 0;
        let twoIn = 0;
        for (let i=0; i < 9; i++) {
          let input = document.getElementById(playerTwoIds[i]);
          twoOut += +input.value;
        }
        for (let i=9; i < 18; i++) {
          let input = document.getElementById(playerTwoIds[i]);
          twoIn += +input.value;
        }

        document.querySelector('#twoOut').innerText = twoOut;
        document.querySelector('#twoIn').innerText = twoIn;
        document.querySelector('#twoTotal').innerText = twoOut + twoIn;
      }

// PLAYER THREE
  let playerThreeRow = '';
  let playerThreeIds = [];
  playerThreeRow += `<input type='text' class='nameOfPlayer' id='123' placeholder='Enter Player Name'>`;
  courseData.holes.forEach((hole, index) => {
    let randomId = Utils.newGuide();
    playerThreeRow += `<th><input type='text' id='${randomId}' onkeyup='getThreeTotal()'></th>`;
    playerThreeIds.push(randomId);
    if (index == 8) {
      playerThreeRow += `<th id='threeOut'>0</th>`
      playerThreeRow += `<th>GA</th>`
    }
    if (index == 17) {
      playerThreeRow += `<th id='threeIn'>0</th>`
      playerThreeRow += `<th id='threeTotal'>0</th>`
    }

  })
    document.querySelector('#playerThreeRow').innerHTML = playerThreeRow;

  window.getThreeTotal = () => {
    let threeTotal = 0;
    let threeOut = 0;
    let threeIn = 0;
    for (let i=0; i < 9; i++) {
      let input = document.getElementById(playerThreeIds[i]);
      threeOut += +input.value;
    }
    for (let i=9; i < 18; i++) {
      let input = document.getElementById(playerThreeIds[i]);
      threeIn += +input.value;
    }

    document.querySelector('#threeOut').innerText = threeOut;
    document.querySelector('#threeIn').innerText = threeIn;
    document.querySelector('#threeTotal').innerText = threeOut + threeIn;
  }

  // PLAYER FOUR
  let playerFourRow = '';
  let playerFourIds = [];
  playerFourRow += `<input type='text' class='nameOfPlayer' id='123' placeholder='Enter Player Name'>`;
  courseData.holes.forEach((hole, index) => {
    let randomId = Utils.newGuide();
    playerFourRow += `<th><input type='text' id='${randomId}' onkeyup='getFourTotal()'></th>`;
    playerFourIds.push(randomId);
    if (index == 8) {
      playerFourRow += `<th id='fourOut'>0</th>`
      playerFourRow += `<th>GA</th>`
    }
    if (index == 17) {
      playerFourRow += `<th id='fourIn'>0</th>`
      playerFourRow += `<th id='fourTotal'>0</th>`
    }

  })
    document.querySelector('#playerFourRow').innerHTML = playerFourRow;

  window.getFourTotal = () => {
    let fourTotal = 0;
    let fourOut = 0;
    let fourIn = 0;
    for (let i=0; i < 9; i++) {
      let input = document.getElementById(playerFourIds[i]);
      fourOut += +input.value;
    }
    for (let i=9; i < 18; i++) {
      let input = document.getElementById(playerFourIds[i]);
      fourIn += +input.value;
    }

    document.querySelector('#fourOut').innerText = fourOut;
    document.querySelector('#fourIn').innerText = fourIn;
    document.querySelector('#fourTotal').innerText = fourOut + fourIn;
  }

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
}