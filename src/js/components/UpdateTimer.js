function padZero(s) {
  if (s < 10)
    return '0' + s;
  return s;
}

function secondsToString(time) {
  var seconds = time % 60;
  var minutes = Math.floor(time / 60);
  var hours = Math.floor(minutes / 60);
  return padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds);
}

function UpdateTimer(map) {
  this.time = 0;
  this.timer = document.createElement('div');
  this.timer.textContent = secondsToString(this.time);
  this.timer.className = 'timer';
  this.interval = setInterval(() => {
    this.time++;
    this.timer.textContent = secondsToString(this.time);
  }, 1000);

  map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(this.timer);
}

module.exports = UpdateTimer;