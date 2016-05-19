window.onload = function () {
    Mazed.game.state.add('Boot', Mazed.Boot);     
    Mazed.game.state.add('Preloader', Mazed.Preloader);
    Mazed.game.state.add('MainMenu', Mazed.MainMenu);
    Mazed.game.state.add('MoreMenu', Mazed.MoreMenu);
    Mazed.game.state.add('OptionsMenu', Mazed.OptionsMenu);
    Mazed.game.state.add('InfoMenu', Mazed.InfoMenu);
    Mazed.game.state.add('AchievMenu', Mazed.AchievMenu);
    Mazed.game.state.add('GameOver', Mazed.GameOver);
    Mazed.game.state.add('StorageCheck', Mazed.StorageCheck);
    Mazed.game.state.add('LevelReview', Mazed.LevelReview);
    Mazed.game.state.add('Game', Mazed.Game);

    Mazed.game.state.start('Boot');
};