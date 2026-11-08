const loadButton = document.querySelector("#load-users");
const filterInput = document.querySelector("#filter-input");
const statusMessage = document.querySelector("#status");
const usersList = document.querySelector("#users-list");

let users = [];

function renderUsers(list) {
  usersList.replaceChildren();

  list.forEach((user) => {
    const item = document.createElement("li");
    const name = document.createElement("h2");
    const email = document.createElement("p");
    const city = document.createElement("p");
    const company = document.createElement("p");

    name.textContent = user.name;
    email.textContent = `Email: ${user.email}`;
    city.textContent = `City: ${user.address.city}`;
    company.textContent = `Company: ${user.company.name}`;

    item.append(name, email, city, company);
    usersList.appendChild(item);
  });
}

async function loadUsers() {
  loadButton.disabled = true;
  statusMessage.textContent = "Loading users...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    users = await response.json();
    const filterText = filterInput.value.trim().toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(filterText)
    );

    renderUsers(filteredUsers);

    if (filteredUsers.length === 0) {
      statusMessage.textContent = "No users match your filter.";
    } else {
      statusMessage.textContent = `Loaded ${users.length} users. Showing ${filteredUsers.length}.`;
    }
  } catch (error) {
    users = [];
    renderUsers([]);
    statusMessage.textContent = "Could not load users. Please try again.";
    console.error("Error loading users:", error);
  } finally {
    loadButton.disabled = false;
  }
}

loadButton.addEventListener("click", loadUsers);

filterInput.addEventListener("input", () => {
  const filterText = filterInput.value.trim().toLowerCase();
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filterText)
  );

  renderUsers(filteredUsers);

  if (filteredUsers.length === 0) {
    statusMessage.textContent = "No users match your filter.";
  } else {
    statusMessage.textContent = `Showing ${filteredUsers.length} of ${users.length} users.`;
  }
});
