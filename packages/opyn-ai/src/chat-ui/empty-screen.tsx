import { Card } from '@opyn/ui'

export function EmptyScreen() {
  return (
    <Card variant="outline" className="sm:max-w-2xl sm:px-4 mx-auto">
      <p className="font-semibold text-sm text-center">
        Welcome to <span className="text-brand-500">OpynAI</span> Chatbot!
      </p>
      <p className="text-sm text-center">
        This a dev environment, first reply is slow due cold starts.
      </p>
    </Card>
  )
}
