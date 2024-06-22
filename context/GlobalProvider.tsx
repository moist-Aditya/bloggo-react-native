import { getCurrentUser } from "@/lib/appwrite"
import { createContext, useContext, useEffect, useState } from "react"

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
    console.log("GlobalContext fetching data..")

    getCurrentUser()
      .then((res) => {
        if (res) {
          setUser(res)
          setIsLoggedIn(true)
        } else {
          setUser(null)
          setIsLoggedIn(false)
        }
      })
      .finally(() => setIsLoading(false))
  }

  const refetchContext = async () => {
    fetchContext()
  }

  useEffect(() => {
    fetchContext()
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
