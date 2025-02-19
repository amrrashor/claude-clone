import { lazy} from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from '../pages/Home/Home'
import Layout from "../components/Layout/Layout";
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default AppRoutes