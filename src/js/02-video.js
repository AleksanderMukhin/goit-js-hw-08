import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

// при першому завантаженні у нас немає збережених секунд тому додаємо 
// у сет Каррент Тайм або те що є у стореджі або 0 ==================
const currentTime = localStorage.getItem('videoplayer-current-time');
if (!currentTime) {
  localStorage.setItem('videoplayer-current-time', 0);
};
//=============================================

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds }) {
  localStorage.setItem('videoplayer-current-time', Math.round(seconds));
};

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
