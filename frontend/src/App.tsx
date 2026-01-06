import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import SignupPage from './pages/Users/SignupPage'
import LoginPage from './pages/Users/LoginPage'
import ForgotPassword from './pages/Users/ForgotPassword'
import VerifyEmail from './pages/Users/VerifyEmail'
import BooksPage from './pages/Books'
import BookDetailsPage from './pages/Books/BookDetailsPage'
import NotesPage from './pages/Notes'
import NoteDetailsPage from './pages/Notes/NoteDetailsPage'
import UploadResource from './pages/UploadResource'

// Admin Components
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import Users from './admin/pages/Users';
import UserAccount from './admin/pages/UserAccount';
import Books from './admin/pages/Books';
import Notes from './admin/pages/Notes';
import QuestionPapers from './admin/pages/QuestionPapers';
import Profile from './admin/pages/Profile';

const App = () => {
  return (
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
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:id" element={<BookDetailsPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/notes/:id" element={<NoteDetailsPage />} />
      <Route path="/upload" element={<UploadResource />} />

      {/* Admin Routes - Protected, requires admin role */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserAccount />} />
        <Route path="books" element={<Books />} />
        <Route path="notes" element={<Notes />} />
        <Route path="question-papers" element={<QuestionPapers />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
