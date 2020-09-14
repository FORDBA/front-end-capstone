import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Guild } from "./components/Guild.js"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Guild />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)