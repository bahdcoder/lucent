const { Action } = require(process.env.CI_ENVIRONMENT
    ? '../dist/server/main'
    : 'lucent-admin')

class SendWelcomeEmail extends Action {
    async handle() {}
}

module.exports = SendWelcomeEmail
