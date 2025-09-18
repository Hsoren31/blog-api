import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
