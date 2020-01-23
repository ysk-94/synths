'use strict';

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var Synth = function() {
    this.ctx = new window.AudioContext();
    this.note = {};
    ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'].forEach((v, i) => {
        this.note[v] = i;
    });
    this.oscs = [];
};

Synth.prototype.createOsc = function() {
    var osc = this.ctx.createOscillator();
    osc.start = osc.start || osc.noteOn;
    return osc;
}

Synth.prototype.playNote = function(noteId) {
    var osc = this.createOsc();
    var frequency = parseInt(440 * Math.pow(Math.pow(2,1/12), (3-12) + this.note[noteId]), 10);
    console.log({frequency});
    osc.frequency.value = frequency;
    osc.connect(this.ctx.destination);
    osc.start();
    this.oscs.push({
        noteId: noteId,
        osc: osc,
    });
};

Synth.prototype.stopNote = function(noteId) {
    this.oscs.forEach((v, i, oscs) => {
        if (v.noteId === noteId) {
            v.osc.stop();
            oscs.splice(i, 1);
        }
    });
};


window.onload = (function() {
    var synth = new Synth();


    document.addEventListener('keydown', evt => {
        switch (evt.key) {
            case 'a': synth.playNote('C'); break;
            case 's': synth.playNote('D'); break;
            case 'd': synth.playNote('E'); break;
            case 'f': synth.playNote('F'); break;
            case 'g': synth.playNote('G'); break;
            case 'h': synth.playNote('A'); break;
            case 'j': synth.playNote('B'); break;       
            default:
                break;
        }
    });

    document.addEventListener('keyup', evt => {
        switch (evt.key) {
            case 'a': synth.stopNote('C'); break;
            case 's': synth.stopNote('D'); break;
            case 'd': synth.stopNote('E'); break;
            case 'f': synth.stopNote('F'); break;
            case 'g': synth.stopNote('G'); break;
            case 'h': synth.stopNote('A'); break;
            case 'j': synth.stopNote('B'); break;       

            default:
                break;
        }
    });

})();

