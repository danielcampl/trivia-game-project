import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { saveGravatar } from '../redux/actions';

import '../CSS/Header.css';

class Header extends React.Component {
  getGravatar = () => {
    const { email, gravatarDispatch } = this.props;
    const hash = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;
    gravatarDispatch(gravatar);
    return gravatar;
  };

  render() {
    const { name, score } = this.props;
    return (
      <header>
        <div className="header-container">
          <div id="name">
            <p>Nome: </p>
            <p data-testid="header-player-name" id="name-p">
              {name}
            </p>
          </div>
          <div className="score">
            <p>Score:</p>
            <p data-testid="header-score" id="score">
              {score}
            </p>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  name: store.player.name,
  email: store.player.email,
  score: store.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  gravatarDispatch: (questions) => dispatch(saveGravatar(questions)),
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
