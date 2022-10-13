import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetGame } from '../redux/actions';

import Header from '../components/Header';
import Message from '../components/Message';
import '../CSS/Feedback.css';
import '../CSS/button.css';

class Feedback extends React.Component {
  backToLogin = () => {
    const { history, reset } = this.props;
    reset();
    history.push('/');
  }

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <div data-testid="feedback-text" className="feedback-container">
        <Header />
        <Message />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.backToLogin }
          className="game-button"
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.goToRanking }
          className="game-button"
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.object,
  reset: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetGame()),
});

export default connect(null, mapDispatchToProps)(Feedback);
