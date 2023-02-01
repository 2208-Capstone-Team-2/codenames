/* eslint-disable react/prop-types */
import React from 'react';

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
    ''
  );
}

export default Popup;
