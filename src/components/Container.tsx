import { FaSearch } from "react-icons/fa"
import "./Container.css"
import User from "./User"
import { useRef } from "react"
import { useGlobalContext } from "../AppContext"

const Container = () => {
  const { setSearch, users, setPage } = useGlobalContext()
  const searchRef = useRef<HTMLInputElement>(null)
  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setSearch(searchRef.current?.value || "")
    setPage(1)
  }

  return (
    <>
      <section className="section">
        <form className="search" onSubmit={searchSubmitHandler}>
          <input type="text" ref={searchRef} placeholder="search" />
          <button className="search-btn" type="submit">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="section users">
        {users.length > 0 ? (
          users.map((user) => {
            return <User user={user} key={user.id} />
          })
        ) : (
          <h3>Not found</h3>
        )}
      </section>
    </>
  )
}

export default Container
