let allUsers = [];
const userList = document.getElementById('user-list');
const filterBox = document.getElementById('filter');
const statusEl = document.getElementById('status');

async function loadUsers() {
  statusEl.textContent = "Loading...";
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Failed to fetch');
    const users = await response.json();
    allUsers = users;
    renderUsers(allUsers);
  } catch (error) {
    statusEl.textContent = `Error: ${error.message}`;
    userList.innerHTML = "";
  } finally {
    if (statusEl.textContent === "Loading...") {
      statusEl.textContent = "";
    }
  }
}

function renderUsers(list) {
  userList.innerHTML = "";
  if (list.length === 0) {
    userList.innerHTML = "<p>No users match your filter.</p>";
    return;
  }
  list.forEach(user => {
    const div = document.createElement('div');
    div.className = "user-card";
    div.innerHTML = `<strong>${user.name}</strong><br>${user.email}`;
    userList.appendChild(div);
  });
}

filterBox.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allUsers.filter(u => u.name.toLowerCase().includes(term));
  renderUsers(filtered);
});

// Initial load
loadUsers();

// 5. To test error path, temporarily change URL to: https://jsonplaceholder.typicode.com/invalid-users