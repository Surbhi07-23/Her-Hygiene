const calculateCycleLength = (periods) => {

  if (periods.length < 2) return null;

  const sorted = [...periods].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  let total = 0;

  for (let i = 1; i < sorted.length; i++) {

    const prev = new Date(sorted[i - 1].startDate);
    const curr = new Date(sorted[i].startDate);

    const diff = (curr - prev) / (1000 * 60 * 60 * 24);

    total += diff;
  }

  return Math.round(total / (sorted.length - 1));
};


// Predict next period
const predictNextPeriod = (periods) => {

  if (periods.length < 2) return null;

  const sorted = [...periods].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  const last = new Date(sorted[sorted.length - 1].startDate);

  const cycle = calculateCycleLength(periods);

  if (!cycle) return null;

  const next = new Date(last);
  next.setDate(last.getDate() + cycle);

  return next;
};


// Calculate period duration
const calculateDuration = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);

  return Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1;
};


module.exports = {
  calculateCycleLength,
  predictNextPeriod,
  calculateDuration
};