//react
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

//chakra
import { ChakraProvider } from "@chakra-ui/react";
import { VStack, Spinner } from "@chakra-ui/react";

//screens
import ProductsScreen from "./screens/ProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import HomePage from "./screens/HomePage";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import AdminConsoleScreen from "./screens/AdminConsoleScreen";
import FeaturedScreen from "./screens/FeaturedScreen";
import CategoryScreen from "./screens/CategoryScreen";
import BrandScreen from "./screens/BrandScreen";
import SearchScreen from "./screens/SearchScreen";
import SalesScreen from "./screens/SalesScreen";
import SavedScreen from "./screens/SavedScreen";
import OutOfStockScreen from "./screens/OutOfStockScreen";
import InfoScreen from "./screens/InfoScreen";
import UpdateProductScreen from "./screens/updateProductScreen";
//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//goggle
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const [googleClient, setGoogleClient] = useState(null);

  useEffect(() => {
    const googleKey = async () => {
      const { data: googleId } = await axios.get("/api/config/web-google");
      setGoogleClient(googleId);
    };
    googleKey();
  }, [googleClient]);
  return (
    <ChakraProvider>
      {!googleClient ? (
        <VStack pt="37vh">
          <Spinner
            mt="20"
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </VStack>
      ) : (
        <GoogleOAuthProvider clientId={googleClient}>
          <Router>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/search" element={<SearchScreen />} />
                <Route path="/sales" element={<SalesScreen />} />
                <Route path="/saved" element={<SavedScreen />} />
                <Route path="/out" element={<OutOfStockScreen />} />
                <Route path="/info" element={<InfoScreen />} />

                <Route path="/login" element={<LoginScreen />} />
                <Route path="/registration" element={<RegistrationScreen />} />
                <Route
                  path="/email-verify/:token"
                  element={<EmailVerificationScreen />}
                />
                <Route path="/featured" element={<FeaturedScreen />} />

                <Route
                  path="/category/:category"
                  element={<CategoryScreen />}
                />
                <Route path="/brand/:brand" element={<BrandScreen />} />
                <Route
                  path="/update-prodcut"
                  element={<UpdateProductScreen />}
                />
                <Route path="/admin-console" element={<AdminConsoleScreen />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </GoogleOAuthProvider>
      )}
    </ChakraProvider>
  );
};

export default App;
