// packages
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import HomePage from "./pages/home.page";
import DefaultLayout from "./layouts/default.layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
