import { MotionConfig } from "framer-motion";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ArticlePage from "./pages/ArticlePage";
import Home from "./pages/Home";
import JournalIndex from "./pages/JournalIndex";
import LabEntryPage from "./pages/LabEntryPage";
import LabIndex from "./pages/LabIndex";
import NotFound from "./pages/NotFound";
import OpenSourceHub from "./pages/OpenSourceHub";
import SystemDetail from "./pages/SystemDetail";

function RedirectToSystem() {
  const { slug } = useParams();
  return <Navigate to={`/systems/${slug}`} replace />;
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="open-source" element={<OpenSourceHub />} />
            <Route path="systems/:slug" element={<SystemDetail />} />
            <Route path="projects/:slug" element={<RedirectToSystem />} />
            <Route path="lab" element={<LabIndex />} />
            <Route path="lab/:slug" element={<LabEntryPage />} />
            <Route path="journal" element={<JournalIndex />} />
            <Route path="journal/:slug" element={<ArticlePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
