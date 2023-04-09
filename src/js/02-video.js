import throttle from 'lodash.throttle';
import Vimeo from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

const playerSetItem = function (data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.seconds));
};

const secondsItem = JSON.parse(localStorage.getItem(STORAGE_KEY));
const playerGetItem = function (seconds) {
  secondsItem;
};

player.on('timeupdate', throttle(playerSetItem, 1000));

player
  .setCurrentTime(secondsItem)
  .then(playerGetItem)
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
