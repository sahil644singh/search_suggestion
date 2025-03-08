# Product Search Application

## Overview

This is a simple React-based product search application that allows users to search for products, view results, and get suggestions as they type.

The application fetches product suggestions and search results from a backend API.

## Features
- **Search Input:** A search box that accepts user input.
- **Suggestions:** Displays suggested products based on the search query.
- **Loading State:** A loading spinner to indicate when data is being fetched.
- **Error Handling:** Displays error messages when API requests fail.

## Setup and Run Locally

To run the project locally, follow these steps:

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **nodemon** (for auto-reloading the server during development)

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/search_suggestion.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd search_suggestion
    ```

3. **Install dependencies for both the client and server Run the Development server:**

    - For the **client** (React application):

      ```bash
      cd client
      npm install
      npm run dev
      ```

    - For the **server** (backend API):

      ```bash
      cd ../server
      npm install
      nodemon server.js
      ```
    This will start the application on [http://localhost:5173](http://localhost:5173/). The backend API will be running on [http://localhost:3000](http://localhost:3000).


4. **Backend API Setup:**

    This project assumes the existence of a backend API running locally on port 3000 (`http://localhost:3000`). Ensure the backend server is set up and running, providing endpoints like `/suggested` and `/api` for search and suggestion functionality.

    - **Endpoint for Suggestions:** `GET http://localhost:3000/suggested?search=<query>`
    - **Endpoint for Search Results:** `GET http://localhost:3000/api?search=<query>`

5. **Proxy Setup for Development (Optional):**

    To avoid CORS issues when the React client makes API requests to the backend, add the following to the `package.json` in the client directory:

    ```json
    "proxy": "http://localhost:3000"
    ```

    This will allow the frontend to make requests like `fetch('/suggested?search=...')` without any CORS issues.

## Design Decisions

### Proxy Setup:
The proxy setup in the development environment (`package.json`) ensures that requests to the backend API (e.g., `/suggested` or `/api`) are forwarded to the backend server running locally at `http://localhost:3000`. This avoids CORS issues during development and makes the setup simpler, as you don’t need to configure CORS headers on the backend.

### Performance Optimizations:
1. **Debouncing for Search Suggestions:** 
   - The input field triggers an API call to fetch search suggestions as the user types. However, to minimize unnecessary requests, I implemented a **debounce** of 200ms. This means the request will only be sent after the user stops typing for 200ms, reducing the number of API calls.
   
2. **Loading State:** 
   - A loading spinner is displayed while data is being fetched, providing visual feedback to the user. The spinner is shown when the `loading` state is `true` and hidden when the data is loaded or an error occurs.

3. **Error Handling:** 
   - Errors during API requests are caught and displayed to the user in the UI, which improves user experience in case something goes wrong with the request.
