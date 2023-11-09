export function seconds(time: Date | number): number {
  return (typeof time === 'number' ? time : time.getTime()) / 1000
}
