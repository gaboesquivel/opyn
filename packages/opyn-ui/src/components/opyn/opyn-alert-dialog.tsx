import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@opyn/ui'

export function OpynAlertDialog({
  trigger,
  title,
  description,
  body,
  actions,
}: {
  trigger: React.ReactNode
  title: string
  description: string
  body: React.ReactNode
  actions: React.ReactNode
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="text-center flex flex-col items-center">
        <AlertDialogHeader className="flex flex-col items-center">
          <AlertDialogTitle className="text-brand-500 text-center">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="py-4 text-center">
            {description}
          </AlertDialogDescription>
          <div className="flex flex-col items-center gap-4 w-full">{body}</div>
        </AlertDialogHeader>
        <div className="flex flex-row gap-4">{actions}</div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
