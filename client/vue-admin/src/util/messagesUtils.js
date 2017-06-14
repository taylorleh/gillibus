/**
 * Created by taylor on 6/10/17.
 */

export let timers = new Map();

export const initVanishingTimers = (message, dispatcher) => {
  if (timers.has(message)) {
    console.error('Attempt to setup vinishing message and already registered');
    return;
  }

  let messageId = setTimeout(() => {
    console.log('settimout handler');
    let openMessage = timers.get(message);
    if (openMessage) {
      timers.delete(message);
      dispatcher('removeMessage', message);
    } else {
      console.error('At end of timeout, could not find message id');
    }
  }, 4000);

  timers.set(message, messageId);
};

