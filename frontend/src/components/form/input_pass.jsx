import React, { Component } from 'react';

class InputPass extends Component {
  constructor(props){
    super(props)

    this.state = {
      focusedOrFilled: false,
      inputType: "password",
      eyeIcon: "img/icones/olho.svg"
    }

    this.label = React.createRef();
    this.input = React.createRef();
  }

  // Modifica state.focus para true
  onFocus = (e) => {
    this.setState({ focusedOrFilled: true }, this.setLabelStyle);
  }

  // Modifica state.focus para false caso esteja vazio
  onBlur = (e) => {    
    if(!e.target.value){    
    this.setState({ focusedOrFilled: false }, this.setLabelStyle);
    }
  }

  // Adiciona ou remove classe css baseado em state.focus
  setLabelStyle = () => {
    if(this.state.focusedOrFilled){
      this.label.current.classList.add("focused_or_filled");
      this.input.current.classList.add("focused_or_filled");
    }else{
      this.label.current.classList.remove("focused_or_filled");
      this.input.current.classList.remove("focused_or_filled");
    }
  }

  toggleType = (e) => {
      if(this.state.inputType === "password"){
        this.setState({ inputType : "text" , eyeIcon : "img/icones/olho-cortado.svg" })
      }else{
        this.setState({ inputType : "password", eyeIcon : "img/icones/olho.svg"})
      }
  }

  render() {
    return (
      <div className="input_wrap">
        <label for={this.props.id} ref={this.label}>{this.props.placeholder}</label>
        <input type={this.state.inputType} id={this.props.id} name={this.props.id} ref={this.input} className={this.props.className} onFocus={this.onFocus} onBlur={this.onBlur}/>
        <img className="inside_icon" onClick={this.toggleType} src={this.state.eyeIcon} alt="Alternar visualização de senha"/>
      </div>
    );
  }
}

export default InputPass;