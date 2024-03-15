let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
let nameInputTouched;
let ageInputTouched;
let passInputTouched;
let repassInputTouched;
let emailInputTouched;
let phoneInputTouched;

//^ Start Loading Screen Action
$(document).ready(() => {
  starting("").then(() => {
    $(".loading-screen").fadeOut(300);
    $("body").css("overflow", "visible");
    $(".inner-loading-screen").fadeOut(300);
  });
});
//^ End Loading Screen Action

//* Start Side Navbar Action
closeNav();
function openNav() {
  $(".sideNavBar").animate({ left: 0 }, 500);
  $(".open-close").removeClass("d-block").addClass("d-none");
  $(".close").removeClass("d-none").addClass("d-block");
  for (let i = 0; i < 5; i++) {
    $(".links ul li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}
function closeNav() {
  let width = $(".sideNavBar .sideNavBarContent").outerWidth();
  $(".sideNavBar").animate({ left: -width }, 500);
  $(".open-close").removeClass("d-none").addClass("d-block");
  $(".close").removeClass("d-block").addClass("d-none");
  $(".links ul li").animate({ top: 300 }, 500);
}

$(".sideNavBar .open-close").click(function () {
  if ($(".sideNavBar").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});
//* End Side Navbar Action

//^ Start SearchByName Action

// Add an event listener to the logo image
document.querySelector(".logo").addEventListener("click", function () {
  $(".inner-loading-screen").fadeIn(100);
  starting("");
  $(".inner-loading-screen").fadeOut(300);
});

async function starting(name) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  response = await response.json();
  displayMeals(response.meals);
  console.log(response.meals);
}
function displayMeals(items) {
  let box = "";
  for (let i = 0; i < items.length; i++) {
    box += `<div class="col-md-3 ">
    <div onclick="getMealDetails('${items[i].idMeal}')" class="meal-card text-center position-relative overflow-hidden">
      <img
        src=${items[i].strMealThumb}
        class="w-100"
        alt=""
      />
      <div
        class="position-absolute d-flex align-items-center justify-content-center meal-card-layer"
      >
        <h3 class="p-2">${items[i].strMeal}</h3>
      </div>
    </div>
  </div>`;
  }
  rowData.innerHTML = box;
}

//^ End SearchByName Action

// Start Display Categories
async function getCategories() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(100);
  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  console.log(response.categories);
  displayCategories(response.categories);
  $(".inner-loading-screen").fadeOut(300);
}

function displayCategories(items) {
  let box = "";
  for (let i = 0; i < items.length; i++) {
    box += `<div class="col-md-3 mb-4">
    <div onclick="getCategoryMeals('${
      items[i].strCategory
    }')" class="meal-card position-relative overflow-hidden">
      <img
        src=${items[i].strCategoryThumb}
        class="w-100"
        alt=""
      />
      <div
        class="position-absolute text-center meal-card-layer"
      >
        <h3>${items[i].strCategory}</h3>
        <p>${items[i].strCategoryDescription
          .split(" ")
          .slice(0, 20)
          .join(" ")}</p>
      </div>
    </div>
  </div>`;
  }
  rowData.innerHTML = box;
}
// End Display Categories

//& Start Display Area
async function getArea() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(100);
  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayArea(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}
function displayArea(items) {
  let box = "";
  for (let i = 0; i < items.length; i++) {
    box += `<div class="col-md-3 mb-4">
                <div onclick="getAreaMeals('${items[i].strArea}')" class="meal-card areaCard text-center overflow-hidden">
                  <i class="fa-solid fa-earth-americas fa-xl mb-2"></i>
                  <h3>${items[i].strArea}</h3>
                </div>
            </div>`;
  }
  rowData.innerHTML = box;
}
//& End Display Area

//^ Start Ingredients
async function getIngredients() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(100);
  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  console.log(response.meals);
  displayIngredients(response.meals.slice(0, 25));
  $(".inner-loading-screen").fadeOut(300);
}
function displayIngredients(items) {
  let box = "";
  for (let i = 0; i < items.length; i++) {
    box += `<div class="col-md-3 mb-4">
                <div onclick="getIngredientsMeals('${
                  items[i].strIngredient
                }')" class="meal-card areaCard text-center overflow-hidden">
                  <i class="fa-solid fa-bowl-food fa-2x mb-2"></i>
                  <h3>${items[i].strIngredient}</h3>
                  <p>${items[i].strDescription
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}</p>
                </div>
            </div>`;
  }
  rowData.innerHTML = box;
}
//^ End Ingredients

//! Start Get Category Meals
async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(100);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}
//! End Get Category Meals

