# Project Customer Management | Full stack app

## Description

This project is a full-stack application developed using a combination of Express, React, and MySQL. It's designed to manage customers in an efficient and user-friendly manner

## Stack

### Frontend
- React
- TypeScript
- React Router
- Mantine

### Backend
- Express
- TypeScript
- JWT
- MySQL

## Features
- Synthesis of data for a database including a table of clients and a table of users
- Creation of interface for access to synthesized data: form for authorization by login/password pair, registration
- Adding a new client to the database
- Possibility to change client status by user

## How To Use

```bash
# Clone the repository
git clone https://github.com/YaroslavFd/CustomerManagement.git

# Navigate into the server directory
cd ./server

# Install server dependencies
npm install
# or
yarn

# Before running the server, make sure to create a local MySQL database for this project
# The structure of the tables is already provided, you just need to create the database
# Optionally, you may need to update the database connection details in your .env file

# Run the server
npm run dev
# or
yarn dev

# Now navigate into the client directory
cd ../client

# Install client dependencies
npm install
# or
yarn

# Run the client
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
