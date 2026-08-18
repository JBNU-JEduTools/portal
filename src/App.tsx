import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "@/components/layout";
import MembersPage from "@/components/members";
import HomePage from "@/components/home";

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="members" element={<MembersPage />} />
    <Route index element={<HomePage />} />
  </Route>
);

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
