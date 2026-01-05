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
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:id" element={<BookDetailsPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/notes/:id" element={<NoteDetailsPage />} />
      <Route path="/upload" element={<UploadResource />} />
    </Routes>
  )
}

export default App

