/* eslint-disable no-unused-vars */

import {
  LandingPage,
  Error,
  CreateNote,
  Notes,
  Profile,
  Register,
  ProtectedRoute,
} from "./pages";
import {  Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import SharedLayout from "./components/SharedLayout";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {" "}
              <SharedLayout />{" "}
            </ProtectedRoute>
          }
        >
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/create" element={<CreateNote />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/landing" element={<LandingPage />} />

        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Error />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        transition:Bounce
      />
    </>
  );
}

export default App;
