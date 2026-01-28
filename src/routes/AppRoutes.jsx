import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/products/Products";
import Categories from "../pages/Categories/Categories"
import SubCategories from "../pages/Categories/SubCategories";
import SubUnderCategories from "../pages/Categories/SubUnderCategories"
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import Users from "../pages/Users";
import ProtectedRoute from "../components/ProtectedRoute";
import Brands from "../pages/Brands";
import Posters from "../pages/Posters";
import AddProducts from "../pages/products/AddProducts"; // Add this import

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="add-product" element={<AddProducts />} /> {/* Add this route */}
          <Route path="category" element={<Categories />} />
          <Route path="sub-category" element={< SubCategories/>} />
          <Route path="sub-undercategory" element={< SubUnderCategories/>} />
          <Route path="brands" element={<Brands/>} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="users" element={<Users />} />
          <Route path="posters" element={<Posters />} />
          <Route path="setting" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}