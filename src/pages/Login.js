import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import apiPerguntas from '../services.js/triviaApi';
import { goToSettings, emailAction, nameAction } from '../redux/actions';

import '../CSS/Login.css';
import '../CSS/button.css';
import '../CSS/input.css';
import Animation from '../image/start.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      buttonEnable: false,
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      this.changeButton();
    });
  };

  changeButton = () => {
    const { email, name } = this.state;
    this.setState({
      buttonEnable: name.length > 1 && this.emailVerify(email),
    });
  };

  emailVerify = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  chamaApi = async (event) => {
    event.preventDefault();
    const response = await apiPerguntas();
    localStorage.setItem('token', response.token);
    const { history, emailDispatch, nameDispatch } = this.props;
    const { email, name } = this.state;
    emailDispatch(email);
    nameDispatch(name);
    history.push('/teladojogo');
  };

  handleSubmit = () => {
    const { dispatchSettings, history } = this.props;
    dispatchSettings();
    history.push('/settings');
  };

  render() {
    const { buttonEnable, email, name } = this.state;
    return (
      <div className="form-container">
        <div className="login-left-container">
          <h1>TRIVIA</h1>
          <img src={ Animation } alt="start" id="animation" />
        </div>
        <div className="login-form-container">
          <form className="login-right-container">
            <h1>Login</h1>
            <div className="input-form">
              <input
                type="text"
                name="name"
                data-testid="input-player-name"
                placeholder="Digite seu nome"
                onChange={ this.handleChange }
                value={ name }
                className="input-login"
              />
            </div>
            <div className="input-form">
              <input
                type="text"
                name="email"
                data-testid="input-gravatar-email"
                placeholder="Digite seu email"
                onChange={ this.handleChange }
                value={ email }
                className="input-login"
              />
            </div>
            <div className="btn-container">
              <button
                type="submit"
                data-testid="btn-play"
                disabled={ !buttonEnable }
                onClick={ this.chamaApi }
                className="button"
                id="btn-form"
              >
                Play
              </button>
              <button
                type="submit"
                data-testid="btn-settings"
                onClick={ this.handleSubmit }
                className="button"
                id="btn-form"
              >
                Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSettings: () => dispatch(goToSettings()),
  emailDispatch: (email) => dispatch(emailAction(email)),
  nameDispatch: (name) => dispatch(nameAction(name)),
});

Login.propTypes = {
  dispatchSettings: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  emailDispatch: PropTypes.func.isRequired,
  nameDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
