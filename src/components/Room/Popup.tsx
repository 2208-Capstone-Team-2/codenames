import { Check } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <button
        disabled={props.children.props.canBeClosed}
        className="close-btn"
        onClick={() => {
          props.setTrigger(false);
        }}
      >
        {' '}
        close
      </button>
      {props.children}
    </div>
  ) : (
    <></>
  );
}

export default Popup;