// Start Area Meals
async function getAreaMeals(area) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(100);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 25));
  $(".inner-loading-screen").fadeOut(300);
}
// End Area Meals

//& Start Ingredients Meals
async function getIngredientsMeals(ingredients) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(100);
  searchContainer.innerHTML = "";

  if (typeof ingredients === "string") {
    ingredients = [ingredients];
  }
  let queryString = ingredients
    .map((ingredient) => `i=${ingredient}`)
    .join("&");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?${queryString}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}

//& End Ingredients Meals

// Start Meal Instructions
async function getMealDetails(mealID) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(100);
  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  response = await response.json();
  // displayMeals(response.meals[0]);
  displayMealDetails(response.meals[0]);
  $(".inner-loading-screen").fadeOut(300);
}
function displayMealDetails(meal) {
  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert-danger alert">${meal[`strMeasure${i}`]}${
        meal[`strIngredient${i}`]
      }</li>`;
      // ingredients.push(meal[`strIngredient${i}`]);
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) {
    tags = [];
  }
  let tagsDisplayed = "";
  for (let i = 0; i < tags.length; i++) {
    tagsDisplayed += `<li class="alert-secondary alert">${tags[i]}</li>`;
  }

  let box = `<div class="col-md-4 mt-md-5">
  <img
    src="${meal.strMealThumb}"
    class="w-100 ingredientImg"
    alt=""
  />
  <h2 class="text-center m-3">${meal.strMeal}</h2>
</div>
<div class="col-md-8">
  <h2 class="text-center mb-3">Instructions</h2>
  <p>
    ${meal.strInstructions}
  </p>
  <h4><span class="fw-bolder">Area: </span> ${meal.strArea}</h4>
  <h4><span class="fw-bolder">Category: </span> ${meal.strCategory}</h4>
  <h4 class="fw-bolder">Recipes:</h4>
  <ul class="list-unstyled">
  ${ingredients}
  </ul>
  <h4 class="fw-bolder">Tags:</h4>
  <ul class="list-unstyled">
    ${tagsDisplayed}
  </ul>
  <div class="btns text-center">
    <a target="_blank" href="${meal.strSource}" class="sourceBtn">Source</a>
    <a target="_blank" href="${meal.strYoutube}" class="youtubeBtn">Youtube</a>
  </div>
