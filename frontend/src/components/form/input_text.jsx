import React, { Component } from 'react';

class InputText extends Component {
  constructor(props){
    super(props)

    this.state = {
      focused_or_filled: false
    }

    this.label = React.createRef();
    this.input = React.createRef();
  }

  // Modifica state.focus para true
  onFocus = (e) => {
    this.setState({ focused_or_filled: true }, this.setLabelStyle);
  }

  // Modifica state.focus para false caso esteja vazio
  onBlur = (e) => {     
    if(!e.target.value){    
    this.setState({ focused_or_filled: false }, this.setLabelStyle);
    }
  }

  // Adiciona ou remove classe css baseado em state.focus
  setLabelStyle = () => {
    if(this.state.focused_or_filled){
      this.label.current.classList.add("focused_or_filled");
      this.input.current.classList.add("focused_or_filled");
    }else{
      this.label.current.classList.remove("focused_or_filled");
      this.input.current.classList.remove("focused_or_filled");
    }
  }

  componentDidMount(){
    this.input.current.focus();
    this.input.current.blur();
  }

  render() {
    return (
      <div className="input_wrap">
        <label for={this.props.id} ref={this.label}>{this.props.placeholder}</label>
        <input type="text" id={this.props.id} name={this.props.id} ref={this.input} className={this.props.className} onFocus={this.onFocus} onBlur={this.onBlur}/>
      </div>
    );
  }
}

export default InputText;