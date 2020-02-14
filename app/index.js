const { Lucent } = require(process.env.CI_ENVIRONMENT
    ? '../dist/server/main'
    : 'lucent-admin')

process.env.MONGO_URL = 'mongodb://localhost/lucent-admin-3'

new Lucent()
    .onPort(process.env.PORT || 3004)
    .withTools([])
    .mongo(
        process.env.MONGO_URL ||
            'mongodb://pangaso:pangaso1@ds149596.mlab.com:49596/pangaso',
        process.env.DATABASE || 'lucent-admin-3'
    )
    .start()
