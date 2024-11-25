import { schedules } from '@trigger.dev/sdk/v3'

export const firstScheduledTask = schedules.task({
  id: 'first-scheduled-task',
  cron: '*/5 * * * *', // every 5 minutes (UTC timezone)
  run: async (payload, { ctx }) => {
    // do something
  },
})