</div>`;
  rowData.innerHTML = box;
}
// End Meal Instructions

//! Start Seach
function showSearchInputs() {
  searchContainer.innerHTML = `<div class="row py-5">
      <div class="col-md-6">
        <input
          type="text"
          class="form-control bg-transparent mb-3 mb-md-0"
          placeholder="Search by name..."
          onkeyup="searchByName(this.value)" 
        />
      </div>
      <div class="col-md-6">
        <input
          type="text"
          class="form-control bg-transparent"
          placeholder="Search by first letter..."
          onkeyup="searchByFirstLetter(this.value)"
          oninput="handleInput(this)"
          
        />
      </div>
    </div>`;
  rowData.innerHTML = "";
}
function handleInput(input) {
  input.value = input.value.replace(/[^a-zA-Z]/, "").slice(0, 1);
}
async function searchByName(item) {
  $(".inner-loading-screen").fadeIn(100);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}
async function searchByFirstLetter(item) {
  $(".inner-loading-screen").fadeIn(100);
  // if there is no input char, make the default (a)
  item == "" ? "a" : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}
//! End Search

//^ Start Contact Us Action
function showContactUs() {
  searchContainer.innerHTML = "";
  rowData.innerHTML = `
  <section class="contact-us text-center">
      <div class="min-vh-100 d-flex align-items-center justify-content-center">
        <div class="container w-75">
          <div class="row">
            <div class="col-md-6 mb-4">
              <input
                type="text"
                class="form-control"
                name="name"
                id="name"
                placeholder="Enter Your Name..."
                onkeyup="inputsValidation()"
              />
              <div id="nameAlert" class="alert alert-danger mt-2 d-none">
                Special characters and numbers not allowed
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <input
                type="email"
                class="form-control"
                name="email"
                id="email"
                placeholder="Enter Your Email..."
                onkeyup="inputsValidation()"
              />
              <div id="emailAlert" class="alert alert-danger mt-2 d-none">
                Email not valid, ex: noura@gmail.com
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <input
                type="tel"
                class="form-control"
                name="phone"
                id="phone"
                placeholder="Enter Your Phone Number..."
                onkeyup="inputsValidation()"
              />
              <div id="phoneAlert" class="alert alert-danger mt-2 d-none">
                Phone number not valid
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <input
                type="number"
                class="form-control"
                name="age"
                id="age"
                min="5"
                onkeyup="inputsValidation()"
                placeholder="Enter Your Age..."
              />
              <div id="ageAlert" class="alert alert-danger mt-2 d-none">
                Age not valid
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <input
                type="password"
                class="form-control"
                name="password"
                id="password"
                placeholder="Enter Your Password..."
                onkeyup="inputsValidation()"
              />
              <div id="passAlert" class="alert alert-danger mt-2 d-none">
                Password must at least has 8 characters, at least 1 alphabetical and 1 digit
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <input
                type="password"
                class="form-control"
                name="re-password"
                id="re-password"
                placeholder="Enter Your rePassword..."
                onkeyup="inputsValidation()"
              />
              <div id="repassAlert" class="alert alert-danger mt-2 d-none">
                Enter the same password 
              </div>
            </div>
          </div>
          <button id="submitBtn" disabled class="submitBtn">Submit</button>
        </div>
      </div>
    </section>
  `;

  nameInputTouched = false;
  phoneInputTouched = false;
  ageInputTouched = false;
  emailInputTouched = false;
  passInputTouched = false;
  repassInputTouched = false;
  submitBtn = document.getElementById("submitBtn");
  document.getElementById("name").addEventListener("focus", () => {
    nameInputTouched = true;
  });
  document.getElementById("age").addEventListener("focus", () => {
    ageInputTouched = true;
  });
  document.getElementById("password").addEventListener("focus", () => {
    passInputTouched = true;
  });
  document.getElementById("re-password").addEventListener("focus", () => {
    repassInputTouched = true;
  });
  document.getElementById("email").addEventListener("focus", () => {
    emailInputTouched = true;
  });
  document.getElementById("phone").addEventListener("focus", () => {
    phoneInputTouched = true;
  });
}

function inputsValidation() {
  //& Start Alerts for inputs
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("name").classList.add("is-valid");
      document.getElementById("name").classList.remove("is-invalid");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("name").classList.add("is-invalid");
      document.getElementById("name").classList.remove("is-valid");
    }
  }

  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("email").classList.add("is-valid");
      document.getElementById("email").classList.remove("is-invalid");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("email").classList.add("is-invalid");
      document.getElementById("email").classList.remove("is-valid");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("phone").classList.add("is-valid");
      document.getElementById("phone").classList.remove("is-invalid");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("phone").classList.add("is-invalid");
      document.getElementById("phone").classList.remove("is-valid");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("age").classList.add("is-valid");
      document.getElementById("age").classList.remove("is-invalid");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("age").classList.add("is-invalid");
      document.getElementById("age").classList.remove("is-ivalid");
    }
  }

  if (passInputTouched) {
    if (passValidation()) {
      document
        .getElementById("passAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("password").classList.add("is-valid");
      document.getElementById("password").classList.remove("is-invalid");
    } else {
      document
        .getElementById("passAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("password").classList.add("is-invalid");
      document.getElementById("password").classList.remove("is-valid");
    }
  }

  if (repassInputTouched) {
    if (repassValidation()) {
      document
        .getElementById("repassAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("re-password").classList.add("is-valid");
      document.getElementById("re-password").classList.remove("is-invalid");
    } else {
      document
        .getElementById("repassAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("re-password").classList.add("is-invalid");
      document.getElementById("re-password").classList.remove("is-valid");
    }
  }
  //& End Alerts for inputs

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passValidation() &&
    repassValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
function nameValidation() {
  var nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
  return nameRegex.test(document.getElementById("name").value);
}
function emailValidation() {
  var emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(document.getElementById("email").value);
}
function phoneValidation() {
  var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(document.getElementById("phone").value);
}
function ageValidation() {
  // allow ages between 1 and 149
  var ageRegex = /^(?:1[0-4][0-9]|[1-9][0-9]|[1-9])$/;
  return ageRegex.test(document.getElementById("age").value);
}

function passValidation() {
  // Is at least 8 characters long.
  // Contains at least one alphabetical character.
  // Contains at least one digit.
  var passRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/;
  return passRegex.test(document.getElementById("password").value);
}
function repassValidation() {
  return (
    document.getElementById("re-password").value ==
    document.getElementById("password").value
  );
}

//^ End Contact Us Action
