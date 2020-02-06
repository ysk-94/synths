'use strict';

window.AudioContext = window.AudioContext || window.webKitAudioContext;

const context = new AudioContext();

const osc = context.createOscillator();

osc.start = osc.start || osc.noteOn;
osc.stop = osc.stop || osc.noteOff;

osc.type = (typeof osc.type === 'string') ? 'square': 1;
osc.frequency.value = 880;
osc.detune.value = 100;

context.createGain = context.createGain || context.createGainNode;
const gain = context.createGain();
gain.gain.value = 0.1;
osc.connect(gain);
gain.connect(context.destination);

document.addEventListener('click', function (){
    document.removeEventListener('click', this);
    osc.start(0);
    context.resume();
    window.setTimeout(() => osc.stop(0), 3000);
});
