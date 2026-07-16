import React, { useEffect, useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from './api/user.api.js'
import { login, logout } from './store/slice/authSlice.js'

const RootLayout = () => {
  const dispatch = useDispatch()
  const [isAuthChecking, setIsAuthChecking] = useState(true)

  useEffect(() => {
    let isMounted = true

    const bootstrapAuth = async () => {
      try {
        const data = await getCurrentUser()
        const user = data?.user

        if (user) {
          dispatch(login(user))
        } else {
          dispatch(logout())
        }
      } catch (error) {
        dispatch(logout())
      } finally {
        if (isMounted) setIsAuthChecking(false)
      }
    }

    bootstrapAuth()

    return () => {
      isMounted = false
    }
  }, [dispatch])

  if (isAuthChecking) {
    return null
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default RootLayout