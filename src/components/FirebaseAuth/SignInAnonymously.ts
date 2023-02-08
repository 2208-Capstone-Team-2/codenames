import React, { useEffect, useState } from 'react';
// Firebase:
import { auth } from '../../utils/firebase';
import { signInAnonymously } from 'firebase/auth';

function SignInAnonymously() {
  // A bool that is set to true only when the fb signin async is finished!
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // at this point we need to sign them in anonymously to get their browser's uid
    signInAnonymously(auth)
      .then(() => {
        setIsSignedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }, []);

  return isSignedIn;
}

export default SignInAnonymously;
