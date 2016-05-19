
var utils = {
    screenShake: function (FrameWork) {
        FrameWork.game.camera.x = FrameWork.shakeX + FrameWork.game.rnd.integerInRange(-FrameWork.shake, FrameWork.shake);
        FrameWork.game.camera.y = FrameWork.shakeY + FrameWork.game.rnd.integerInRange(-FrameWork.shake, FrameWork.shake);
    },

    setscreenShake: function (FrameWork, time, shake) {
        if (Mazed.Pshaking) {
            FrameWork.shake = shake;
            FrameWork.shaking = true;
            FrameWork.shakeX = FrameWork.game.camera.x;
            FrameWork.shakeY = FrameWork.game.camera.y;
            FrameWork.game.time.events.remove(FrameWork.shakeTimer);
            FrameWork.shakeTimer = FrameWork.game.time.events.add(time, function () {
                FrameWork.shaking = false;
                FrameWork.game.camera.x = FrameWork.shakeX;
                FrameWork.game.camera.y = FrameWork.shakeY;
            });
            navigator.vibrate(time);
        }
    },
};
 
