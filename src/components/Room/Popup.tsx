import React from 'react';

function Popup(props: any) {
  return props.trigger ? (
    <div className={props.className}>
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
