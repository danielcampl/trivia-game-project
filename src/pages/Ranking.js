import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetGame } from '../redux/actions';

import '../CSS/button.css';

class Ranking extends React.Component {
  backToLogin = () => {
    const { history, reset } = this.props;
    reset();
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          localStorage.ranking !== undefined
            ? JSON.parse(localStorage.ranking)
              .sort((a, b) => b.score - a.score).map((player, index) => (
                <div key={ `${player.name}${index}` }>
                  <p data-testid={ `player-name-${index}` }>{player.name}</p>
                  <p data-testid={ `player-score-${index}` }>{player.score}</p>
                </div>
              ))
            : <p>Nenhum jogador encontrado</p>
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.backToLogin }
          className="game-button"
        >
          Back to home
        </button>
      </div>);
  }
}

Ranking.propTypes = {
  history: PropTypes.object,
  reset: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetGame()),
});

export default connect(null, mapDispatchToProps)(Ranking);
