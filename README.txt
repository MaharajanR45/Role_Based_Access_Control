Project Overview
This project is an Admin Dashboard for managing users, roles, and permissions in a system using Role-Based Access Control (RBAC) principles. It allows administrators to efficiently manage users, assign roles, define permissions, and edit/delete data. The project data is stored locally using the browser's localStorage.


Features
1. User Management
Add new users with details such as name, email, role, and status.
Edit user information.
Delete users from the system.
View all users in a tabular format.
2. Role Management
Add new roles with custom permissions (e.g., Read, Write, Delete).
Edit existing roles and their permissions.
Delete roles.
Display roles and their permissions in a card layout.
3. Permissions
Dynamically assign permissions to roles (Read, Write, Delete).
Ensure roles dictate the behavior and access control of users.
4. Local Storage
All users, roles, and permissions are stored in localStorage, ensuring persistence between browser sessions.


Technologies Used
HTML: Structure and layout of the dashboard.
CSS: Styling for a clean and responsive design.
JavaScript: Dynamic functionality, data management, and interaction with localStorage.


Installation and Setup
Clone or download this repository to your local machine.
Open the project folder.
Run the project by opening the index.html file in any modern web browser.


Usage
1. Managing Users
To add a user, click "Add User", fill out the form, and submit.
To edit a user, click the "Edit" button in the user's row, modify the details, and save.
To delete a user, click the "Delete" button in the user's row and confirm.
2. Managing Roles
To add a role, click "Add Role", define the name and permissions, and submit.
To edit a role, click the "Edit" button on the role card, modify the name or permissions, and save.
To delete a role, click the "Delete" button on the role card and confirm.