import React, { useEffect } from 'react';
// Firebase:
import { auth } from '../../utils/firebase';
import { signInAnonymously } from 'firebase/auth';

function SignInAnonymously() {
  useEffect(() => {
    // at this point we need to sign them in anonymously to get their browser's uid
    signInAnonymously(auth)
      .then(() => {
        // ******* set ondisconnect rules here?
      })
      .catch((error) => {
        // eslint-disable-next-line no-unused-vars
        const errorCode = error.code;
        // eslint-disable-next-line no-unused-vars
        const errorMessage = error.message;
      });
  }, []);
  return <div></div>;
}

export default SignInAnonymously;
