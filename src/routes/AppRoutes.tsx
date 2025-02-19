import { lazy} from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from '../pages/Home/Home'
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes