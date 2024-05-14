# NFRDI_Procurement-Frontend

The NFRDI Procurement website is developed using React.js for the frontend, while the backend database is managed using phpMyAdmin.

### Let's get started.

<div style="text-align: center;">
    <div style="display: flex; justify-content: space-between;">
        <img src="https://github.com/Nenjii/NFRDI_ProcurementWebsite-Documentation/blob/main/static/img/Snippets/Node.js_logo.svg" alt="Alt text" width="100" height="100" style="margin-right: 20px;">
        <img src="https://github.com/Nenjii/NFRDI_ProcurementWebsite-Documentation/blob/main/static/img/Snippets/Npm-logo.svg" alt="Alt text" width="100" height="100" style="margin-right: 20px;">
        <img src="https://github.com/Nenjii/NFRDI_ProcurementWebsite-Documentation/blob/main/static/img/Snippets/Javascript_logo.svg" alt="Alt text" width="100" height="100" style="margin-right: 20px;">
        <img src="https://github.com/Nenjii/NFRDI_ProcurementWebsite-Documentation/blob/main/static/img/Snippets/VSCode_logo.svg" alt="Alt text" width="100" height="100" style="margin-right: 20px;">
        <img src="https://github.com/Nenjii/NFRDI_ProcurementWebsite-Documentation/blob/main/static/img/Snippets/Xampp_logo.svg" alt="Alt text" width="100" height="100">
    </div>
</div>

# React.js with PHP Backend Setup Guide

This guide will walk you through setting up your development environment for creating a React.js application with a PHP backend using phpMyAdmin for the database.

## Prerequisites

Before you begin, make sure you have the following software installed on your system:

- [Node.js and npm](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [XAMPP](https://www.apachefriends.org/index.html)

## Installation and Configuration Steps

1. **Node.js and npm Installation:**

   ```bash
   # Verify Node.js installation
   node -v

   # Verify npm installation
   npm -v
   ```

2. **IDE (Visual Studio Code) Installation:**

   Download and install Visual Studio Code from the [official website](https://code.visualstudio.com/).

3. **XAMPP Installation (for PHP and MySQL):**

   Download and install XAMPP from the [official website](https://www.apachefriends.org/index.html). During installation, select Apache, MySQL, and PHP components.

4. **phpMyAdmin Configuration:**

   - Open your web browser and navigate to `http://localhost/phpmyadmin`.
   - Log in with the default username `root` and leave the password field blank.
   - Create a new database by clicking on the "New" button on the left sidebar.

5. **React.js Project Setup:**

   ```bash
   # Create a new React.js project
   npx create-react-app my-app

   # Navigate into the project directory
   cd my-app
   ```

6. **Connecting React.js with PHP and MySQL:**

   Use Axios or Fetch API to make HTTP requests from your React.js frontend to your PHP backend. Use MySQLi or PDO to interact with the MySQL database in your PHP files.

7. **Start Development Server:**

   ```bash
   # Start the development server
   npm start
   ```

   Your React.js application will be accessible in your web browser at `http://localhost:3000`.

## Additional Notes

- Ensure your PHP files are located in the appropriate directory where your XAMPP Apache server can access them (typically the `htdocs` directory in your XAMPP installation folder).

## Troubleshooting

If you encounter any issues during the setup process, feel free to ask for further assistance!
