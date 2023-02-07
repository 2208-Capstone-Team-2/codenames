import React, { useEffect } from 'react';
// Firebase:
import { auth } from '../../utils/firebase';
import { signInAnonymously } from 'firebase/auth';

function SignInAnonymously() {
  useEffect(() => {
    // at this point we need to sign them in anonymously to get their browser's uid
    signInAnonymously(auth)
      .then(() => {
        // ?
        console.log('signed in!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }, []);
  return <></>;
}

export default SignInAnonymously;
