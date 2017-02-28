var buttonPlus = document.getElementById('plus');
var buttonReset = document.getElementById('reset');
var buttonMinus = document.getElementById('minus');
var buttonStart = document.getElementById('start');

var timer = document.getElementById('timer');

var alarm = new Audio('http://www.freesfx.co.uk/rx2/mp3s/2/13633_1459783960.mp3');

var minutes = 10;
var seconds = 0;

var maxMinutes = 30;
var minMinutes = 1;

var counterState = false;
var finished = false;
var stopped = false;

var userMinutes = 10;

function updateTimer(){
  timer.innerHTML = minutes + ":" + seconds;
}

function addMinute(){
  if (minutes < maxMinutes && counterState == false){
    minutes++;
    checkZeroes();
    updateTimer();
  }
}

function removeMinute(){
  if (minutes > minMinutes && counterState === false){
    minutes--;
    checkZeroes();
    updateTimer();
  }
}

function checkZeroes(){
  if ((counterState === true && seconds < 10 && seconds.length != 2) || (counterState === false && seconds.length != 2)){
    seconds = "0" + seconds;
  }
}

function startTimer(){

  if (stopped == false){
    if (minutes == 0 && (seconds == 0 || seconds == "00")){
      alarm.play();
      checkZeroes();
      updateTimer();
      finished = true;
      buttonStart.innerHTML = "reset";
    } else {
      buttonPlus.classList.add('hidden');
      buttonMinus.classList.add('hidden');
      buttonStart.innerHTML = "stop";
      counterState = true;
      checkZeroes();
      if (seconds == 0 || seconds == "00"){
        setTimeout(minusMinute, 1000);
      }
      updateTimer();
      minusSecond();
      setTimeout(startTimer, 1000);
    }
}
}

function minusSecond(){
  seconds--;
}

function minusMinute(){
  seconds = 59;
  minutes--;
}

function resetPomodoro(){
  counterState = false;
  finished = false;
  stopped = false;
  minutes = userMinutes;
  seconds = 0;
  buttonStart.innerHTML = "start";
  buttonReset.classList.add('hidden');
  buttonPlus.classList.remove('hidden');
  buttonMinus.classList.remove('hidden');
  checkZeroes();
  updateTimer();
}

document.addEventListener("DOMContentLoaded", function(event) {


  buttonPlus.onclick = function(){addMinute()};
  buttonMinus.onclick = function(){removeMinute()};
  buttonStart.onclick = function(){
    if(counterState == false){
      userMinutes = minutes;
      startTimer();
    } else if (counterState == true && finished == false && stopped === false){
      stopped = true;
      buttonStart.innerHTML = "resume";
      buttonReset.classList.remove('hidden');
    } else if (counterState == true && finished == false && stopped === true){
      stopped = false;
      buttonStart.innerHTML = "stop";
      buttonReset.classList.add('hidden');
      startTimer();
    } else if (counterState == true && finished == true){
      resetPomodoro();
    }

  buttonReset.onclick = function(){
    if (counterState == true && finished == false && stopped === true){
      resetPomodoro();

    }

  }

  };


});
