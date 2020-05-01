/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import './shell.css';
import { ShellSvg } from '../icons';

const Shell = ({ color, opened, clickShuffle }) => {
  const stylesCoin = {
    backgroundColor: color,
  };

  let classes = 'shell-icon';

  if (opened) {
    classes += ' hidden';
  }

  return (
    <li
      className="shell"
      onClick={clickShuffle}
    >
      <ShellSvg className={classes} />
      <div className="shell-color" style={stylesCoin} />
    </li>
  );
};

Shell.propTypes = {
  color: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  clickShuffle: PropTypes.func.isRequired,
};

export default Shell;
