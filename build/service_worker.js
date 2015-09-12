
navigator.serviceWorker.register('/worker.js').then(function(reg) {
  console.log("Yes", reg);
}, function(err) {
  console.log("No", err);
});
