import React, { Component } from 'react'
import Header from '../layout/header_main'
import Footer from '../layout/footer_main'

export default class SimplePage extends Component {
  render() {
    return (
      <div>
        <Header />
        SimplePage
        <Footer />
      </div>
    )
  }
}
