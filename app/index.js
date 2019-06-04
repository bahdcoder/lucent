const { Pangaso } = require(process.env.CI_ENVIRONMENT
    ? '../dist/server/main'
    : 'pangaso')

process.env.MONGO_URL = 'mongodb://localhost/pangaso'

new Pangaso()
    .onPort(process.env.PORT || 5044)
    .withTools([])
    .mongo(
        process.env.MONGO_URL ||
            'mongodb://pangaso:pangaso1@ds149596.mlab.com:49596/pangaso',
        process.env.DATABASE || 'pangaso'
    )
    .start()
