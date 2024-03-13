import {
  Button,
  Stack,
  Spinner,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  SimpleGrid,
  Flex,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import OutItem from "../components/OutItem";
import { useDispatch, useSelector } from "react-redux";
import { getOutOfStock } from "../redux/actions/productActions";
import { useEffect } from "react";
import Heading from "../components/Heading";

import { AiOutlineReload } from "react-icons/ai";

const OutOfStockScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product);
  const { loading, error, products } = productList;

  const mode1 = useColorModeValue("blue.500", "blue.300");

  useEffect(() => {
    dispatch(getOutOfStock("0"));
  }, [dispatch]);

  const getZeroItems = () => {
    dispatch(getOutOfStock("0"));
  };
  const getOneItem = () => {
    dispatch(getOutOfStock("1"));
  };

  return (
    <Stack minHeight="100vh" flexDirection={"column"}>
      <Heading title={"Out Of Stock"} />

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
        <Flex>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>We are Sorry!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </Flex>
      ) : products.length <= 0 ? (
        <Flex>
          <Alert status="warning">
            <AlertIcon />
            <AlertTitle>Stock In Check.</AlertTitle>
          </Alert>
        </Flex>
      ) : (
        products && (
          <Stack>
            <Stack
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              alignSelf={{ lg: "center" }}
              justifyContent={"space-between"}
              w={{ lg: "60vw", md: "70vw", base: "90vw" }}
              marginLeft={{ lg: 10, md: 10 }}
            >
              <Button
                isLoading={loading}
                onClick={() => getZeroItems()}
                minW={{ lg: "250px", md: "200px", base: "150px" }}
              >
                <AiOutlineReload />
                Reload
              </Button>
              <Button onClick={() => getZeroItems()}>0</Button>
              <Button onClick={() => getOneItem()}>1</Button>
            </Stack>
            <SimpleGrid
              py={2}
              px={{ base: 1 }}
              columns={{ lg: 3, md: 2, base: 1 }}
              columnGap={{ lg: 3, md: 3, base: 1 }}
              rowGap={{ lg: 3, md: 3, base: 2 }}
            >
              {products.map((product) => (
                <WrapItem key={product._id}>
                  <OutItem product={product} />
                </WrapItem>
              ))}
            </SimpleGrid>
          </Stack>
        )
      )}
    </Stack>
  );
};

export default OutOfStockScreen;
