
let courseData = 0;

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
  console.log(courseData);
  document.querySelector('#courseOptions').innerHTML = null;
  document.querySelector('#header').innerHTML = courseData.name;

  // courseData.holes.forEach(hole => );







}

// #courseScorecard