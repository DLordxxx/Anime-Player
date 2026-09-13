function demoTrack(n) {
  return `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`;
}

const library = {
  "Философия": {
    color: "#7c6bff",
    emoji: "🌙",
    tracks: [
      { quote: "Сила — это не мышцы, а решение не сдаваться.", source: "заглушка — впиши свою цитату", src: demoTrack(1) },
      { quote: "Путь важнее той точки, куда он ведёт.", source: "заглушка — впиши свою цитату", src: demoTrack(2) },
      { quote: "Страх исчезает, когда ты перестаёшь от него бежать.", source: "заглушка — впиши свою цитату", src: demoTrack(3) },
      { quote: "То, что кажется концом, часто оказывается началом.", source: "заглушка — впиши свою цитату", src: demoTrack(4) },
      { quote: "Мир не спрашивает, готов ли ты — он просто идёт дальше.", source: "заглушка — впиши свою цитату", src: demoTrack(5) },
    ]
  },
  "Романтика": {
    color: "#ff6fa5",
    emoji: "🌸",
    tracks: [
      { quote: "Я узнаю тебя даже среди тысячи голосов.", source: "заглушка — впиши свою цитату", src: demoTrack(6) },
      { quote: "Рядом с тобой даже дождь кажется тёплым.", source: "заглушка — впиши свою цитату", src: demoTrack(7) },
      { quote: "Ты — единственная причина, по которой я оглядываюсь.", source: "заглушка — впиши свою цитату", src: demoTrack(8) },
      { quote: "Некоторые встречи меняют весь дальнейший путь.", source: "заглушка — впиши свою цитату", src: demoTrack(9) },
      { quote: "Обещаю найти тебя в любой из тысячи жизней.", source: "заглушка — впиши свою цитату", src: demoTrack(1) },
    ]
  },
  "Весёлые": {
    color: "#ffc75f",
    emoji: "🎉",
    tracks: [
      { quote: "План был идеальным. Ну, почти.", source: "заглушка — впиши свою цитату", src: demoTrack(2) },
      { quote: "Серьёзность — это временно, а глупости — навсегда.", source: "заглушка — впиши свою цитату", src: demoTrack(3) },
      { quote: "Я не опоздал, я просто эффектно появился позже.", source: "заглушка — впиши свою цитату", src: demoTrack(4) },
      { quote: "Проблема? Отлично, обожаю проблемы по утрам.", source: "заглушка — впиши свою цитату", src: demoTrack(5) },
      { quote: "Побеждать скучно, я предпочитаю делать это красиво.", source: "заглушка — впиши свою цитату", src: demoTrack(6) },
    ]
  },
  "Грустные": {
    color: "#6b8bff",
    emoji: "💧",
    tracks: [
      { quote: "Иногда прощание — это единственное, что остаётся сказать.", source: "заглушка — впиши свою цитату", src: demoTrack(7) },
      { quote: "Я улыбаюсь, чтобы никто не заметил, как тяжело.", source: "заглушка — впиши свою цитату", src: demoTrack(8) },
      { quote: "Пустота после потери не заполняется — с ней просто учишься жить.", source: "заглушка — впиши свою цитату", src: demoTrack(9) },
      { quote: "Некоторые люди уходят, даже оставаясь рядом.", source: "заглушка — впиши свою цитату", src: demoTrack(1) },
      { quote: "Больнее всего вспоминать то, что было хорошо.", source: "заглушка — впиши свою цитату", src: demoTrack(2) },
    ]
  },
  "Ностальгия": {
    color: "#c98bff",
    emoji: "📼",
    tracks: [
      { quote: "Помню это лето так ясно, будто было вчера.", source: "заглушка — впиши свою цитату", src: demoTrack(3) },
      { quote: "Мы думали, что у нас есть всё время на свете.", source: "заглушка — впиши свою цитату", src: demoTrack(4) },
      { quote: "Детство закончилось незаметно, где-то между двумя звонками.", source: "заглушка — впиши свою цитату", src: demoTrack(5) },
      { quote: "Тот двор до сих пор снится мне по ночам.", source: "заглушка — впиши свою цитату", src: demoTrack(6) },
      { quote: "Странно, как старая песня возвращает целую жизнь назад.", source: "заглушка — впиши свою цитату", src: demoTrack(7) },
    ]
  }
};

const categoryNames = Object.keys(library);

// текущее состояние плеера
let currentCategory = categoryNames[0];
let currentIndex = 0;
let isPlaying = false;
let shuffleOn = false;
let repeatOn = false;

// ссылки на элементы страницы
const audio = document.getElementById('audio');
const sidebar = document.getElementById('sidebar');
const playlistEl = document.getElementById('playlist');
const plHeader = document.getElementById('plHeader');
const plCount = document.getElementById('plCount');

const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');

const npCat = document.getElementById('npCat');
const npTitle = document.getElementById('npTitle');
const npArtist = document.getElementById('npArtist');

const progress = document.getElementById('progress');
const curTime = document.getElementById('curTime');
const durTime = document.getElementById('durTime');
const volume = document.getElementById('volume');

const vinyl = document.getElementById('vinyl');
const vinylLabel = document.getElementById('vinylLabel');
const arm = document.getElementById('arm');

const PLAY_ICON = '<path d="M8 5v14l11-7z"/>';
const PAUSE_ICON = '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>';

