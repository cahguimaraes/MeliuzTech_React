import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './views/Home';
import Error404 from './views/Error'

const RouteComponent = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteComponent;