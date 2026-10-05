const loadBtn = document.getElementById('load-users');
const filterInput = document.getElementById('filter-input');
const statusEl = document.getElementById('status');
const usersListEl = document.getElementById('users-list');

let allUsers = [];

function renderUsers(list) {
  usersListEl.innerHTML = '';

  if (list.length === 0) {
    if (allUsers.length > 0) {
      statusEl.textContent = 'No users match your filter.';
    }
    return;
  }

  list.forEach(user => {
    const li = document.createElement('li');
    
    const nameEl = document.createElement('strong');
    nameEl.textContent = user.name;

    const emailEl = document.createElement('span');
    emailEl.textContent = ` - ${user.email}`;

    const cityEl = document.createElement('p');
    cityEl.textContent = `City: ${user.address.city}`;

    const companyEl = document.createElement('p');
    companyEl.textContent = `Company: ${user.company.name}`;

    li.appendChild(nameEl);
    li.appendChild(emailEl);
    li.appendChild(cityEl);
    li.appendChild(companyEl);

    usersListEl.appendChild(li);
  });
}

async function loadUsers() {
  try {
    loadBtn.disabled = true;
    statusEl.textContent = 'Loading users...';
    usersListEl.innerHTML = '';

    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    allUsers = users;

    renderUsers(allUsers);
    statusEl.textContent = `Successfully loaded ${allUsers.length} users.`;

  } catch (error) {
    statusEl.textContent = `Error loading users: ${error.message}`;
  } finally {
    loadBtn.disabled = false;
  }
}

loadBtn.addEventListener('click', loadUsers);

filterInput.addEventListener('input', () => {
  const query = filterInput.value.toLowerCase().trim();
  
  if (allUsers.length === 0) return;

  const filtered = allUsers.filter(user => 
    user.name.toLowerCase().includes(query)
  );

  renderUsers(filtered);

  if (filtered.length > 0 && query) {
    statusEl.textContent = `Showing ${filtered.length} of ${allUsers.length} users.`;
  } else if (filtered.length > 0) {
    statusEl.textContent = `Successfully loaded ${allUsers.length} users.`;
  }
});