// ---------- тонировка фона под цвет текущей категории ----------

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function applyCategoryTint(name) {
  const cat = library[name];
  document.documentElement.style.setProperty('--cat-tint', hexToRgba(cat.color, 0.16));
}

// ---------- боковое меню категорий ----------

function renderSidebar() {
  categoryNames.forEach(name => {
    const cat = library[name];
    const item = document.createElement('div');
    item.className = 'cat-item' + (name === currentCategory ? ' active' : '');
    item.dataset.name = name;
    item.innerHTML = `<span class="dot" style="background:${cat.color}"></span>${cat.emoji} ${name}`;
    item.addEventListener('click', () => switchCategory(name));
    sidebar.appendChild(item);
  });
}

function switchCategory(name) {
  currentCategory = name;
  currentIndex = 0;

  sidebar.querySelectorAll('.cat-item').forEach(el => {
    el.classList.toggle('active', el.dataset.name === name);
  });

  applyCategoryTint(name);
  renderPlaylist();
  loadTrack(false);
}

// ---------- список треков текущей категории ----------

function renderPlaylist() {
  const cat = library[currentCategory];
  plHeader.textContent = `${cat.emoji} ${currentCategory}`;
  plCount.textContent = `${cat.tracks.length} цитат`;
  playlistEl.innerHTML = '';

  cat.tracks.forEach((track, i) => {
    const isCurrent = i === currentIndex;
    const row = document.createElement('div');
    row.className = 'track-row' + (isCurrent ? ' active' : '');

    const discSpinning = (isCurrent && isPlaying) ? ' spinning' : '';
    row.innerHTML = `
      <div class="mini-disc${discSpinning}" style="background: radial-gradient(circle, ${cat.color}55, #15111f 70%);">
        <div class="m-label"></div>
      </div>
      <div class="t-meta">
        <div class="t-title">${track.quote}</div>
        <div class="t-artist">${track.source}</div>
      </div>
      <svg class="t-play-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
    `;

    row.addEventListener('click', () => {
      currentIndex = i;
      loadTrack(true);
    });

    playlistEl.appendChild(row);
  });
}

// ---------- загрузка и воспроизведение трека ----------

function loadTrack(autoplay) {
  const cat = library[currentCategory];
  const track = cat.tracks[currentIndex];

  audio.src = track.src;

  npCat.textContent = currentCategory;
  npCat.style.background = cat.color + '33';
  npCat.style.color = cat.color;
  npTitle.textContent = track.quote;
  npArtist.textContent = track.source;

  vinylLabel.textContent = cat.emoji;
  vinylLabel.style.background = `radial-gradient(circle, ${cat.color}66, #15111f 75%)`;

  progress.value = 0;
  progress.style.setProperty('--pg', '0%');
  curTime.textContent = '0:00';
  durTime.textContent = '0:00';

  renderPlaylist();

  if (autoplay) {
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  } else {
    setPlaying(false);
  }
}

function setPlaying(playing) {
  isPlaying = playing;
  playIcon.innerHTML = playing ? PAUSE_ICON : PLAY_ICON;
  vinyl.classList.toggle('spinning', playing);
  arm.classList.toggle('down', playing);
  renderPlaylist();
}

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    setPlaying(false);
  } else {
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }
});

// ---------- переключение треков ----------

function nextTrack() {
  const tracks = library[currentCategory].tracks;

  if (shuffleOn && tracks.length > 1) {
    // берём случайный индекс, но не тот же самый, что играет сейчас
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * tracks.length);
    } while (randomIndex === currentIndex);
    currentIndex = randomIndex;
  } else {
    currentIndex = (currentIndex + 1) % tracks.length;
  }

  loadTrack(true);
}

function prevTrack() {
  const tracks = library[currentCategory].tracks;
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(true);
}

nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

// ---------- shuffle и repeat ----------

shuffleBtn.addEventListener('click', () => {
  shuffleOn = !shuffleOn;
  shuffleBtn.classList.toggle('active', shuffleOn);
});

repeatBtn.addEventListener('click', () => {
  repeatOn = !repeatOn;
  audio.loop = repeatOn;
  repeatBtn.classList.toggle('active', repeatOn);
});

// если repeat включён, браузер сам зацикливает audio.currentTime — событие
// 'ended' в этом случае вообще не срабатывает, поэтому здесь ничего
// дополнительно проверять не нужно
audio.addEventListener('ended', () => {
  nextTrack();
});

// ---------- прогресс-бар, время, громкость ----------

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent;
  progress.style.setProperty('--pg', percent + '%');
  curTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  durTime.textContent = formatTime(audio.duration);
});

progress.addEventListener('input', () => {
  if (!audio.duration) return;
  audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});
audio.volume = volume.value;

// ---------- фоновая анимация: звёзды и лепестки сакуры ----------

function renderBackgroundDecor() {
  const bg = document.getElementById('bg');

  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 55 + 'vh';
    star.style.animationDelay = Math.random() * 3 + 's';
    bg.appendChild(star);
  }

  for (let i = 0; i < 18; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = 8 + Math.random() * 8 + 's';
    petal.style.animationDelay = Math.random() * 10 + 's';
    petal.style.opacity = 0.5 + Math.random() * 0.4;
    petal.style.transform = `scale(${0.6 + Math.random() * 0.8})`;
    bg.appendChild(petal);
  }
}

// ---------- запуск ----------

renderSidebar();
applyCategoryTint(currentCategory);
renderPlaylist();
loadTrack(false);
renderBackgroundDecor();
