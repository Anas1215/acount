Elements
var email = document.getElementById("email");
var password = document.getElementById("password");
var user_email = document.getElementById("user_email");
var login_container = document.getElementById("login_container");
var home_container = document.getElementById("home_container");
var note = document.getElementById("note");
var list = document.getElementById("list");

function loginUser() {
  // Check if email and password are provided
  if (!email.value || !password.value)
    return alert("Please add email and password.");

  // Save email to localStorage
  localStorage.setItem("email", email.value);

  // Check if user is logged in
  checkIsUserLogin();
}

function checkIsUserLogin() {
  // Get email from localStorage
  var email = localStorage.getItem("email");

  // If email exists, show home container and hide login container
  if (email) {
    login_container.classList.add("hidden");
    home_container.classList.remove("hidden");
    user_email.innerText = email;

    // Display user's notes
    displayUserNotes();
  } else {
    // If email doesn't exist, show login container and hide home container
    login_container.classList.remove("hidden");
    home_container.classList.add("hidden");
  }
}

// Check if user is logged in on page load
checkIsUserLogin();

function logout() {
  // Remove email from localStorage
  localStorage.removeItem("email");

  // Check if user is logged in
  checkIsUserLogin();
}

function submitNote() {
  // Get email from localStorage
  var email = localStorage.getItem("email");

  // Create an object with email and note
  var obj = {
    email: email,
    note: note.value,
  };

  // Save note to localStorage
  saveValueToLocalStorage(obj);

  // Clear the note input field
  note.value = "";
}

function saveValueToLocalStorage(obj) {
  // Get notes from localStorage
  var notes = localStorage.getItem("notes");
  console.log("notes from local storage=>", notes);

  if (notes) {
    // Parse notes if they exist and add new note
    notes = JSON.parse(notes);
    notes.push(obj);
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  } else {
    // If no notes exist, create a new array with the note
    notes = [obj];
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Display user's notes
  displayUserNotes();
}

function displayUserNotes() {
  // Get notes from localStorage
  var notes = localStorage.getItem("notes");
  var currentUserEmail = localStorage.getItem("email");

  if (notes) {
    // Clear the list
    list.innerHTML = "";
    notes = JSON.parse(notes);
    console.log(notes);

    // Display notes for the current user
    notes.forEach(function (data, ind) {
      console.log("data=>", data);
      if (data.email === currentUserEmail) {
        var liElement = ` <li class="note">
        <p>${data.note}</p> 
            <p><small>${data.email}</small></p>
          </li>`;
        list.innerHTML += liElement;
      }
    });
  }
}

// Display user's notes on page load
displayUserNotes();