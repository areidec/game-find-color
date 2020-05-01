import React from 'react';

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

export default Shell;
