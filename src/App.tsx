import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

import { Sketch } from '~/sketch';

const App = () => {
  return (
    <>
      <ReactP5Wrapper sketch={Sketch.simpleFPS} />
    </>
  )
}

export { App }
