export function getDaysDiff(from: Date, to: Date) {
  const diffMillis = to.getTime() - from.getTime();

  if (diffMillis < 0) {
    throw new RangeError("'from' must be greater than 'to' date");
  }

  return Math.round(diffMillis / (1000 * 60 * 60 * 24));
}
