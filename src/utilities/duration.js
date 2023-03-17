//////////////////////////////
// calc time/duration

export function getDuration(time) {
  let hours = (time / 60)
  let rhours = Math.floor(hours)
  let minutes = (hours - rhours) * 60
  let rminutes = Math.round(minutes)
  return rhours + "h " + rminutes + "m."
}