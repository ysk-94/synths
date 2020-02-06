'use strict';

window.AudioContext = window.AudioContext || window.webKitAudioContext;

const context = new AudioContext();

const osc = context.createOscillator();

osc.start = osc.start || osc.noteOn;
osc.stop = osc.stop || osc.noteOff;

context.createGain = context.createGain || context.createGainNode;

const gain = context.createGain();

osc.connect(gain);
gain.connect(context.destination);

osc.start(0);

document.addEventListener('click', function (){
    document.removeEventListener('click', this);
    context.resume();
    window.setTimeout(() => osc.stop(0), 5000);
});