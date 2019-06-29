const { Action } = require(process.env.CI_ENVIRONMENT
    ? '../dist/server/main'
    : 'pangaso')

class SendWelcomeEmail extends Action {
    async handle() {}
}

module.exports = SendWelcomeEmail
