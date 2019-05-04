const { Pangaso } = require('@fullstackjs/pangaso')

new Pangaso()
    .onPort(process.env.PORT || 5044)
    .withTools([])
    .mongo(
        process.env.MONGO_URL || 'mongodb://pangaso:pangaso1@ds149596.mlab.com:49596/pangaso',
        process.env.DATABASE || 'pangaso'
    )
    // .mongo('mongodb://localhost:27017', 'pangaso')
    .start()

// Belongs To relationship
// Belongs To Many --> Nope !
