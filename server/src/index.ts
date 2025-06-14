import server from './server';

server.listen(3002, () => {
    console.log("Server is running on port 3002");
    console.log("http://localhost:3002");
})