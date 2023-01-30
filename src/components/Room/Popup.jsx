import React from 'react';

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <button
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
