"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoom = void 0;
var UserRoom = /** @class */ (function () {
    function UserRoom(firstPlayer, secondPlayer) {
        this.firstPlayer = firstPlayer;
        this.secondPlayer = secondPlayer;
        this.firstPlayer.isHavePair = true;
        this.secondPlayer.isHavePair = true;
        this.initListner();
    }
    UserRoom.prototype.initListner = function () {
        var _this = this;
        this.firstPlayer.on('message', function (message) {
            _this.secondPlayer.send(message);
        });
        this.secondPlayer.on('message', function (message) {
            _this.firstPlayer.send(message);
        });
        this.firstPlayer.on('close', function () {
            _this.secondPlayer.send('disconnected');
        });
        this.secondPlayer.on('close', function () {
            _this.firstPlayer.send('disconnected');
        });
    };
    return UserRoom;
}());
exports.UserRoom = UserRoom;
//# sourceMappingURL=user-room.js.map