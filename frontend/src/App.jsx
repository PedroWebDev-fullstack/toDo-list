import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </>
  )
}