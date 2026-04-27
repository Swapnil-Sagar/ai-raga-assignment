import { useCallback } from 'react'

export const useNotification = () => {
  const requestAccess = useCallback(async () => {
    if (!('Notification' in window)) {
      return false
    }

    if (Notification.permission === 'granted') {
      return true
    }

    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }, [])

  const sendNotification = useCallback(async (title: string, body: string) => {
    const hasAccess = await requestAccess()
    if (!hasAccess) {
      return false
    }

    const registration = await navigator.serviceWorker.getRegistration()

    if (registration) {
      await registration.showNotification(title, {
        body,
        icon: '/vite.svg',
        badge: '/vite.svg',
      })
      return true
    }

    new Notification(title, { body })
    return true
  }, [requestAccess])

  return { sendNotification, requestAccess }
}
