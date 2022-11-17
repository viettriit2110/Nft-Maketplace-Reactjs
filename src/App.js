import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Author from "./modules/Author";
import Detail from "./modules/Detail";
import Explore from "./modules/Explore";
import NotFound from "./modules/NotFound";
//import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route exact path="/" element={<Explore />} />
        {/* <Route index element={<Explore />} /> */}
        <Route path="author" element={<Author />}>
          <Route path=":id" element={<Author />} />
        </Route>
        <Route path="detail" element={<Detail />}>
          <Route path=":id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
