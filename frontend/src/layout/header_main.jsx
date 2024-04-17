import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HeaderMain extends Component {
  render() {
    return (
      <header>
        <ul>
          <li>React {React.version} HEADER</li>
          <li>
            <Link to="/">SimplePage</Link> | 
            <Link to="/pageAsync">AsyncPage</Link> 
          </li>
        </ul>
      </header>
    )
  }
}

