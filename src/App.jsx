import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout'
import Main from "./pages/Main";
import MovieDetail from "./pages/MovieDetail";
import Form from "./pages/BookTicket";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path=":id/:name?" element={<MovieDetail />} />
          <Route path="book/:id" element={<Form />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
