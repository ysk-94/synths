window.onload = function() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    const ctx = new AudioContext();

    const C = ctx.createOscillator();
    C.frequency.value = 261.63;

    const E = ctx.createOscillator();
    E.frequency.value = 329.63;

    const G = ctx.createOscillator();
    G.frequency.value = 392.00;

    // クリッピング発生防止
    const gain = ctx.createGain();
    gain.gain.value = 0.3;

    C.connect(gain);
    E.connect(gain);
    G.connect(gain);
    gain.connect(ctx.destination);

    document.addEventListener('click', function() {
        document.removeEventListener('click', this);
        const t0 = ctx.currentTime;
        const wait = 3;
        C.start(t0 + 1);
        E.start(t0 + 2);
        G.start(t0 + 3);
        ctx.resume();
        C.stop(t0 + wait + 1);
        E.stop(t0 + wait + 2);
        G.stop(t0 + wait + 3);
    });
}