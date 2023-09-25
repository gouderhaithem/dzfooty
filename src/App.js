import Switch from "./components/Switch";
//import Content from "./components/Content";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

//styles
import "./styles/app.sass";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import SwitchCups from "./components/SwitchCups";
import { AnimatePresence } from "framer-motion";
import MatchDay from "./pages/MatchDay";
import ContactForm from "./components/ContactForm";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Navbar />
      <ScrollToTop/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/switch/:id" element={<Switch />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-me" element={<ContactForm/>} />
          <Route path="/switchCups/:id" element={<SwitchCups />} />
          <Route path="/matchday" element={<MatchDay />} />
        </Routes>
      </AnimatePresence>
      <Footer/>
    </div>
  );
}

export default App;
