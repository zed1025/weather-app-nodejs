//basics of asynchronous non-blocking programming

console.log('Starting app...');

setTimeout(() => {
    console.log('Inside of callback');
}, 2000);

setTimeout(() => {
    console.log('Inside of Second callback');
}, 0);


console.log('closing app...');