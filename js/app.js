// Initial data
let users = JSON.parse(localStorage.getItem('users')) || [
    { id: 1, name: 'Maharajan', email: 'maharajan@gmail.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Rohit', email: 'rohit@gmail.com', role: 'Editor', status: 'Inactive' }
  ];
  
  let roles = JSON.parse(localStorage.getItem('roles')) || [
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
    { id: 3, name: 'Viewer', permissions: ['Read'] }
  ];
  
  const permissions = ['Read', 'Write', 'Delete'];
  
  // Save data to localStorage
  function saveDataToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('roles', JSON.stringify(roles));
  }
  
  // Load Users
  function loadUsers() {
    const tableBody = document.getElementById('userTable').querySelector('tbody');
    tableBody.innerHTML = '';
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.status}</td>
        <td>
          <button onclick="editUser(${user.id})">Edit</button>
          <button onclick="deleteUser(${user.id})">Delete</button>
        </td>`;
      tableBody.appendChild(row);
    });
  }
  
  // Add User
  function openAddUserModal() {
    openModal(`
      <h3>Add User</h3>
      <form id="addUserForm">
        <label for="userName">Name:</label>
        <input type="text" id="userName" required><br>
        <label for="userEmail">Email:</label>
        <input type="email" id="userEmail" required><br>
        <label for="userRole">Role:</label>
        <select id="userRole">
          ${roles.map(role => `<option value="${role.name}">${role.name}</option>`).join('')}
        </select><br>
        <label for="userStatus">Status:</label>
        <select id="userStatus">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select><br>
        <button type="submit">Add User</button>
      </form>
    `);
  
    document.getElementById('addUserForm').addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('userName').value;
      const email = document.getElementById('userEmail').value;
      const role = document.getElementById('userRole').value;
      const status = document.getElementById('userStatus').value;
  
      const newUser = { id: users.length + 1, name, email, role, status };
      users.push(newUser);
      saveDataToLocalStorage();
      loadUsers();
      closeModal();
    });
  }
  
  // Edit User
  function editUser(userId) {
    const user = users.find(u => u.id === userId);
    openModal(`
      <h3>Edit User</h3>
      <form id="editUserForm">
        <label for="userName">Name:</label>
        <input type="text" id="userName" value="${user.name}" required><br>
        <label for="userEmail">Email:</label>
        <input type="email" id="userEmail" value="${user.email}" required><br>
        <label for="userRole">Role:</label>
        <select id="userRole">
          ${roles.map(role => `<option value="${role.name}" ${role.name === user.role ? 'selected' : ''}>${role.name}</option>`).join('')}
        </select><br>
        <label for="userStatus">Status:</label>
        <select id="userStatus">
          <option value="Active" ${user.status === 'Active' ? 'selected' : ''}>Active</option>
          <option value="Inactive" ${user.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
        </select><br>
        <button type="submit">Save Changes</button>
      </form>
    `);
  
    document.getElementById('editUserForm').addEventListener('submit', e => {
      e.preventDefault();
      user.name = document.getElementById('userName').value;
      user.email = document.getElementById('userEmail').value;
      user.role = document.getElementById('userRole').value;
      user.status = document.getElementById('userStatus').value;
  
      saveDataToLocalStorage();
      loadUsers();
      closeModal();
    });
  }
  
  // Delete User
  function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
      users = users.filter(u => u.id !== userId);
      saveDataToLocalStorage();
      loadUsers();
    }
  }
  
  // Load Roles
  function loadRoles() {
    const rolesList = document.getElementById('rolesList');
    rolesList.innerHTML = '';
    roles.forEach(role => {
      const roleCard = document.createElement('div');
      roleCard.classList.add('role-card');
      roleCard.innerHTML = `
        <h3>${role.name}</h3>
        <p>Permissions: ${role.permissions.join(', ')}</p>
        <button onclick="editRole(${role.id})">Edit</button>
        <button onclick="deleteRole(${role.id})">Delete</button>
      `;
      rolesList.appendChild(roleCard);
    });
  }
  
  // Add Role
  function openAddRoleModal() {
    openModal(`
      <h3>Add Role</h3>
      <form id="addRoleForm">
        <label for="roleName">Role Name:</label>
        <input type="text" id="roleName" required><br>
        <label>Permissions:</label><br>
        ${permissions.map(perm => `
          <label>
            <input type="checkbox" value="${perm}"> ${perm}
          </label><br>
        `).join('')}
        <button type="submit">Add Role</button>
      </form>
    `);
  
    document.getElementById('addRoleForm').addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('roleName').value;
      const selectedPermissions = Array.from(document.querySelectorAll('#addRoleForm input[type="checkbox"]:checked'))
        .map(input => input.value);
  
      const newRole = { id: roles.length + 1, name, permissions: selectedPermissions };
      roles.push(newRole);
      saveDataToLocalStorage();
      loadRoles();
      closeModal();
    });
  }
  
  // Edit Role
  function editRole(roleId) {
    const role = roles.find(r => r.id === roleId);
    openModal(`
      <h3>Edit Role</h3>
      <form id="editRoleForm">
        <label for="roleName">Role Name:</label>
        <input type="text" id="roleName" value="${role.name}" required><br>
        <label>Permissions:</label><br>
        ${permissions.map(perm => `
          <label>
            <input type="checkbox" value="${perm}" ${role.permissions.includes(perm) ? 'checked' : ''}> ${perm}
          </label><br>
        `).join('')}
        <button type="submit">Save Changes</button>
      </form>
    `);
  
    document.getElementById('editRoleForm').addEventListener('submit', e => {
      e.preventDefault();
      role.name = document.getElementById('roleName').value;
      role.permissions = Array.from(document.querySelectorAll('#editRoleForm input[type="checkbox"]:checked'))
        .map(input => input.value);
  
      saveDataToLocalStorage();
      loadRoles();
      closeModal();
    });
  }
  
  // Delete Role
  function deleteRole(roleId) {
    if (confirm('Are you sure you want to delete this role?')) {
      roles = roles.filter(r => r.id !== roleId);
      saveDataToLocalStorage();
      loadRoles();
    }
  }
  
  // Modal Functions
  function openModal(content) {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    modal.innerHTML = `
      <div class="modal-content">
        ${content}
        <button onclick="closeModal()">Close</button>
      </div>
    `;
  }
  
  function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    modal.innerHTML = '';
  }
  
  // Initialize Data
  window.onload = () => {
    loadUsers();
    loadRoles();
  };
  