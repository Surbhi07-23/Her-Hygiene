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

module.exports = calculateCycleLength;