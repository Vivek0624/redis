# Redis Caching with Express

This is a simple Express server that demonstrates how to use Redis for caching API data. The server provides an endpoint to fetch photos data from an external API and caches the data in Redis for faster retrieval.

## Prerequisites

Before running the server, make sure you have the following installed on your system:

1. Node.js
2. Redis

## Installation

1. Clone the repository or download the code files.
2. Install the required dependencies by running the following command in the project directory:

```bash
npm install
```

## Usage

1. Start the Redis server on your local machine by running the following command:

```bash
redis-server
```

2. To start the Express server, run the following command:

```bash
npm start
```

The server will start running on port 3000. You can access the API at `http://localhost:3000/photos`.

## Redis CLI and Commands

To interact with Redis using the Redis CLI, follow these steps:

1. Start the Redis server (if not already running) with the `redis-server` command.

2. Open a new terminal window and run the following command to start the Redis CLI:

```bash
redis-cli
```

3. Once you are inside the Redis CLI, you can use various commands to interact with the Redis database. For example:

- To see all keys in the Redis database, use the `keys *` command:

```bash
127.0.0.1:6379> keys *
```

- To get the value of a specific key, use the `get` command followed by the key name:

```bash
127.0.0.1:6379> get photos
```

Remember that the keys and values stored in Redis are stored in memory and will persist until the Redis server is restarted or the data expires based on the expiration settings.

## Endpoints

### GET /photos

This endpoint fetches photos data from an external API. It accepts an optional `albumId` query parameter to filter photos by album. The photos data is cached in Redis for faster retrieval.

## How It Works

The Express server uses the `axios` library to make API requests to `https://jsonplaceholder.typicode.com/photos`. When a request is made to the `/photos` endpoint, the server first checks if the data is available in the Redis cache. If the data is found in the cache, it is returned immediately. Otherwise, the server fetches the data from the external API, stores it in the Redis cache with a default expiration time of 1 hour, and then returns the data to the client.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code as per your requirements.