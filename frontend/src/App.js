import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './sass/app.scss';

import QpDescription from './components/qp_description'
import { Modal } from 'semantic-ui-react'

// Pages
import Home from './pages/home';
import Adm from './pages/adm';
import Edit from './pages/edit';
import asyncComponent from './functions/async_component';

import AppContext from './context' 

const AsyncComponent = asyncComponent(() => import("./pages/async_page"));

class App extends Component {
  constructor(props){
    super(props)

    // State com todos os dados globais necessários para a aplicação
    this.state = {
      isShowingQp: false,
      showedQP: null,
      showQp: showedQP => this.setState({
        isShowingQp: true,
        showedQP
      })
    };
  }

  render() {
    return [
      <Modal size='small' open={this.state.isShowingQp} onClose={() => this.setState({ isShowingQp: false })}>
        {this.state.showedQP ? <QpDescription showedQP={this.state.showedQP} /> : null}
      </Modal>,
    <Router>
      <AppContext.Provider value={this.state} >
      <Switch>
        <Route exact path="/" component={Home} />   
        <Route exact path="/adm" component={Adm} />
        <Route exact path="/edit" component={Edit} />
        <Route exact path="/pageAsync" component={AsyncComponent} />
        <AppContext.Consumer>
        { context =>  null }
        </AppContext.Consumer>
      </Switch>
      </AppContext.Provider>
    </Router>
    ]
  }
}

export default App;
