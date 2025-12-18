// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Settings menu events and toggles

var numberShorten = true,
  graphicsMode = 'Quality',
  volume = 1.0;

bgGradCenterInput.value = '250, 224, 65';
bgGradEdgeInput.value = '249, 160, 40';
volumeInput.value = volume * 100;

setInterval(function() {
  if (graphicsMode == 'Quality') {
    const particleClass = document.querySelectorAll('.coinparticle'),
      bgParticleClass = document.querySelectorAll('.bg');

    if (particleClass.length > 25) for (let i = 20; i > 0; i--) particleClass[i].parentNode.removeChild(particleClass[i]);
    if (bgParticleClass.length > bgMax) for (let i = 35; i > 0; i--) bgParticleClass[i].parentNode.removeChild(bgParticleClass[i]);

    if (game.style.display == 'none') $('.coinparticle').remove();
    if (document.hidden) $('.bg').remove();
  } else { $('.bg').remove() }
}, 1000 / 60);


bgGradCenterInput.addEventListener('change', function() { document.body.style.backgroundImage = `radial-gradient(rgb(${bgGradCenterInput.value}), rgb(${bgGradEdgeInput.value})`; });
bgGradEdgeInput.addEventListener('change', function() { document.body.style.backgroundImage = `radial-gradient(rgb(${bgGradCenterInput.value}), rgb(${bgGradEdgeInput.value})`; });

graphicsBtn.addEventListener('click', function() { sfx.play(); if (graphicsMode == 'Quality') graphicsMode = 'Performance'; else graphicsMode = 'Quality'; graphicsBtn.textContent = graphicsMode; });

settingsButton.addEventListener('click', function() { sfx.play(); settingsPanel.style.display = 'block'; game.style.display = 'none'; });
backToGame2.addEventListener('click', function() { sfx.play(); game.style.display = 'block'; settingsPanel.style.display = 'none'; });

volumeInput.addEventListener('change', function() {
  try {
    let sndArr = [sfx, sfx2, sfx3, sfx4, sfx5, sfx6, sfx7, sfx7point1];
    if (volumeInput.value >= 0 && volumeInput.value <= 100 && readyToSave) {
      volume = volumeInput.value / 100;
      for (let i = 0; i < sndArr.length; i++) sndArr[i].volume = volume;
    } else volumeInput.value = volume * 100;
  } catch (error) { errorHandler(error); }
});


resetBgButton.addEventListener('click', function() {
  let prompt = confirm('This is completely irreversible! Are you sure you wish to continue? (You will need to save again for these changes to stay.)');
  if (prompt) {
    bgGradCenterInput.value = '250, 224, 65';
    bgGradEdgeInput.value = '249, 160, 40';
    document.body.style.backgroundImage = 'radial-gradient(rgb(250, 224, 65), rgb(249, 160, 40))';
  }
});
