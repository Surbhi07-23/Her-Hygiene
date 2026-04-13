//This function calculates the avy ccycle length
const calculateCycleLength =  (periods) => {               //Takes an array of periods  -- comimg from period.js
    if(periods.length < 2) return null                    //cycle = difference between two periods  .. need atleast 2 entries

  if (periods.length < 2) return null;

  const sorted = [...periods].sort(

    (a, b) =>
      new Date(a.startDate) -
      new Date(b.startDate)

  );

  let total = 0;

  for (let i = 1; i < sorted.length; i++) {

    const prev = new Date(
      sorted[i - 1].startDate
    );

    const curr = new Date(
      sorted[i].startDate
    );

    const diff =
      (curr - prev) /
      (1000 * 60 * 60 * 24);

    total += diff;

  }

  return Math.round(
    total / (sorted.length - 1)
  );
};


// Predict next period
const predictNextPeriod = (periods) => {

  if (periods.length < 2) return null;

  const sorted = [...periods].sort(

    (a, b) =>
      new Date(a.startDate) -
      new Date(b.startDate)

  );

  const last = new Date(
    sorted[sorted.length - 1].startDate
  );

  const cycle =
    calculateCycleLength(periods);

  if (!cycle) return null;

  const next = new Date(last);

  next.setDate(
    last.getDate() + cycle
  );

  return next;

};


// Calculate period duration
const calculateDuration = (
  start,
  end
) => {

  const s = new Date(start);

  const e = new Date(end);

  return Math.round(
    (e - s) /
    (1000 * 60 * 60 * 24)
  ) + 1;

};


export {

  calculateCycleLength,

  predictNextPeriod,

  calculateDuration

};

//This function predicts next period start date using average cycle length.
const predictNextPeriod = (periods) =>{
    if(periods.length < 2 ) return null;

    const sorted =  periods.sort(
        (a,b) => new Date(a.startDate) - new Date(b.startDate)    //oldest to newest
    );

    const last = new Date(sorted[sorted.length - 1].startDate);

    const cycle = calculateCycleLength(sorted);             //calculate average cycle

    const next = new Date(last);     //copy the last date..does not affect "last" and easy to modify

    //this adds cycle days to last period
    next.setDate(last.getDate() + cycle);     //If last is:2026-04-04 --> then: last.getDate() = 4  -->last.getDate() + cycle = 4 + 27= 31
    //next.setDate(31) So: April 31  → JS auto converts → May 1 JavaScript automatically handles overflow.      

    return next;

}

module.exports = {calculateCycleLength , predictNextPeriod};
