import Timer from './timer.js'

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const substractBeats = document.querySelector('.substract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');

const click1 = new Audio('click1.mp3');
const click2 = new Audio('click2.mp3');

let bpm = 160;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = 'Vivace';

decreaseTempoBtn.addEventListener('click', () => {
    if (bpm <= 40) {return};
    bpm--;
    validateTempo();
    updateMetronome();
});
increaseTempoBtn.addEventListener('click', () => {
    if (bpm >= 280) {return};
    bpm++;
    validateTempo();
    updateMetronome();
});
tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    validateTempo();
    updateMetronome();
});

substractBeats.addEventListener('click', () =>{
    if(beatsPerMeasure <= 1){return};
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

addBeats.addEventListener('click', () =>{
    if(beatsPerMeasure >= 12){return};
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

startStopBtn.addEventListener('click', () =>{
    count = 0;
    if (!isRunning){
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'STOP';
    } else {
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START'
    }
})

function updateMetronome(){
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;

    if (bpm >= 40 && bpm <= 45) {tempoTextString = 'Lento'};
    if (bpm > 45 && bpm <= 55 ) {tempoTextString = 'Largo'};
    if (bpm > 55 && bpm <= 65 ) {tempoTextString = 'Adagio'};
    if (bpm > 65 && bpm <= 73 ) {tempoTextString = 'Adagietto'};
    if (bpm > 73 && bpm <= 86 ) {tempoTextString = 'Andante'};
    if (bpm > 86 && bpm <= 98 ) {tempoTextString = 'Moderato'};
    if (bpm > 98 && bpm <= 109 ) {tempoTextString = 'Allegretto'};
    if (bpm > 109 && bpm <= 132) {tempoTextString = 'Allegro'};
    if (bpm > 132 && bpm <= 168) {tempoTextString = 'Vivace'};
    if (bpm > 168 && bpm <= 178) {tempoTextString = 'Presto'};
    if (bpm > 178 && bpm <= 199) {tempoTextString = 'Prestissimo'};
    if (bpm > 200 && bpm <= 230) {tempoTextString = 'cut time'};
    if (bpm > 230 && bpm <= 255) {tempoTextString = 'take it easy'};
    if (bpm > 255 && bpm <= 280) {tempoTextString = 'death'};

    tempoText.textContent = tempoTextString;
};

function validateTempo(){
    if (bpm <= 40) {return};
    if (bpm >= 280) {return};
};

function playClick(){
    console.log(count);
    if (count === beatsPerMeasure){
        count = 0;
    }
    if (count === 0){
        click1.play();
        click1.currentTime = 0;
    } else{
        click2.play();
        click2.currentTime = 0;
    }
    count ++;
}

const metronome = new Timer(playClick, 60000 / bpm, {immeadiate: true});
