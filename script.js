// all variables of element and buttons 
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const LapBtn = document.getElementById('LapBtn');
const hourElem = document.getElementById('hour');
const minuteElem = document.getElementById('minute');
const secondElem = document.getElementById('second');
const lapTimeBoxElem = document.getElementById('lapTimeBox');
const lapTimeListElem = document.getElementById('lapTimeListEl');

// all static variables 
let hour = 0;
let minute = 0;
let second = 0;
let Interval;
let lastTime = [];


// all event listner code 
startBtn.addEventListener('click', startTimeFunc)
stopBtn.addEventListener('click', stopTimeFunc)
resetBtn.addEventListener('click', resetTimeFunc)
LapBtn.addEventListener('click', LapTimeFunc)

// start function --> this will start stopwatch 
function startTimeFunc() {
    startBtn.disabled = true
    Interval = setInterval(() => {
        second++
        if (second == 60) {
            second = 0;
            minute++
            if (minute == 60) {
                minute = 0;
                hour++
            }
        }
        UpdateDisplayedTime()

    }, 1000)

}

// stop function --> it will stop time when we click on stop button 
function stopTimeFunc() {
    clearInterval(Interval)
    Interval = null;
    startBtn.disabled = false
}
// resetfunction --> it will be reset all value and stop timer 
function resetTimeFunc() {
    clearInterval(Interval)
    Interval = null;
    startBtn.disabled = false
    hour = 0;
    minute = 0;
    second = 0;
    lastTime = []
    lapTimeBoxElem.style.display = 'none';
    UpdateDisplayedTime()
}


// UpdateDisplayedTime function --> it will update all time att display
function UpdateDisplayedTime() {
    hourElem.textContent = hour < 10 ? '0' + hour : hour;
    minuteElem.textContent = minute < 10 ? '0' + minute : minute;
    secondElem.textContent = second < 10 ? '0' + second : second;
}


// teke lap function 
function LapTimeFunc() {
    if (hour || minute || second) {
        lapTimeListElem.innerHTML = ''
        lapTimeBoxElem.style.display = 'block';
        if(lastTime.length == 5){
            lastTime.splice(4, 1)
            lastTime.unshift({ hour, minute, second })
        }
        else{

            lastTime.unshift({ hour, minute, second })
        } 
        lastTime.forEach((timeValue) => {
            const listElem = document.createElement('li')
            listElem.textContent = `${timeValue.hour < 10 ? '0' + timeValue.hour : timeValue.hour}hr : ${timeValue.minute < 10 ? '0' + timeValue.minute : timeValue.minute}min : ${timeValue.second < 10 ? '0' + timeValue.second : timeValue.second}sec`
            lapTimeListElem.appendChild(listElem)
        })
    }

}


UpdateDisplayedTime()