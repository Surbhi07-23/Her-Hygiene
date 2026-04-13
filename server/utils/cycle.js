//This function calculates the avy ccycle length
const calculateCycleLength =  (periods) => {               //Takes an array of periods  -- comimg from period.js
    if(periods.length < 2) return null                    //cycle = difference between two periods  .. need atleast 2 entries

    const sorted = periods.sort(
        (a,b) => new Date(a.startDate) - new Date(b.startDate)     //sorted will have full period object, in ascending order of startDate
    );

    let total = 0 ;
    for(let i = 1 ; i < sorted.length ; i++){
        const prev = new Date(sorted[i-1].startDate);
        const curr = new Date(sorted[i].startDate);            //curr will always be > prev (sorted array)

        const diff = [curr - prev] / (1000 * 60 * 60 * 24);    //millisecons -> days

        total += diff;                                          //summing all cycle lengths
    }

    return Math.round(total / (sorted.length - 1));            //return average   ... (sorted.length - 1)=> because you are comparing pairs:  prev → curr                                         If there are 3 values, you only have 2 pairs.

}


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