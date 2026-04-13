const router = require("express").Router();
const Period = require("../models/Period.js");
const auth = require("../middleware/auth.js");
const calculateCycleLength = require("../utils/cycle.js");

//add Period  -- POST method
router.post("/" , auth , async(req , res) => {     //auth middleware runs first -> verifies token -> adds req.user
    try{
        const {startDate , endDate , flow ,symptoms , notes} = req.body;

        const existing = await Period.findOne({        //prevents duplicates for same date of a user
            userId : req.user.id,
            startDate : new Date(startDate)   //startDate = this date
        })

        if(existing){                              //Did this specific user already log this date? if yes 
            return res.status(400).json({
                message :"Period already logged for this date"
            })
        }

        const period = new Period({         //create new Period document
            userId : req.user.id,          //will get from middleware
            startDate,
            endDate,
            flow,
            symptoms,
            notes ,
        });

        await period.save();

        res.status(201).json(period);    //send created Period as response
    }
    catch(error){
        res.status(500).json(error.message);
    }
})


//get entire period history for logged users -- GET method
router.get("/" , auth , async (req,res)=> {
    try{
        const periods = await Period.find({    //notice we have used find and not findOne .. so we'll get all entries
            userId : req.user.id         //Only fetch periods belonging to the logged-in user
        }).sort({startDate : -1});       //-1 : descending order(newest first)  1: ascending order(oldest first)


        res.json(periods);
    }
    catch(error){
        res.status(500).json(error);
    }

})


//delete period  -- use DELETE method
router.delete("/:id" , auth , async(req,res) => {              //:id - dynamic route parameter   --> Use this when you need one specific item
    try{
        //searches for a document in Period collection
        const deletedPeriod = await Period.findOneAndDelete({      //returns deleted document --> stored in "period"
            _id : req.params.id ,                           //matches the ID from URL   
            userId : req.user.id                            //ensure the period belongs to logged-in user (from auth middleware)
        })

        if(!deletedPeriod){
            return res.status(404).json({message : "Period not found!"})
        }

        res.json({message : "Period deleted successfully! Deleted period:" ,
            data : deletedPeriod
        });
    } catch(error){
        res.status(500).json(error.message);
    }
});

//update period  -- use PUT method
router.put("/:id" , auth , async(req,res) => {
    try{
        const updated = await Period.findOneAndUpdate({
            _id : req.params.id ,
            userId : req.user.id           //find document based on the following filters
        },
        req.body,                         //update the body with new data
        {new : true}                     //return updated document ...Without this → Mongo returns old data ...With this → returns updated data
        )
        if(!updated){
            return res.status(400).json("Period not found!");
        }
        res.json({ message : "Period upadted successfully!" ,
            data : updated});
    } catch(error){
        res.status(500).json(error.message);
    }
})

//STATS endpoint to calculate cycle length
router.get("/stats" , auth , async(req , res) => {
    try{
        const periods = await Period.find({              //all entries of a specific user
        userId : req.user.id
    })

        const cycleLength = calculateCycleLength(periods);

        res.json({
            cycleLength ,
            totalEntries : periods.length
        });
    }
    catch(error){
        res.status(500).json(error.message);
    }
})


module.exports = router;