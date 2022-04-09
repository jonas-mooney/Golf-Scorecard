import { getData } from './scorecard.mjs'

let myCourses = [];

getApi();
function getApi() {
  return fetch('https://golf-courses-api.herokuapp.com/courses')
  .then(response => response.json())
  .then(data => myCourses = data)
  .then(() => {
    buildCourses(myCourses);
    console.log(myCourses);
  })
  // return fetch('https://golf-courses-api.herokuapp.com/courses')
}

function buildCourses(myCourses) {
  let courseOptionsHTML = '';
  let courseOptions = '';
    myCourses.courses.forEach((course) => {
    // courseIds.push(course.id);
    courseOptionsHTML += `<option onclick='chooseCourse2(${course.id})' id='${course.id}' value='${course.id}'>${course.name}</option>`;
    courseOptions += 
      `
        <div class="card">
          <img src="${course.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h3 class="card-title">${course.name}</h3>
          </div>
          <div class="footer">
          <a><button id='${course.id}' class='begin' onclick="localStorage.setItem('Choice', '${course.id}')">Select</button></a>
          </div>
        </div>
      ` // tick
      if (document.querySelector('#courseOptions')) {
        document.querySelector('#courseOptions').innerHTML = courseOptions;
      }
    }
  )
  let course1 = document.getElementById(`${myCourses.courses[0].id}`);
  let course2 = document.getElementById(`${myCourses.courses[1].id}`);
  let course3 = document.getElementById(`${myCourses.courses[2].id}`);
  course1.addEventListener('click', getData);
  course2.addEventListener('click', getData);
  course3.addEventListener('click', getData);
}

