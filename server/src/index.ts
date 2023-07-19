import http from 'http';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5050;
const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'})

        res.write(
            '<h1>HomePage</h1>'
            )


        res.end()
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html' 
        }
        )

        res.write(
            '<h1>404 Not Found</h1>'
            )
        res.end()
    }
});

server.listen(PORT);
