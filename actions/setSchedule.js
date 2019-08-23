'use strict'
const ActionHero = require('actionhero')

module.exports = class SetScheduleAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'setSchedule'
    this.description = 'set a colour channels auto schedule'
    this.outputExample = {}
    this.inputs = {
      channel: {
        required: true,
        validator: (param, connection, actionTemplate) => {
          const allColours = Object.keys(ActionHero.api.autoSchedule.schedule)
          if (!allColours.includes(param)) {
            throw new Error('channel not one of ' + allColours.join(','))
          }
        }
      },
      schedule: {
        required: true
      }
    }
  }

  async run (data) {
    await ActionHero.api.autoSchedule.setSchedule(data.params.channel, data.params.schedule,data.connection.id)
  }
}