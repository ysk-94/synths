window.onload = () => {
    window.AudioContext = window.AudioContext || window.webKitAudoContext;

    const context = new AudioContext();

    let osc = null;
    let isStop = true;
    let startFrequency = -1;

    document.body.addEventListener('click', function() {

        if (!isStop) {
            osc.stop(0);
        }

        osc = context.createOscillator();

        osc.start = osc.start || osc.noteOn;
        osc.stop = osc.stop || osc.noteOff;

        osc.connect(context.destination);

        if (startFrequency === -1) {
            osc.frequency.value = 440;
        } else {
            osc.frequency.value = startFrequency;
        }
        osc.start(0);

        context.resume();

        isStop = false;
    }, false);
}