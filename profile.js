async function fetchUserDetailsById(userId) {
  try {
    const response = await fetch("https://panorbit.in/api/users.json");
    const data = await response.json();

    const user = data.users.find((user) => user.id == userId);
    return user;
  } catch (err) {
    console.log("Error while fetching User Details:", err);
    return null;
  }
}

async function displayUserProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");

  if (userId) {
    const user = await fetchUserDetailsById(userId);

    // console.log(userId, "data----");
    if (user) {
      //localStorage.setItem("lastClickedId", userId);
      const profileContainer = document.querySelector(".profile-container");

      profileContainer.innerHTML = `
   
   

        <div class="profile-cont">
        <div class="profile-heading">
          <h2 class="txt-col">Profile</h2>
          <div class="profile-header">
            <img
              src="${user.profilepicture}"
              class="move imgs"
              width="30px"
              alt="Profile Picture"
              onclick="toggleUserDetails()"
            />
          </div>
        </div>
      </div>

      
        <!-- Modal popup container for user details -->
        <div class="modal cont move2" id="userDetailsModal">
          <div class="modal-content">
            <span class="close" onclick="toggleUserDetails()"></span>
      
            <div class="user-info">
      <img src="${user.profilepicture}" class="image" alt="${user.name}" width="50px" />
      <h3 class="namess">${user.name}</h3>
    </div>
    <div class="button-container">
    <button onclick="redirectToLandingPage()">Sign Out</button>
    </div>
          </div>
        </div>
        <hr class = "top">
          <div class="content">
          <div>
          <img src="${user.profilepicture}" class = "img"alt="${user.name}" width="250px" />
          <h2 class = "name">${user.name}</h2>
        </div>
         
          <div class="row">
          <p>
          <div class = "col">UserName : </div>
          <div class="value">  ${user.username} </div>
          </p>
          </div>
          <div class="row">
          <p>
          <div class = "col">Email :</div>
          <div class="value"> ${user.email} </div>
          </p>
          </div>
          <div class="row">
          <p>
          <div class = "col">Phone :</div>
          <div class="value"> ${user.phone} </div>
          </p>
          </div>
        
          <div class="row">
          <p>
          <div class = "col">Website : </div>
          <div class="value"> ${user.website} </div>
          </p>
          </div>
     
<hr>

<h3 class = "names col">Company</h3>
<div class="row">
          <p>
          <div class = "col">Name :</div>
          <div class="value"> ${user.company.name} </div>
          </p>
          </div>

          <div class="row">
          <p>
          <div class = "col">catchphrase : </div>
          <div class="value">  ${user.company.catchPhrase} </div>
          </p>
          </div>


          <div class="row">
          <p>
          <div class = "col">bs :</div>
          <div class="value">  ${user.company.bs} </div>
          </p>
          </div>

</div>
<div class="vl">

<h3 class = "names col">Address :</h3>
<div class="vl-content">
<div>
<div class="row">
<p>
<div class = "col">Street :</div>
<div class="value">  ${user.address.street} </div>
</p>
</div>
<div>
<div class="row">
<p>
<div class = "col">Suite :</div>
<div class="value">  ${user.address.suite} </div>
</p>
</div>
<div class="row">
<p>
<div class = "col">City :</div>
<div class="value">  ${user.address.city} </div>
</p>
</div>
<div class="row">
<p>
<div class = "col">Zipcode :</div>
<div class="value">  ${user.address.zipcode} </div>
</p>
</div>

</div>

</div>
</div>
<div id="map">
</div>

        `;
      if (user.address.geo && user.address.geo.lat && user.address.geo.lng) {
        displayUserMap(user.address.geo.lat, user.address.geo.lng);
      }
    } else {
      const profileContainer = document.querySelector(".profile-container");
      profileContainer.innerHTML = "<p>User not found.</p>";
    }
  } else {
    const profileContainer = document.querySelector(".profile-container");
    profileContainer.innerHTML = "<p>Invalid profile URL.</p>";
  }
}

function displayUserMap(latitude, longitude) {
  const map = L.map("map").setView([latitude, longitude], 1);

  // Add a map tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "",
  }).addTo(map);

  // Add a marker for the user's location
  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup("User Location")
    .openPopup();
}

function displayComingSoon(option) {
  const profileContainer = document.querySelector(".profile-container");
  // profileContainer.innerHTML = `<h1>Coming soon</h1>`;
  if (option === "Posts") {
    profileContainer.innerHTML = `
    
    <div>
              <h2 class = "txt-col">Posts</h2>
              <hr class = "top">
              <div class="coming-soon">
              <h1>Coming Soon</h1>
            </div>
            
    </div>
    
            `;
  } else if (option === "Gallery") {
    profileContainer.innerHTML = `
    <div>
              <h2  class = "txt-col">Gallery</h2>
              <hr class = "top">
              <div class="coming-soon">
              <h1>Coming Soon</h1>
            </div>
            
    </div>
    
            `;
  } else if (option == "ToDo") {
    profileContainer.innerHTML = `
    <div>
              <h2  class = "txt-col">ToDo</h2>
              <hr class = "top">
              <div class="coming-soon">
              <h1>Coming Soon</h1>
            </div>
            
    </div>
    
            `;
  }
}

function showUserDetails() {
  const userDetailsDiv = document.getElementById("userDetails");

  if (userDetailsDiv.classList.contains("hidden")) {
    // Show user details if it's hidden
    userDetailsDiv.classList.remove("hidden");
    // Call the function to fetch and display user details
    displayUserDetails();
  } else {
    // Hide user details if it's visible
    userDetailsDiv.classList.add("hidden");
  }
}

function toggleUserDetails() {
  const modal = document.getElementById("userDetailsModal");
  modal.classList.toggle("active");
}

// Close the modal when clicking outside of it
window.addEventListener("click", function (event) {
  const modal = document.getElementById("userDetailsModal");
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});
// ... Rest of your JavaScript code ...

// Function to redirect to the Landing page on Sign Out
function redirectToLandingPage() {
  window.location.href = "index.html";
}
document.addEventListener("DOMContentLoaded", displayUserProfile);
