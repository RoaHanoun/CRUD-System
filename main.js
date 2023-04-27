var courseName = document.getElementById('courseName')
var courseCategory = document.getElementById('courseCategory')
var coursePrice = document.getElementById('coursePrice')
var courseDescription = document.getElementById('courseDescription')
var courseCapacity = document.getElementById('courseCapacity')

var click = document.getElementById('click') // submit
var data = document.getElementById('data') //not need
var search = document.getElementById('search')
var courses
var current_index = 0
var update = document.getElementById("update");

if(JSON.parse(localStorage.getItem('courses')) === null){
  courses = [];
}else{
  courses = JSON.parse(localStorage.getItem('courses'));
}
dispalyData()
checkInputs()

var isNameValid = false;
var isCategoryValid = false;
var isPriceValid = false;
var isDescriptionValid = false;
var isCapacityValid = false;

// CHECK FOR VALIDATION
function checkInputs(){
  if (isNameValid && isCategoryValid && isPriceValid && isDescriptionValid && isCapacityValid){
    click.removeAttribute('disabled')
  }else{
    click.setAttribute('disabled','disabled')
  }
}

update.style.display = 'none'; 
//ONCLICK // need done
click.onclick = function(e){
    e.preventDefault()
    addcourse()
    resetInput()
    dispalyData()
    console.log(courses);
}
//CREAT // need done
function addcourse(){
    var course = {
        Name : courseName.value,
        Category : courseCategory.value,
        Price : coursePrice.value,
        Description : courseDescription.value,
        Capacity : courseCapacity.value
    }
    courses.push(course);
    localStorage.setItem('courses',JSON.stringify(courses));
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course Added Sucessfully',
        showConfirmButton: false,
        timer: 1500
      })
}
//RESET // need done
function resetInput(){
     courseName.value = ''
     courseCategory.value = ''
     coursePrice.value = ''
     courseDescription.value = ''
     courseCapacity.value = ''
}

// READ DATA not need

function dispalyData(){
    var res= ``
    for(var i=0; i<courses.length;i++){
        res += `
            <tr>
                <td>${i+1}</td>
                <td>${courses[i].Name}</td>
                <td>${courses[i].Category}</td>
                <td>${courses[i].Price}</td>
                <td>${courses[i].Description}</td>
                <td>${courses[i].Capacity}</td>
                <td><button class= "btn btn-info" onclick = "getCourse(${i})">update</button></td>
                <td><button class= "btn btn-danger" onclick = "deleteCourse(${i})">delete</button></td>

            </tr>
        `
    }
    data.innerHTML = res
}

// DELETE ALL not need

document.getElementById('deleteBtn').onclick = function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses = []
            localStorage.setItem('courses',JSON.stringify(courses));
            data.innerHTML = ''
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
   
}

// DELETE COURSE // need

function deleteCourse(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index,1)
            localStorage.setItem('courses',JSON.stringify(courses));
            dispalyData()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
}

//SEARCH

search.onkeyup = function(){
    var res = ``
    for (var i = 0 ; i<courses.length ; i++){
        if (courses[i].Name.toLowerCase().includes(search.value.toLowerCase()) ){
            res += `
            <tr>
                <td>${i+1}</td>
                <td>${courses[i].Name}</td>
                <td>${courses[i].Category}</td>
                <td>${courses[i].Price}</td>
                <td>${courses[i].dispalyData}</td>
                <td>${courses[i].Capacity}</td>
                <td><button class= "btn btn-info" onclick = "getCourse(${i})">update</button></td>
                <td><button class= "btn btn-danger" onclick = "deleteCourse(${i})">delete</button></td>

            </tr>
        `
        }
    }
    data.innerHTML = res
}

// UPDATE

function getCourse(index){
  console.log(index);
  var course = courses[index];
  console.log(course);
  current_index = index

  courseName.value = course.courseName;
  courseCategory.value = course.courseCategory;
  coursePrice.value = course.coursePrice;
  courseDescription.value = course.courseDescription;
  courseCapacity.value = course.courseCapacity;
  
  update.style.display = 'inline';
  click.style.display = 'none'
}

// UPDATE NEW
update.onclick = function(e){
  e.preventDefault()
  updateCourse()
  
  dispalyData()

  update.style.display = 'none';
  click.style.display = 'inline'
  resetInput()

}

function updateCourse(){
  var course = {
    courseName : courseName.value,
    courseCategory : courseCategory.value,
    coursePrice  : coursePrice.value,
    courseDescription : courseDescription.value,
    courseCapacity : courseCapacity.value
  }
  // console.log(courses[current_index]);
  var nameco = courses[current_index].courseName ;
  courses[current_index].courseName = course.courseName;
  courses[current_index].courseCategory = course.courseCategory;
  courses[current_index].coursePrice = course.coursePrice;
  courses[current_index].courseDescription = course.courseDescription;
  courses[current_index].courseCapacity = course.courseCapacity;
  localStorage.setItem('courses',JSON.stringify(courses));

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `${nameco} Course Updated Sucessfully`,
    showConfirmButton: false,
    timer: 1500
  })
  // console.log(courses[current_index]);
}

