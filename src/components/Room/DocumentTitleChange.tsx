import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

/**
 * A custom hook that change's the `document title` (the name on the browser's tab)
 * to include whatever roomId is in the Params. EG)
 * CODENAMES | jolly-panda
 */
function DocumentTitleChange() {
  const { roomId } = useParams();
  useEffect(() => {
    document.title = `CODENAMES | ${roomId}`;
  }, []);
}

export default DocumentTitleChange;
