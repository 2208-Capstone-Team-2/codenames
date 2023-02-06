import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const LinkToClipboard = () => {
    const url: string = window.location.href;
    return (
        <div>
            <CopyToClipboard text={url}>
                <button>
                    Copy this rooms link!
                </button>
            </CopyToClipboard>
        </div>
    );
};

export default LinkToClipboard;