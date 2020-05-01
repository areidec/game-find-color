import React from 'react';
import './modal-window.css';
import PropTypes from 'prop-types';

const ModalWindow = ({ opened, restart }) => {
  let classes = 'modal-window';

  if (opened) {
    classes += ' display';
  }

  return (
    <div className={classes}>
      <div className="modal-window-overlay" />
      <div className="modal-window-container">
        <h2>Congratulations!</h2>
        <p>you have find all colors!</p>
        <p>if you whant start again click button below this text</p>
        <button type="button" onClick={restart}>Start again</button>
      </div>
    </div>
  );
};

ModalWindow.propTypes = {
  opened: PropTypes.bool.isRequired,
  restart: PropTypes.func.isRequired,
};

export default ModalWindow;
