/**
 * Created by taylor on 3/18/17.
 */


module.exports = (io)  => {

  io.on('connection', socket => {
    console.log('GOT A CLIENT');
  })

};
