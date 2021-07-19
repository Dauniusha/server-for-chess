"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var ws_1 = __importDefault(require("ws"));
var get_random_color_1 = require("./get-random-color");
var user_room_1 = require("./user-room");
var users = [];
var app = express_1.default();
var server = http_1.default.createServer(app);
var webSocketServer = new ws_1.default.Server({ server: server });
webSocketServer.on('connection', function (socket) {
    var extSocket = socket;
    extSocket.isAlive = true;
    extSocket.isHavePair = false;
    users.push(extSocket);
    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
        var user = users_1[_i];
        if (!user.isHavePair && user !== extSocket) {
            var firstPlayerColor = get_random_color_1.getRandomColor();
            var secondPlayerColor = firstPlayerColor === 'white' ? 'black' : 'white';
            extSocket.send(firstPlayerColor);
            user.send(secondPlayerColor);
            extSocket.send('connected');
            user.send('connected');
            new user_room_1.UserRoom(extSocket, user);
            return;
        }
    }
    extSocket.send('loading');
});
server.listen(process.env.PORT || 3000, function () {
    if (server) {
        console.log("Server started on port " + server.address().port);
    }
});
//# sourceMappingURL=server.js.map