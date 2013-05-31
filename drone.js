var drone = require('ar-drone'),
    http = require('http'),
    dronestream = require('dronestream'),
    client = drone.createClient();
    // repl = client.createRepl();

var server = http.createServer(function (req, res) {
    require('fs').createReadStream(__dirname + "/index.html").pipe(res);
});

dronestream.listen(server);
server.listen(5555);

client.disableEmergency()
client.takeoff();

client
    .after(5000, function () {
        this.clockwise(0.5);
    })
    .after(2000, function () {
        this.up(1);
    })
    .after(1000, function () {
        this.up(0);
    })
    .after(3000, function () {
        this.animate('flipRight', 150);
    })
    .after(1000, function () {
        this.stop();
        this.land();
    });
