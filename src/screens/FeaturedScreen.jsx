import { Box } from "@chakra-ui/react";
import Heading from "../components/Heading";
import CategoriesComponent from "../components/CategoriesComponent";
import BrandsComponent from "../components/BrandsComponent";
const FeaturedScreen = () => {
  return (
    <Box w={"100%"} flex={1}>
      <Box flex={1} flexDirection={"column"}>
        <Heading title={"Categories"} />
        <CategoriesComponent />
      </Box>
      <Box flex={1} flexDirection={"column"}>
        <Heading title={"Brands"} />
        <BrandsComponent />
      </Box>
    </Box>
  );
};

export default FeaturedScreen;
