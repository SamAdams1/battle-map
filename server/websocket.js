const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8080 });
 
wss.on('connection', ws => {
    console.log('Client connected');
 
    ws.on('message', message => {
        const data = JSON.parse(message);
        console.log(`From client ${data.clientId}: ${data.payload}`);
        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                let txt = `Client ${data.clientId} sent -> ${data.payload}`
                client.send(txt);
            }
        });
    });
 
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
