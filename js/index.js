// Buttons
const pomodoroBtn = document.querySelector('.pomodoroBtn');
const shortbreakBtn = document.querySelector('.shortbreakBtn');
const longbreakBtn = document.querySelector('.longbreakBtn');
const startBtn = document.querySelector('.startBtn');
const restartBtn = document.querySelector('.restartBtn');

// Text
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');

// Functions and logic
let sleep = function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); // Funcion para hacer una ejecucion cada "x" milisegundos
}

let now = new Date(); // Declaro la funcion date para obtener la hora del cliente
let hora = '';

let running = false // Declaro un estado para saber si se está corriendo o no
let currentMode = 'pomodoro'; // Declaro un estado para saber en que seccion de las 3 me encuentro

let audio = document.getElementById('alarm'); // Selecciono el audio

function playAlarm() {
    audio.play();
    audio.loop = true;
}

function pauseAlarm() {
    audio.pause();
}

function enableButton() {
    startBtn.disabled = false;
}

function restart() {
    // Hacemos que running pase a False, es decir, que se deje de ejecutar
    running = false;
    if (currentMode === 'pomodoro') {
        minutes.textContent = '25';
        seconds.textContent = '00';
        pauseAlarm();
        enableButton();
    } else if (currentMode === 'shortBreak') {
        minutes.textContent = '05';
        seconds.textContent = '00';
        pauseAlarm()
        enableButton();
    } else {
        minutes.textContent = '15';
        seconds.textContent = '00';
        pauseAlarm()
        enableButton();
    }

}

async function start() {
    // Al darle al boton de startBtn es valor de running se cambió a True
    if(running) {
        let segundos = parseInt(seconds.textContent);
        let minutos = parseInt(minutes.textContent);
    
        if(segundos === 0) {
            segundos = 60;
            minutos -= 1;
            minutes.textContent = `${minutos}`;
        }
        
        // Mientras los segundos sean mayores que 0
        while(segundos > 0) {
            // Si el running es diferente a "true", es decir "false", que se detenga el bucle
            if(!running) {
                break;
            }

            segundos--;
            if(segundos < 10) {
                seconds.textContent = `0${segundos}`
            } else {
                seconds.textContent = `${segundos}`;
            }

            if(minutos < 10) {
                minutes.textContent = `0${minutos}`
            } else {
                minutes.textContent = `${minutos}`;
            }
            
            await sleep(1000);
            
            // Si los segundos llegan a 0, que vuelvan a valer 60
            if(segundos === 0 && minutos > 0) {
                segundos = 60;
                minutos -= 1;
                minutes.textContent = `${minutos}`;
            }
            
            // Si los minutos llegan a valer menos que 00, que se detenga el bucle.
            if(minutos < 0) {
                break;
            }

            // Hago la validación dentro del while para que el audio se reproduzca
            if (minutes.textContent == '00' && seconds.textContent == '00') {
                playAlarm();
            }
        }
    } else {
        startBtn.disabled = true;
    }
}

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    startBtn.disabled = true;
    running = true;
    start();
});

restartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    restart();
    startBtn.disabled = false;
    pauseAlarm();
});

pomodoroBtn.addEventListener('click', (e) => {
    // Si se está corriendo, que se reinicie el contador.
    if(running) {
        restart();
    }
    minutes.textContent = '25';
    seconds.textContent = '00';
    currentMode = 'pomodoro'; // Le digo que me encuentro en la sección "pomodoro"
});

shortbreakBtn.addEventListener('click', (e) =>{
    if(running) {
        restart();
    }
    minutes.textContent = '05';
    seconds.textContent = '00';
    currentMode = 'shortBreak'; // Le digo que me encuentro en la sección "short break"
});

longbreakBtn.addEventListener('click', (e) =>{
    if(running) {
        restart();
    }
    minutes.textContent = '15';
    seconds.textContent = '00';
    currentMode = 'longBreak'; // Le digo que me encuentro en la sección "long break"
});

// Background
const bg = document.getElementById('bg-page');

if (now.getHours(hora) <= 24) {
    bg.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('img/4.gif')";
} else if(now.getHours(hora) <= 18) {
    bg.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('img/3.gif')";
} else if (now.getHours(hora) <= 16){
    bg.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('img/2.gif')";
} else if (now.getHours(hora) <= 6){
    bg.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.2)), url('img/1.gif')";
} else if (now.getHours(hora) <= 3){
    bg.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('img/4.gif')";
}

