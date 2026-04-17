token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDhhOTdiODJkODU0NjVlN2M0MmUwYyIsImlhdCI6MTc3NTkzMzYwMSwiZXhwIjoxNzc2NTM4NDAxfQ.4IWo4JF8PYmRIFuZNvgCN6AaLM3d6Tj8Qz0aRYZdNZg

                                    ##day 1
--MONGODB URI added to.env
--basic express server and mongodb connection established

                                    ##day 2
--jsonwebtoken and bcryptjs  .. how password hashing works(salts)
--database(periodtracker) vs collection(users) vs document vs models vs schema
--app.use("/api/auth", router) .... Express: "Use this router, and add /api/auth before all routes"  ,, /api/auth/register
--MongoServerError: E11000Duplicate email — use a new one

                                    ##day3
--check if user exists , check for invalid passwords and create jwt token  (jwt.sign())
--Find user by email ,Compare password using bcrypt , Generate JWT token , Return token to client
--token is of the following format = (header.payload.signature)

                                    ##day4
--JWT authentication middleware for a Node.js/Express app. It checks if a request has a valid token before allowing access to protected routes. middleware func has (req , res , next) --next : moves to nect middleware if auth passes
--jwt.verify(token, secretOrPublicKey, [options, callback]) ,, token : extracted from req.headers.authorization  ,, secretkey : to verify signature   ... if verified it returns the payload 

                                    ##day5
--defined Period.js .. period schema
--Protected route with auth     router.post("/", auth, ...)    Means only logged-in users can add data
--created period.js .. which creates period document in DB by accessing req.body
--userId : req.user.id (in period.js)   req.user we will get from middleware

                                    ##day6
--"get" request : get entire period history of a logged-in user
--added another field : cycleLength
--added code to prevent duplicates for same date of a user

                                    ##day7
--added code for DELETION and UPDATION
--code for cycleLength was not giving expected result 

                                    ##day8 + 9
--code for calculating cycle Length (cycle.js)
--sort(a,b) =>the return value of (a-b) will decide order -> negative :  a before b , positive : a after b ==>> sorts from oldest to newest
--calculted cycle length by computing avg and returned STATS endpoint
--added, updated , deleted various entries for testing
--get periods array -> sort dates -> find last period -> calculate avg cycle-> add cycle to last date -> return next predicted date
--cycle prediction logic (last + cycle)
--getDate() : returns date object        if date is 2026-03-04 then getDate() = 04
--setDate() : modifies the date object   new Date(2026-04-04).setDate(40) => 2026-05-10 b/c April 40 = May 10 JS automatically adjusts overflow


