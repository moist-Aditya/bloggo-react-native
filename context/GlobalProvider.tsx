import { getCurrentUser } from "@/lib/appwrite"
import { createContext, useContext, useEffect, useState } from "react"
import * as SecureStore from "expo-secure-store"

const GlobalContext = createContext<any>(undefined)

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider")
  }
  return context
}

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchContext = async () => {
    console.log("GlobalContext fetching data (FROM DB)")

    const session = await getCurrentUser()
    return session
  }

  const fetchContextFromLocalStore = async () => {
    console.log("GlobalContext fetching data (FROM LOCAL STORAGE)")

    const session = await SecureStore.getItemAsync("session")
    if (session) {
      return JSON.parse(session)
    }
    return null
  }

  const refetchContext = async () => {
    fetchContext()
  }

  useEffect(() => {
    const getContext = async () => {
      try {
        let session
        session = await fetchContextFromLocalStore()

        if (!session) {
          console.log("Session not found in LOCAL STORAGE.. trying DB")
          session = await fetchContext()
        }
        if (!session) {
          console.log("No active session found in DB")
          setIsLoading(false)
          return
        }

        setUser(session)
        setIsLoggedIn(true)
      } catch (error) {
        console.log("ERROR GETTING CONTEXT: ", error)
      } finally {
        setIsLoading(false)
      }
    }

    getContext()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        refetchContext,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
