export function toDisplayTime(time) {
  var hours = Math.floor(time / 3600);
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time - minutes * 60);
  return (
    (hours ? toTwoNumber(hours) : '') +
    toTwoNumber(minutes) +
    ':' +
    toTwoNumber(seconds)
  );
}

export function toTwoNumber(value) {
  return value >= 10 ? value : '0' + value;
}
