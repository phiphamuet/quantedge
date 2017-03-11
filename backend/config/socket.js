const CronJob = require('cron').CronJob;

module.exports = (httpServer) => {
    const Store = require('../mock/store');
    const SocketIO = require('socket.io');
    const io = SocketIO(httpServer);
    new CronJob('*/5 * * * * *', function() {
        console.log('Refresh');
        for (let i of Store) {
            i.tick();
        }
        io.emit('event', Store);
    }, null, true, 'America/Los_Angeles');
    io.on('connection', (client) => {
        console.log('something connect to socket server');
        client.on('event', (data) => {
            console.log(data);
        });

        client.emit('event', Store);

        client.on('disconnect', (data) => {
            console.log(data);
        });
    });
}