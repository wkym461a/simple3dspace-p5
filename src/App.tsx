import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

import { TestSketch } from '~/sketch';

const App = () => {
  return (
    <>
      <ReactP5Wrapper sketch={TestSketch.circle} />
    </>
  )
}

export { App }
