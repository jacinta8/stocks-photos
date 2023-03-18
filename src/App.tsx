import React, { useEffect } from "react"
import Container from "./components/Container"
import { useGlobalContext } from "./AppContext"

import "./App.css"

function App() {
  const { isLoading } = useGlobalContext()

  return (
    <main>
      {isLoading ? <h1 className="loading">Loading...</h1> : <Container />}
    </main>
  )
}

export default App
