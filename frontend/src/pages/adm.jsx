import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Container, Input, TextArea, Form, Checkbox, Button, Label, Modal, Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios'
import nestedProperty from 'nested-property'
import SinaisBox from '../components/sinais_box'

export default class Home extends Component {

  state = {
    isModalOpened: false,
    isLoading: false,
    dbQP: [],
    dbClassificacao: [],
    dbCategorias: [],
    dbSinais: [],
    formData: {
      qp: {
        sintoma: '',
        observacao: '',
        categoria: ''
      },
      classificacao: {
        vermelho: {
          sintomas: []
        },
        laranja: {
          sintomas: []
        },
        amarelo: {
          sintomas: []
        },
        verde: {
          sintomas: []
        },
        azul: {
          sintomas: []
        }
      }
    }
  }

  addSintoma = classificacao => e => {
    let formData = this.state.formData
    let sintomas = formData.classificacao[classificacao].sintomas
    sintomas.push({})
    // nestedProperty.set(formData, `classificacao[${classificacao}].sintomas[${sintomas.length}]`, {})
    this.setState({ formData }, () => console.log(this.state))
  }

  handleChange = (e, data) => {
    let formData = this.state.formData
    if (data) {
      if (data.format == 'float') data.value = data.value.replace(/,/g, '.')
      console.log(data.value)
      nestedProperty.set(formData, data.controller, data.value)
      this.setState({ formData }, () => console.log(this.state))
    }
  }

