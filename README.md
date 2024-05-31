 Real-Time Bidding Platform API

## Setup

1. Clone the repository: git clone https://github.com/Sahil2101/Bidding-Platform-api.git
cd bidding-platform

Install dependencies:

bash
npm install

Set up environment variables in .env file:

plaintext

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=yourusername
DB_PASSWORD=yourpassword
DB_NAME=bidding_platform
JWT_SECRET=yourjwtsecret

Run migrations:

bash
npx sequelize-cli db:migrate

Start the server:
bash
npm start

API Endpoints
Users:

POST /users/register - Register a new user
POST /users/login - Authenticate a user and return a token
GET /users/profile - Get the profile of the logged-in user
Items:

GET /items - Retrieve all auction items (with pagination)
GET /items/:id - Retrieve a single auction item by ID
POST /items - Create a new auction item (Authenticated users, image upload)
PUT /items/:id - Update an auction item by ID (Authenticated users, only item owners or admins)
DELETE /items/:id - Delete an auction item by ID (Authenticated users, only item owners or admins)
Bids:

GET /items/:itemId/bids - Retrieve all bids for a specific item
POST /items/:itemId/bids - Place a new bid on a specific item (Authenticated users)
Notifications:

GET /notifications - Retrieve notifications for the logged-in user
POST /notifications/mark-read - Mark notifications as read
