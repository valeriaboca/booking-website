import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import StylistsPage from "./components/StylistsPage";
import BookingPage from "./components/BookingPage";
import StylistBookingsPage from "./components/StylistBookingsPage";
import FAQPage from "./components/FAQPage";
import AboutUsPage from "./components/AboutUsPage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/stylist" element={<StylistsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/stylistBookings" element={<StylistBookingsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
