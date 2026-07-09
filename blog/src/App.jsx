import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import { CurrentUserProvider } from "./context/CurrentUserProvider";

function App() {
  return (
    <CurrentUserProvider>
      <Header />
      <Outlet />
      <Footer />
    </CurrentUserProvider>
  );
}

export default App;
