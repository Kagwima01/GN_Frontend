/* eslint-disable no-unused-vars */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  SimpleGrid,
  Spinner,
  Flex,
  Wrap,
  WrapItem,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
//import SearchBar from "../components/SearchBar";

import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product);
  const { loading, error, products, pagination } = productList;
  const mode = useColorModeValue("blue.500", "blue.300");

  useEffect(() => {
    dispatch(getProducts(1));
  }, [dispatch]);
  const paginationButtonClick = (page) => {
    dispatch(getProducts(page));
  };
  return (
    <Wrap
      spacing="30px"
      justify="center"
      minHeight="100vh"
      flexDirection={"column"}
    >
      {loading ? (
        <Flex flex="1" alignItems={"center"} justifyContent={"center"}>
          <Spinner
            mt={20}
            thickness="2px"
            speed="0.5s"
            emptyColor="gray.200"
            color={mode}
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
          <>
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
            <Wrap
              spacing="10px"
              justifyContent="center"
              p="5"
              alignItems={"center"}
            >
              <Button
                colorScheme="blue"
                onClick={() => paginationButtonClick(1)}
                variant={"ghost"}
                size={{ lg: "md", md: "md", base: "sm" }}
              >
                <ArrowLeftIcon />
              </Button>
              {Array.from(Array(pagination.totalPages), (e, i) => {
                return (
                  <Button
                    colorScheme={
                      pagination.currentPage === i + 1 ? "blue" : "gray"
                    }
                    key={i}
                    onClick={() => paginationButtonClick(i + 1)}
                    size={"sm"}
                  >
                    {i + 1}
                  </Button>
                );
              })}
              <Button
                colorScheme="blue"
                variant={"ghost"}
                size={{ lg: "md", md: "md", base: "sm" }}
                onClick={() => paginationButtonClick(pagination.totalPages)}
              >
                <ArrowRightIcon />
              </Button>
            </Wrap>
          </>
        )
      )}
    </Wrap>
  );
};

export default ProductsScreen;
