import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from '../pages/Home/Home';
import Chat from "../pages/Chat/Chat";
import Layout from "../components/Layout/Layout";
import { AnimatePresence } from "framer-motion";
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AnimatePresence>
                <Layout>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/chat/:id" element={<Chat />} />
                    </Routes>
                </Layout>
            </AnimatePresence>
        </BrowserRouter>
    )
}

export default AppRoutes