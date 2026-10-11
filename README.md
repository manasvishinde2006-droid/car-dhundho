# Car Dhundho

## Project Description
Car Dhundho is a used car website developed using Node.js and Express that allows users to browse used cars, filter them by brand, fuel and budget, calculate EMI, view verified dealers, create an account, sign in and send enquiries.

**Live Website:** https://car-dhundho.onrender.com

## Technologies Used
- Node.js
- Express.js
- HTML
- CSS
- JavaScript
- JSON file storage
- JWT Authentication
- GitHub
- Render (hosting)

## Features
- User Registration & Sign In
- Car Inventory with 12 used cars
- Search and Filters (brand, fuel, body type, budget)
- Sort by Price
- EMI Calculator
- Dealer Directory with Call and Enquiry options
- Contact / Enquiry Form
- Health & Support Page
- Responsive Design

## Project Structure
```
car-dhundho backend
├── server.js
├── package.json
└── public
    ├── index.html
    ├── inventory.html
    ├── dealers.html
    ├── contact.html
    ├── support.html
    ├── css
    ├── js
    └── images
```

## How to Run
1. Install Node.js (LTS) from nodejs.org
2. Download or clone this project
3. Open the project folder in a terminal
4. Run the following commands:
```
npm install
npm start
```
5. Open http://localhost:3000 in your browser

## Data Storage
User accounts are saved in `data/users.json` and enquiries in `data/enquiries.json`. Both files are created automatically when the server runs. Passwords are stored in hashed form.

## Author
Manasvi Shinde
T.Y.B.Sc. Computer Science, D. G. Ruparel College, Mumbai