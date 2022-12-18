const net = require('net');
const commandRegex = /(?:\*2\r\n\$4\r\n)(\w*)(?:\r\n\$\d+\r\n)(\w*)/;

// You can use print statements as follows for debugging, they'll be visible when running tests.

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
  // Handle connection

  connection.on('data', (data) => {
    const echoRegexResult = commandRegex.exec(data.toString());
    if (echoRegexResult && echoRegexResult[1] === 'echo') {
      connection.write(`+${echoRegexResult[2]}\r\n`);
    } else {
      connection.write('+PONG\r\n');
    }
  });
});

server.listen(6379, '127.0.0.1');
