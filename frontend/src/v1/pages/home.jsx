import axios from 'axios';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Dropdown,
  Grid,
  Icon,
  Input,
  Loader,
  Modal,
  Segment,
} from 'semantic-ui-react';
import AppContext from '../../context';
import FilterResults from '../components/filter_results';
import HintedInput from '../components/form/input_hinted';
import '../sass/app.scss';
export default class newHome extends Component {
  static contextType = AppContext;

  state = {
    isLoading: false,
    showingQP: false,
    dbQP: [],
    showedQP: [],
    dados: {},
    categoria: null,
  };

  setQpId = (hint) => {
    let selectedQP = this.state.dbQP.filter((qp) => qp.ID == hint.ID);
    console.log(selectedQP);
    this.setState({ isLoading: true });
    selectedQP.map((qp) => {
      axios(`${import.meta.env.VITE_API_URL}/qp/${qp.ID}`)
        .then((response) => {
          console.log(response.data);
          this.context.showQp([response.data]);
          this.setState({ isLoading: false });
        })
        .catch((e) => {
          console.log(e);
          console.log('Não foi possível capturar a queixa principal');
        });
    });
  };

  changeCategoria = (categoriaId) => (e) => {
    if (this.state.categoria == categoriaId) {
      this.setState({ categoria: null });
    } else {
      this.setState({ categoria: categoriaId });
    }
  };

  handleChangeDados = (e, { name, value }) => {
    let dados = this.state.dados;
    dados[name] = parseFloat(value);
    this.setState({ dados });
  };

  searchResults = () => {
    this.setState({ isLoading: true });
    console.log(this.state.dados, Object.entries(this.state.dados));
    let url = `filter?${Object.entries(this.state.dados)
      .map((dado) => `${dado[0]}=${dado[1]}&`)
      .join('')}`;
    url += `categoria=${this.state.categoria}`;
    console.log(url);
    axios(`${import.meta.env.VITE_API_URL}/${url}`)
      .then((response) =>
        this.setState({ results: response.data, isLoading: false }, () =>
          console.log(this.state.results)
        )
      )
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    if (!this.state.dbQP.length) {
      this.setState({ isLoading: true });
      axios(`${import.meta.env.VITE_API_URL}/qp`)
        .then((response) => {
          let data = [];
          response.data.forEach((qp) => {
            let tmp = {};
            tmp.ID = qp.ID;
            tmp.label = (
              <div>
                <strong>{qp.sintoma}</strong>
                <p>{qp.observacao}</p>
              </div>
            );
            tmp.value = qp.sintoma;
            tmp.content = `${qp.sintoma} ${qp.observacao}`;
            data.push(tmp);
          });
          this.setState({ dbQP: data, isLoading: false });
        })
        .catch(() => console.log('Não foi possível capturar as categorias'));
      // qpData().then(data => {
      //   this.setState({ dbQP : data }, () => console.log(this.state))
      // })
    }
  }

  render() {
    return [
      <Modal
        size="tiny"
        open={this.state.isLoading}
        onClose={() => this.setState({ isLoading: false })}
      >
        <Loader indeterminate>Carregando...</Loader>
      </Modal>,

      <Container id="home-search-box" text>
        <img src="/sm_carol.svg" />
        <Segment>
          <Grid className="queixa">
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <HintedInput
                onChange={this.handleChange}
                onOptionClick={this.setQpId}
                placeholder="Digite aqui a queixa principal"
                hints={this.state.dbQP}
                fluid
              />
            </Grid.Column>
          </Grid>
          <Grid className="categoria">
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Button
                onClick={this.changeCategoria(1)}
                positive={this.state.categoria === 1}
                fluid
              >
                Gestante
              </Button>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Button
                onClick={this.changeCategoria(3)}
                positive={this.state.categoria === 3}
                fluid
              >
                Criança
              </Button>
            </Grid.Column>
          </Grid>
          <h4>Filtrar por sinais</h4>
          <Grid className="filters">
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Input
                fluid
                name="pas"
                type="number"
                label={{ basic: true, content: 'mmHg' }}
                labelPosition="right"
                placeholder="Pressão sitólica"
                onChange={this.handleChangeDados}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Input
                fluid
                name="pad"
                type="number"
                label={{ basic: true, content: 'mmHg' }}
                labelPosition="right"
                placeholder="Pressão diastólica"
                onChange={this.handleChangeDados}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Input
                fluid
                name="fc"
                type="number"
                label={{ basic: true, content: 'bpm' }}
                labelPosition="right"
                placeholder="FC"
                onChange={this.handleChangeDados}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Input
                fluid
                name="fr"
                type="number"
                label={{ basic: true, content: 'ipm' }}
                labelPosition="right"
                placeholder="FR"
                onChange={this.handleChangeDados}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Input
                fluid
                name="spo2"
                type="number"
                label={{ basic: true, content: '%' }}
                labelPosition="right"
                placeholder="Saturação de O2"
                onChange={this.handleChangeDados}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Input
                fluid
                name="temp"
                type="number"
                label={{ basic: true, content: 'ºC' }}
                labelPosition="right"
                placeholder="Temperatura"
                onChange={this.handleChangeDados}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Input
                fluid
                name="glasgow"
                type="number"
                placeholder="Glasgow"
                onChange={this.handleChangeDados}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Input
                fluid
                name="glicemia"
                type="number"
                label={{ basic: true, content: 'ml/dL' }}
                labelPosition="right"
                placeholder="HGT"
                onChange={this.handleChangeDados}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Input
                fluid
                name="dor"
                type="number"
                placeholder="Dor"
                onChange={this.handleChangeDados}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Button animated primary fluid onClick={this.searchResults}>
                <Button.Content visible>Filtrar</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Grid.Column>
          </Grid>
          {/* <pre>{JSON.stringify(this.state.dados, null, 2)}</pre> */}
        </Segment>
        {this.state.results ? (
          <FilterResults results={this.state.results} />
        ) : null}
      </Container>,
      <footer className="main">
        <Dropdown text="Classificações">
          <Dropdown.Menu>
            <Dropdown.Item text="Dor" />
            <Dropdown.Item text="Glasgow" description="Nível de consciência" />
          </Dropdown.Menu>
        </Dropdown>
        <br />
        Encontrou algum erro? Sugestão? Críticas?{' '}
        <a
          href="https://gitlab.com/medapps/carol/frontend/issues"
          target="_blank"
        >
          Registre detalhadamente aqui
        </a>
        <br />
        <a
          href="/manual-acolhimento-classificacao-de-risco.pdf"
          target="_blank"
        >
          Link para referência
        </a>
      </footer>,
    ];
  }
}
