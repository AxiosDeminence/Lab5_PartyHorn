// main.js

const AIR_HORN_STR   = 'radio-air-horn';
const CAR_HORN_STR   = 'radio-car-horn';
const PARTY_HORN_STR = 'radio-party-horn';

const AIR_HORN_IMG   = './assets/media/images/air-horn.svg';
const CAR_HORN_IMG   = './assets/media/images/car.svg';
const PARTY_HORN_IMG = './assets/media/images/party-horn.svg';

const AIR_HORN       = './assets/media/audio/air-horn.mp3';
const CAR_HORN       = './assets/media/audio/car-horn.mp3';
const PARTY_HORN     = './assets/media/audio/party-horn.mp3';

const VOL_LVL_0_IMG  = './assets/media/icons/volume-level-0.svg';
const VOL_LVL_1_IMG  = './assets/media/icons/volume-level-1.svg';
const VOL_LVL_2_IMG  = './assets/media/icons/volume-level-2.svg';
const VOL_LVL_3_IMG  = './assets/media/icons/volume-level-3.svg';

let playForm;

let volumeNumber;
let volumeSlider;
let volumeImage;

let hornSelector;
let hornType;
let hornBtn;

let hornImage;
let hornAudio;

// Wait until finished loading to initialize page and element variables
window.onload = function() {
    playForm     = document.getElementById('party-horn-form');

    volumeNumber = document.getElementById('volume-number');
    volumeSlider = document.getElementById('volume-slider');
    volumeImage  = document.getElementById('volume-image');

    hornSelector = document.getElementById('audio-selection');
    hornType     = document.querySelector('input[name=radio-sound]:checked').id;
    hornBtn      = document.getElementById('honk-btn');

    hornImage    = document.getElementById('sound-image');
    hornAudio    = document.getElementById('horn-sound');

    initializeListeners();
}

function initializeListeners() {
    volumeSlider.addEventListener('input', function() {
        volumeNumber.value = volumeSlider.value;
        hornAudio.volume = volumeNumber.value / 100;
        updatePage();
    });

    volumeNumber.addEventListener('input', function() {
        volumeSlider.value = volumeNumber.value;
        hornAudio.volume = volumeNumber.value / 100;
        updatePage();
    });

    hornSelector.addEventListener('change', function() {
        hornType = document.querySelector('input[name=radio-sound]:checked').id;
        updatePage();
    });

    playForm.addEventListener('submit', function(e) {
        e.preventDefault();
        hornAudio.play();
    })
}

function updatePage() {
    if (volumeNumber.value >= 67) {
        volumeImage.src = VOL_LVL_3_IMG;
        hornBtn.disabled = false;
    } else if (volumeNumber.value >= 34) {
        volumeImage.src = VOL_LVL_2_IMG;
        hornBtn.disabled = false;
    } else if (volumeNumber.value >= 1) {
        volumeImage.src = VOL_LVL_1_IMG;
        hornBtn.disabled = false;
    } else {
        volumeImage.src = VOL_LVL_0_IMG;
        hornBtn.disabled = true;
    }

    switch (hornType) {
        case AIR_HORN_STR:
            hornImage.src = AIR_HORN_IMG;
            hornAudio.src = AIR_HORN;
            break;
        case CAR_HORN_STR:
            hornImage.src = CAR_HORN_IMG;
            hornAudio.src = CAR_HORN;
            break;
        case PARTY_HORN_STR:
            hornImage.src = PARTY_HORN_IMG;
            hornAudio.src = PARTY_HORN;
            break;
        default:
            throw "Error, incorrect horntype";
            break;
    }
}
