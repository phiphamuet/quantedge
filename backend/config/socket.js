const CronJob = require('cron').CronJob;
const Store = require('../mock/store');
const SocketIO = require('socket.io');

module.exports = (httpServer) => {
  const io = SocketIO(httpServer);
  const cronJob = new CronJob('*/5 * * * * *', () => {
    Store.map(store =>
      store.tick()
    );
    Store.sort((a, b) => b.value - a.value);
    io.emit('event', {
      gainer: Store.slice(0, 20),
      loser: Store.slice(-20),
    });
  }, null, true, 'America/Los_Angeles');

  io.on('connection', (client) => {
    client.on('event', (data) => {
      console.log(data);
    });

    client.emit('event', {
      gainer: Store.slice(0, 20),
      loser: Store.slice(-20),
    });

    client.on('disconnect', (data) => {
      console.log(data);
    });
  });
};