  handleSubmit = () => {
    this.setState({ isLoading: true })
    let formData = this.state.formData
    axios.put(`${process.env.REACT_APP_API}/registro`, formData, {
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        console.log(response.data)
        this.setState({
          isModalOpened: !this.state.isModalOpened,
          isLoading: false
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    axios(`${process.env.REACT_APP_API}/categorias`)
      .then(response => this.setState({ dbCategorias: response.data }, () => console.log(this.state)))
      .catch(() => console.log("Não foi possível capturar as categorias"))

    axios(`${process.env.REACT_APP_API}/classificacao`)
      .then(response => this.setState({ dbClassificacao: response.data, isLoading: false }, () => console.log(this.state)))
      .catch(() => console.log("Não foi possível capturar a classificação de risco"))

    axios(`${process.env.REACT_APP_API}/sinais`)
      .then(response => this.setState({ dbSinais: response.data }, () => console.log(this.state)))
      .catch(() => console.log("Não foi possível capturar os sinais"))

    axios(`${process.env.REACT_APP_API}/metrics`)
      .then(response => this.setState({ dbMetrics: response.data }, () => console.log(this.state)))
      .catch(() => console.log("Não foi possível capturar as estatísticas"))
  }

  render() {
    const state = this.state

    return [
      <header><Link to="/">Voltar</Link></header>,
      <Modal size='tiny' open={this.state.isLoading} onClose={() => this.setState({ isLoading: false })}>
        <Loader indeterminate>Carregando...</Loader>
      </Modal>,
      <Modal size='tiny' open={this.state.isModalOpened} onClose={() => this.setState({ isModalOpened: false })}>
        <Modal.Header>Registro concluído</Modal.Header>
        <Modal.Content>
          <p>Parabéns! Não desista! Vá para o próximo registro. Para isso você precisa atualizar a página manualmente.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative>No</Button>
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content='Yes'
          />
        </Modal.Actions>
      </Modal>,
      <Container>
        <Form>
          <Segment style={{ paddingTop: '45px' }}>
            <div className="metrics"><div class="loading" style={{ width: `${this.state.dbMetrics ? this.state.dbMetrics.cadastros/this.state.dbMetrics.meta*100 : 0}%`}}><div className="percent">{this.state.dbMetrics ? this.state.dbMetrics.cadastros/this.state.dbMetrics.meta*100 : 0}%</div></div></div>
            <header><h1>Queixa principal</h1></header>
            <main>
              <div>
                <Input
                  fluid
                  label={{ icon: 'asterisk' }}
                  labelPosition='right corner'
                  list='sintomas'
                  controller='qp.sintoma'
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                  placeholder='Escreva aqui a queixa principal' />
                <datalist id='sintomas'>
                  {this.state.dbQP.map(qp => <option value={qp.sintoma} />)}
                </datalist>
              </div>
              <TextArea
                controller='qp.observacao'
                onChange={this.handleChange}
                onBlur={this.handleChange}
                placeholder='Observação'
              />
              <Form.Field>
                <Checkbox
                  radio
                  name="categoria"
                  value=""
                  controller="qp.categoria"
                  checked={this.state.formData.qp.categoria === ""}
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                  label="Nenhuma categoria especial" />
              </Form.Field>
              {this.state.dbCategorias.map(categoria => (
                <Form.Field>
                  <Checkbox
                    radio
                    name="categoria"
                    value={categoria.ID}
                    controller="qp.categoria"
                    checked={this.state.formData.qp.categoria === categoria.ID}
                    onChange={this.handleChange}
                    onBlur={this.handleChange}
                    label={categoria.categoria} />
                </Form.Field>
              ))}
            </main>
          </Segment>
          {this.state.dbClassificacao.map(classificacao => (
            <Segment className={`classificacao ${classificacao.nome}`}>
              <header><h2>{classificacao.nome}</h2></header>
              <h3>Sinais</h3>
              {this.state.dbSinais.map(sinal => {
                const classificacaoState = this.state.formData.classificacao[classificacao.nome]
                return (
                  <SinaisBox header={[
                    <h4>{sinal.nome}</h4>,
                    classificacaoState.sinais ? classificacaoState.sinais[sinal.identificador] ? (classificacaoState.sinais[sinal.identificador].min !== '' || classificacaoState.sinais[sinal.identificador].max !== '') ? <span> {`>= ${classificacaoState.sinais[sinal.identificador].max || ''} ${sinal.unidade} ou <= ${classificacaoState.sinais[sinal.identificador].min || ''} ${sinal.unidade}`}</span> : null : null : null
                  ]}>
                    <section>
                      <Form.Field className='flex' >
                        <Input
                          label={{ basic: false, content: sinal.unidade }}
                          labelPosition='right'
                          controller={`classificacao.${classificacao.nome}.sinais.${sinal.identificador}.max`}
                          onChange={this.handleChange}
                          onBlur={this.handleChange}
                          format="float"
                          placeholder='MAIOR OU IGUAL QUE'
                        >
                          <Label basic>{sinal.nome}</Label>
                          <input />
                          <Label>{sinal.unidade}</Label>
                        </Input>

                        <Input
                          label={{ basic: false, content: sinal.unidade }}
                          labelPosition='right'
                          type='text'
                          placeholder='MENOR OU IGUAL QUE'
                          controller={`classificacao.${classificacao.nome}.sinais.${sinal.identificador}.min`}
                          onChange={this.handleChange}
                          onBlur={this.handleChange}
                          format="float"
                        >

                        </Input>
                      </Form.Field>
                      <TextArea
                        controller={`classificacao.${classificacao.nome}.sinais.${sinal.identificador}.descritor`}
                        onChange={this.handleChange}
                        onBlur={this.handleChange}
                        placeholder='Descritor'
                      />
                    </section>
                  </SinaisBox>
                )
              })}
              <h3>Sintomas</h3>
              {this.state.formData.classificacao[classificacao.nome].sintomas.map((sintoma, i) => (
                <Segment>
                  <Form.Field>
                    <Input
                      fluid
                      controller={`classificacao.${classificacao.nome}.sintomas.${i}.sintoma`}
                      onChange={this.handleChange}
                      onBlur={this.handleChange}
                      placeholder='Escreva qual o sintoma' />
                  </Form.Field>
                  <TextArea
                    controller={`classificacao.${classificacao.nome}.sintomas.${i}.descritor`}
                    onChange={this.handleChange}
                    onBlur={this.handleChange}
                    placeholder='Descritor, se existir'
                  />
                </Segment>
              ))}

              <Button onClick={this.addSintoma(classificacao.nome)}>Adicionar sintoma</Button>
            </Segment>
          ))}
          <Button primary type="submit" onClick={this.handleSubmit}>Cadastrar</Button>
          <pre>
            {JSON.stringify(this.state.formData, null, 2)}
          </pre>
          Bem vindo ao CAROL.<br />
          <Link to="/adm">Acessar página de administração.</Link>
        </Form>
      </Container>
    ]
  }
}
