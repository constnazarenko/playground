import { Profiler, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import Loading from './components/Loading';
import './index.scss';
import App from './pages/App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Aggregate or log render timings...
  console.debug(id, phase, actualDuration, baseDuration, startTime, commitTime);
}

root.render(
  <Suspense fallback={<Loading />}>
    <Profiler id="StrictMode" onRender={onRender}>
      <StrictMode>
        <App />
      </StrictMode>
    </Profiler>
  </Suspense>,
);
