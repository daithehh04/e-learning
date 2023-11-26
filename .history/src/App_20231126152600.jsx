import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/routes";
import Loading from "./components/loading/Loading";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  const isLoading = false
  const userInfo = {
    _id: 1
  }
  return (
    <BrowserRouter>
      <div className="App">
        <ScrollToTop />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return isLoading ? (
              <Route key={index} path={route.path} element={<Loading />} />
            ) : (
              <Route key={index} path={route.path} element={<Page />} />
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return isLoading ? (
              <Route key={index} path={route.path} element={<Loading />} />
            ) : (
              <Route
                key={index}
                path={route.path}
                element={
                  userInfo?._id ? <Page /> : <Navigate to={"/dang-nhap"} />
                }
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
