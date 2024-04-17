import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import { remove as removeDiacritics } from 'diacritics'

export default class HintedInput extends Component {

  state = {
    isOpened: false,
    filteredHints: [],
    value : null
  }

  handleChange = hint => () => {
    this.setState({ value: hint.value, isOpened: false }, () => console.log(this.state))
    if(this.props.onOptionClick) this.props.onOptionClick(hint)
  }

  filterHints = (e, { value }) => {
    console.log(this.state.value)
    let regex = new RegExp(`.*${removeDiacritics(value)}.*`, 'gi')
    let filteredHints = this.props.hints.filter( hint => {
      return removeDiacritics(hint.content).match(regex) !== null
    })
    console.log(value, regex, this.props.hints, filteredHints )
    if(filteredHints.length && value !== ''){
      this.setState({ 
        isOpened: true,
        filteredHints,
        value
       })
    }else{
      this.setState({ 
        isOpened: false,
        filteredHints: [],
        value
      })
    }
  }

  render() {
    return (
      <Input {...this.props}
        onChange={this.filterHints}
        value={this.state.value}
      >
        <input/>
        {this.state.filteredHints.length ? <div className="input_hint">{this.state.filteredHints.map(hint => (
          this.state.isOpened ? <button onClick={this.handleChange(hint)}>{hint.label}</button> : null
        ))}</div> : null}
      </Input>
    )
  }
}
