'use strict';

const preferredDisplaySurface = document.getElementById('displaySurface');
const startButton = document.getElementById('startButton');
const $button = document.getElementById('startRecordingBtn');
const $stopButton = document.getElementById('stopRecordingBtn');
const $fileInput = document.getElementById('fileInput');
const $uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const uploadProgressBar = document.getElementById('uploadProgressBar');

if (adapter.browserDetails.browser === 'chrome' &&
    adapter.browserDetails.version >= 107) {
 
  document.getElementById('options').style.display = 'block';
} else if (adapter.browserDetails.browser === 'firefox') {
  adapter.browserShim.shimGetDisplayMedia(window, 'screen');
}

function handleSuccess(stream) {
  startButton.disabled = true;
  preferredDisplaySurface.disabled = true;
  const video = document.querySelector('video');
  video.srcObject = stream;

  window.stream = stream;

  const options = {
    mimeType: 'video/webm;codecs=vp8,opus' // Tipo MIME para el formato de grabación
  };
  const mediaRecorder = new MediaRecorder(stream, options);

  mediaRecorder.ondataavailable = function (event) {
    const blob = event.data;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const now = new Date();
    const fileName = `grabacion_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}.webm`;
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  // Comienza a grabar cuando el MediaRecorder está listo
  mediaRecorder.start();

  // Escucha el evento 'ended' en la pista de video para detener la grabación
  stream.getVideoTracks()[0].addEventListener('ended', () => {
    mediaRecorder.stop();
    errorMsg('La grabación ha terminado');
    startButton.disabled = false;
    preferredDisplaySurface.disabled = false;
  });
}


function handleError(error) {
  errorMsg(`getDisplayMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

startButton.addEventListener('click', () => {
  const options = {
    audio: true, // Habilitar captura de audio
    video: {
      width: { ideal: 1920 },
      height: { ideal: 1080 },
      bitrate: 8000000 // 8 Mbps
    }
  };
  const displaySurface = preferredDisplaySurface.options[preferredDisplaySurface.selectedIndex].value;
  if (displaySurface !== 'default') {
    options.video = { displaySurface };
  }
  navigator.mediaDevices.getDisplayMedia(options)
    .then(handleSuccess, handleError);
});


if ((navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices)) {
  startButton.disabled = false;
} else {
  errorMsg('getDisplayMedia is not supported');
}

// Manejar evento cuando se hace clic en el botón para subir un video
$uploadBtn.addEventListener('click', async () => {
  const file = $fileInput.files[0];

  if (file) {
      const formData = new FormData();
      formData.append('video', file);

      try {
          const response = await fetch('/subir_video', {
              method: 'POST',
              body: formData
          });

          if (!response.ok) {
              throw new Error('Hubo un problema al subir el video.');
          }

          const responseData = await response.json();
          console.log(responseData.message);

          // Mostrar una alerta con el mensaje de éxito
          alert(responseData.message);

      } catch (error) {
          console.error('Error:', error);
          alert('Hubo un error al subir el video.');
      }
  } else {
      alert('Por favor seleccione un archivo de video.');
  }
});
