import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  SimpleGrid,
  Spinner,
  Stack,
  useColorModeValue,
  WrapItem,
  Flex,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByBrand } from "../redux/actions/filtersActions";
import ProductCard from "../components/ProductCard";
import Heading from "../components/Heading";

const BrandScreen = () => {
  const { brand } = useParams();
  const dispatch = useDispatch();
  const mode1 = useColorModeValue("blue.500", "blue.300");
  const { loading, error, products } = useSelector((state) => state.filters);
  useEffect(() => {
    dispatch(getProductsByBrand(brand));
    console.log(brand);
  }, [brand, dispatch]);

  return (
    <Stack minHeight="90vh" flexDirection={"column"}>
      <Heading title={brand} />
      {loading ? (
        <Flex flex={"1"} alignItems={"center"} justifyContent={"center"}>
          <Spinner
            thickness="2px"
            speed="0.5s"
            emptyColor="gray.200"
            color={mode1}
            size={"xl"}
          />
        </Flex>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        products && (
          <SimpleGrid
            py={4}
            px={{ base: 4 }}
            columns={{ lg: 4, md: 3, base: 2 }}
            columnGap={{ lg: 8, md: 3, base: 2 }}
            rowGap={{ lg: 8, md: 3, base: 4 }}
          >
            {products.map((product) => (
              <WrapItem key={product._id}>
                <ProductCard product={product} />
              </WrapItem>
            ))}
          </SimpleGrid>
        )
      )}
    </Stack>
  );
};

export default BrandScreen;
