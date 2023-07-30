async function fetchUserDetails() {
  try {
    const response = await fetch("https://panorbit.in/api/users.json");
    const data = await response.json();
    return data.users;
  } catch (err) {
    console.log("Error while fetching User Details:", err);
    return [];
  }
}
function createAccountListItem(user) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
        <div class="account-name">
          <img src="${user.profilepicture}"class="cd-img" alt="${user.name}" width="30" />
          ${user.name}
        </div>
      `;
  return listItem;
}

// Function to populate the account list
// async function populateAccountList() {
//   try {
//     const users = await fetchUserDetails();
//     const accountList = document.querySelector(".account-list");

//     users.forEach((user) => {
//       const listItem = createAccountListItem(user);
//       accountList.appendChild(listItem);
//     });
//   } catch (error) {
//     console.log("Error while populating account list:", error);
//   }
// }

async function populateAccountList() {
  try {
    const users = await fetchUserDetails();
    const accountList = document.querySelector(".account-list");

    users.forEach((user) => {
      const listItem = createAccountListItem(user);
      listItem.addEventListener("click", () => redirectToProfileHome(user.id));
      accountList.appendChild(listItem);
    });
  } catch (error) {
    console.log("Error while populating account list:", error);
  }
}

function redirectToProfileHome(userId) {
  // Assuming the profile home page URL is in the format 'profile.html?id=userId'
  window.location.href = `profile.html?id=${userId}`;
}

// document.addEventListener("DOMContentLoaded", populateAccountList);
document.addEventListener("DOMContentLoaded", () => {
  const accountsContainer = document.querySelector(".account-list-container");
  populateAccountList();
});
