import React from "react";
import { About, Footer, Header, Skills, Work } from "./container";
import { Navbar } from "./components";
import "./App.scss";
import Post from "./pages/Post";
import Auth from "./pages/Auth"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

const App = () => (
  <Router>
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <Header />
              <About />
              <Work />
              <Skills />
              {/* <Testimonial />  */}
              <Footer />
            </div>
          }
        />
         <Route
          path="/auth"
          element={
            <div>
              <Auth />
            </div>
          }
        />
        <Route
          path="/postfortechsavvy"
          element={
            <div>
              <Post />
            </div>
          }
        />
      </Routes>
    </div>
  </Router>
);

export default App;
