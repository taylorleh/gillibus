/**
 * Created by taylor on 3/18/17.
 */
let customers = {};
let drivers = {};


let len = (obj) => {
  return Object.keys(obj).length;
};

let sendStaticToGroup = (group, message, channel) => {
  channel.emit(message);
};

module.exports = (io)  => {

  let driverChannel = io.of('/driver');
  let customerChannel = io.of('/customer');


  driverChannel.on('connection', client => {
    if(len(drivers) === 0) {
      sendStaticToGroup(customers,'yes buses', customerChannel)
    }

    if(!drivers[client.id]) {
      drivers[client.id] = client;
    }

    client.on('disconnect', () => {
      delete drivers[client.id];
      (len(drivers) === 0) && sendStaticToGroup(customers, 'no buses', customerChannel)
    });

    client.on('driver location', locations => {
      customerChannel.emit('bus location', locations);
    });
  });


  customerChannel.on('connection', client => {
    customers[client.id] = client;

    if(len(drivers) === 0) {
      client.emit('no buses');
    }

    client.on('disconnect', client => {

    });
  });


};
