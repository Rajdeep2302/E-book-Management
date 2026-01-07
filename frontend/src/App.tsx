import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignupPage from './pages/Users/SignupPage'
import LoginPage from './pages/Users/LoginPage'
import ForgotPassword from './pages/Users/ForgotPassword'
import ProfilePage from './pages/Users/ProfilePage'
import BooksPage from './pages/Books'
import BookDetailsPage from './pages/Books/BookDetailsPage'
import NotesPage from './pages/Notes'
import NoteDetailsPage from './pages/Notes/NoteDetailsPage'
import UploadResource from './pages/UploadResource'
import AdminPanel from './pages/Admin/AdminPanel'
import MaintenancePage from './pages/MaintenancePage'
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // Global Maintenance Check
  const settings = JSON.parse(localStorage.getItem('admin_settings') || '{}');
  const isMaintenance = settings.maintenanceMode === true;
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole === 'admin';

  // Shared Toast Config
  const toastOptions = {
    position: "top-center" as const,
    theme: "dark" as const,
    autoClose: 3000,
    transition: Zoom,
    toastClassName: "bg-[#0a0a0a]/80 backdrop-blur-xl border border-blue-500/20 text-white rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.1)] px-4 py-3 min-h-[50px]",
    progressClassName: "bg-linear-to-r from-blue-600 to-indigo-600 h-1",
  };

  // If maintenance is on and user isn't admin, force maintenance page on all non-admin routes
  if (isMaintenance && !isAdmin) {
    return (
      <>
        <Routes>
          <Route path="*" element={<MaintenancePage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <ToastContainer {...toastOptions} />
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
          </>
        } />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:id" element={<NoteDetailsPage />} />
        <Route path="/upload" element={<UploadResource />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
      </Routes>
      <ToastContainer {...toastOptions} />
    </>
  );
}

export default App

