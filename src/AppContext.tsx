import React from "react"
import { useState, useEffect, useContext } from "react"
import { User } from "./components/User"

type AppProviderProps = {
  children: React.ReactNode
}

type AppContextProps = {
  isLoading: boolean
  users: User[] | []

  search: string
  setSearch: (value: string) => void
}

type UserSet = {
  results: User[]
}

const AppContext = React.createContext<AppContextProps>({
  isLoading: false,
  users: [],
  search: "",
  setSearch: () => {},
})

const AppProvide = ({ children }: AppProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const clientID = `?client_id=oCROzYACpBWUqgv2bHhZrnqTJYxLjlVznigsD7cDVpQ`
  const mainUrl = `https://api.unsplash.com/photos/`
  const searchUrl = `https://api.unsplash.com/search/photos/`

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const urlPage = `&page=${page}`
      const urlQuery = `&query=${search}`

      const url = search
        ? `${searchUrl}${clientID}${urlPage}${urlQuery}`
        : `${mainUrl}${clientID}${urlPage}`

      console.log("url", url)
      const response = await fetch(url)

      if (!response.ok) throw new Error("Failed to fetch")
      const result: UserSet | User[] = await response.json()

      if ("results" in result) {
        if (page === 1) {
          setUsers(result.results)
        } else {
          setUsers((oldUsers) => {
            return [...oldUsers, ...result.results]
          })
        }
      } else {
        if (page === 1) {
          setUsers(result)
        } else {
          setUsers((oldData) => {
            return [...oldData, ...result]
          })
        }
      }

      setIsLoading(false)
    }

    fetchData()
  }, [search, page])

  useEffect(() => {
    const event = function () {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 5
      ) {
        setPage((oldPage) => oldPage + 1)
      }
    }

    window.addEventListener("scroll", event)

    return () => {
      window.removeEventListener("scroll", event)
    }
  }, [])

  return (
    <AppContext.Provider value={{ isLoading, users, search, setSearch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvide }
