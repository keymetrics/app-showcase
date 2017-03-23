
var pmx = require('pmx');

pmx.action('scrap_url', function(reply) {
  // Decrement the previous counter
  MAINTENANCE_MODE = !MAINTENANCE_MODE;
  reply({maintenance_mode : MAINTENANCE_MODE});
});
