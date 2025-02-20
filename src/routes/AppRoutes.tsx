import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from '../pages/Home/Home';
import Chat from "../pages/Chat/Chat";
import Layout from "../components/Layout/Layout";
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/chat/:id" element={<Chat />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default AppRoutes