// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Audio loading
"use strict";

var audioLoaded = 0,
  sfxClick,
  sfxShopBuy,
  sfxShopUnlock,
  sfxAchievementUnlock,
  sfxSpecialAchievementUnlock;

document.addEventListener('click', loadAudio);

function loadAudio() {
  if (!audioLoaded) {
    const context = new AudioContext();

    class Sound {
      url = '';
      buffer = null;
      sources = [];

      constructor(url) {
        this.url = url;
      }

      load() {
        if (!this.url) return Promise.reject(new Error(`Missing or invalid URL: ${url}`))
        if (this.buffer) return Promise.resolve(this.buffer);

        return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();

          request.open('GET', this.url, true);
          request.responseType = 'arraybuffer';

          request.onload = () => {
            context.decodeAudioData(request.response, (buffer) => {
              if (!buffer) {
                reject(new Error(`Error when decoding audio data: ${this.url}`));
                return;
              }

              this.buffer = buffer;
              resolve(buffer);
            });
          };

          request.onerror = err => {
            reject(`Sound XMLHttpRequest error: ${err}`);
          };

          request.send();
        });
      }

      play() {
        if (!this.buffer) return;

        const source = context.createBufferSource(),
          gainNode = context.createGain();

        source.buffer = this.buffer;
        source.onended = () => {
          source.stop(0);
        };

        gainNode.gain.value = settings.volume;

        source.connect(gainNode).connect(context.destination);
        source.start(0);
      }
    }

    sfxClick = new Sound('./snd/click.ogg');
    sfxShopBuy = new Sound('./snd/shopBuy.ogg');
    sfxShopUnlock = new Sound('./snd/shopUnlock.ogg');
    sfxAchievementUnlock = new Sound('./snd/achievementUnlock.ogg');
    sfxSpecialAchievementUnlock = new Sound('./snd/specialAchievementUnlock.ogg');

    Promise.all([
      sfxClick.load(),
      sfxShopBuy.load(),
      sfxShopUnlock.load(),
      sfxAchievementUnlock.load(),
      sfxSpecialAchievementUnlock.load()
    ])

    audioLoaded = 1;
  }
}
