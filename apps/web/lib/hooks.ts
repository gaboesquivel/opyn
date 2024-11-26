import { useEffect } from 'react'

export function useCmdK(onCmdK: () => void) {
  useEffect(() => {
    if (!window) {
      console.error('Window is not defined')
      return
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        if (typeof onCmdK === 'function') onCmdK()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onCmdK])
}
