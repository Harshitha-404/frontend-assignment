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
    console.log(userId, "data----");
    if (user) {
      const profileContainer = document.querySelector(".profile-container");
      // <h1>Coming soon</h1>`;
    }
  }
}
// function displayComingSoon() {
//   const profileContainer = document.querySelector(".profile-container");
//   // profileContainer.innerHTML = `<h1>Coming soon</h1>`;
//   profileContainer.innerHTML = `
// <div>
//           <h2>Gallery</h2>
//           <hr class = "top">
//           <div class="coming-soon">
//           <h1>Coming Soon</h1>
//         </div>

// </div>

//         `;
// }
document.addEventListener("DOMContentLoaded", displayUserProfile);
