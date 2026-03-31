const pw = document.getElementById('pw');
const gate = document.getElementById('gate');
const player = document.getElementById('player');
const audio = new Audio('cancion-gtanna.wav');
const playBtn = document.getElementById('playBtn');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const seekWrap = document.getElementById('seekWrap');
const seekFill = document.getElementById('seekFill');
const cur = document.getElementById('cur');
const dur = document.getElementById('dur');

const pwError = document.getElementById('pwError');

pw.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (pw.value === 'gtanna') {
      gate.style.display = 'none';
      player.style.display = 'flex';
    } else {
      pwError.style.display = 'block';
    }
  } else {
    pwError.style.display = 'none';
  }
});

function fmt(s) {
  if (isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + String(sec).padStart(2, '0');
}

playBtn.addEventListener('click', () => {
  if (audio.paused) { audio.play(); } else { audio.pause(); }
});

audio.addEventListener('play', () => { iconPlay.style.display = 'none'; iconPause.style.display = 'block'; });
audio.addEventListener('pause', () => { iconPlay.style.display = 'block'; iconPause.style.display = 'none'; });

audio.addEventListener('loadedmetadata', () => { dur.textContent = fmt(audio.duration); });
audio.addEventListener('timeupdate', () => {
  cur.textContent = fmt(audio.currentTime);
  seekFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
});

seekWrap.addEventListener('click', e => {
  const ratio = e.offsetX / seekWrap.offsetWidth;
  audio.currentTime = ratio * audio.duration;
});