// VALIDATION // need

var nameAlert = document.getElementById("nameAlert")
// nameAlert.style.display = 'none'
// NAME -- START WITH CAPITAL -- 3-10 -- NO NUMBERS -- REGEX /^[A-Z][a-z]{2,10}$/
courseName.onkeyup = function(){
  isNameValid = true
  var pattern = /^[A-Z][a-z]{2,10}$/
  if (pattern.test(courseName.value)){
    if (courseName.classList.contains('is-invalid')){
      courseName.classList.replace('is-invalid', 'is-valid')
    }
    courseName.classList.add('is-valid')
    // nameAlert.style.display = 'none'
    nameAlert.innerHTML = ''
  }else{
    isNameValid = false
    nameAlert.innerHTML = '*please start with capital letter and just between 3-10 wihout numbers'
    // nameAlert.style.display = 'block'
    if (courseName.classList.contains('is-valid')){
      courseName.classList.replace('is-valid', 'is-invalid')
    }
    courseName.classList.add('is-invalid')
  }

  checkInputs();
}

var catAlert = document.getElementById("catAlert")
catAlert.style.display = 'none'
// CATEGORY -- START WITH CAPITAL -- 3-20 -- NO NUMBERS -- REGEX /^[A-Z][a-z]{2,20}$/
courseCategory.onkeyup = function(){
  isCategoryValid = true
  var pattern = /^[A-Z][a-z]{2,10}$/
  if (pattern.test(courseCategory.value)){
    if (courseCategory.classList.contains('is-invalid')){
      courseCategory.classList.replace('is-invalid', 'is-valid')
    }
    courseCategory.classList.add('is-valid')
    catAlert.style.display = 'none'
  }else{
    isCategoryValid = false
    catAlert.style.display = 'block'
    if (courseCategory.classList.contains('is-valid')){
      courseCategory.classList.replace('is-valid', 'is-invalid')
    }
    courseCategory.classList.add('is-invalid')
  }

  checkInputs();
}

var priceAlert = document.getElementById("priceAlert")
priceAlert.style.display = 'none'
// PRICE -- 3-4 -- NUMBERS -- REGEX /^[0-9]{3,4}$/
coursePrice.onkeyup = function(){
  isPriceValid = true
  var pattern = /^[0-9]{3,4}$/ // [5-9][0-9] | 100
  if (pattern.test(coursePrice.value) && coursePrice.value >99){ // بدون الاكبر والاند 
    if (coursePrice.classList.contains('is-invalid')){
      coursePrice.classList.replace('is-invalid', 'is-valid')
    }
    coursePrice.classList.add('is-valid')
    priceAlert.style.display = 'none'
  }else{
    isPriceValid = false
    priceAlert.style.display = 'block'
    if (coursePrice.classList.contains('is-valid')){
      coursePrice.classList.replace('is-valid', 'is-invalid')
    }
    coursePrice.classList.add('is-invalid')
  }

  checkInputs();
}

var desAlert = document.getElementById("desAlert")
desAlert.style.display = 'none'
// DESCRIPTION -- START WITH CAPITAL -- 2-120 -- NUMBERS -- REGEX /^[A-Z][A-Za-z0-9\S]{2,120}$/
courseDescription.onkeyup = function(){
  isDescriptionValid = true
  var pattern = /^[A-Z][A-Za-z0-9\s]{2,120}$/
  if (pattern.test(courseDescription.value)){
    if (courseDescription.classList.contains('is-invalid')){
      courseDescription.classList.replace('is-invalid', 'is-valid')
    }
    courseDescription.classList.add('is-valid')
    desAlert.style.display = 'none'
  }else{
    isDescriptionValid = false
    desAlert.style.display = 'block'
    if (courseDescription.classList.contains('is-valid')){
      courseDescription.classList.replace('is-valid', 'is-invalid')
    }
    courseDescription.classList.add('is-invalid')
  }

  checkInputs();
}
var capAlert = document.getElementById("capAlert")
capAlert.style.display = 'none'
// CAPACITY -- 2-3 -- NUMBERS -- REGEX /^[0-9]{2,3}$/
courseCapacity.onkeyup = function(){
  isCapacityValid = true
  var pattern = /^[0-9]{2,3}$/
  if (pattern.test(courseCapacity.value)){
    if (courseCapacity.classList.contains('is-invalid')){
      courseCapacity.classList.replace('is-invalid', 'is-valid')
    }
    courseCapacity.classList.add('is-valid')
    capAlert.style.display = 'none'
  }else{
    isCapacityValid = false
    capAlert.style.display = 'block'
    if (courseCapacity.classList.contains('is-valid')){
      courseCapacity.classList.replace('is-valid', 'is-invalid')
    }
    courseCapacity.classList.add('is-invalid')
  }

  checkInputs();
}

