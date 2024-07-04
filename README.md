# News API

A simple REST API for news using Node.js, Koa, and MongoDB.

## Requirements

- Docker
- Docker Compose

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/news-api.git
   ```
    then navigate to it

   ```bash
   cd news-api
   ```

2. Build and start the Docker containers:
   ```bash
    docker-compose up --build
    ```
3. The API will be accessible at http://localhost:3000.

## API Endpoints

- `GET /news`: Get all news articles (supports filtering and sorting).
- `GET /news/:id`: Get a news article by ID.
- `POST /news`: Create a new news article.
- `PUT /news/:id`: Update a news article by ID.
- `DELETE /news/:id`: Delete a news article by ID.

## Testing
You can use Swagger's interactive UI to test the API endpoints by navigating to http://localhost:3000/docs

Alternatively you can use tools like Postman or Curl to test the API endpoints.

Example using Curl:

- Get all news
   ```bash
    curl -X GET http://localhost:3000/news
  ```

- Create a news article
  ```bash
    curl -X POST http://localhost:3000/news -H "Content-Type: application/json" -d '{"date":"2024-06-26","title":"New Article","shortDescription":"This is a short description","text":"This is the full text"}'
   ```