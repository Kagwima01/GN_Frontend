/* eslint-disable no-unused-vars */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Spinner,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateProduct } from "../redux/actions/adminActions";

import Heading from "../components/Heading";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/actions/productActions";

const UpdateProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product, productUpdate } = useSelector(
    (state) => state.product
  );
  const toast = useToast();
  const mode1 = useColorModeValue("gray.200", "gray.700");
  const mode2 = useColorModeValue("#FFFFFF", "#4A5568");
  const mode3 = useColorModeValue("blue.500", "blue.300");

  const [name, setName] = useState(product.name);
  const [imageOne, setImageOne] = useState(product.images[0]);
  const [imageTwo, setImageTwo] = useState(product.images[1]);
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [buyingPrice, setBuyingPrice] = useState(product.buyingPrice);
  const [sellingPrice, setSellingPrice] = useState(product.sellingPrice);
  const [stock, setStock] = useState(product.stock);
  const [productIsNew, setProductIsNew] = useState(product.productIsNew);

  const onSaveProduct = () => {
    dispatch(
      updateProduct(
        product._id,
        name,
        imageOne,
        imageTwo,
        brand,
        category,
        description,
        buyingPrice,
        sellingPrice,
        stock,
        productIsNew
      )
    );
    if (productUpdate) {
      toast({
        description: "Product has been updated.",
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        description: "Product could not be updated.",
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id, productUpdate, toast]);

  return (
    <Stack minHeight="100vh" flexDirection={"column"}>
      <Heading title="Update Product" />
      {loading ? (
        <Flex flex={"1"} alignItems={"center"} justifyContent={"center"}>
          <Spinner
            thickness="2px"
            speed="0.5s"
            emptyColor="gray.200"
            color={mode3}
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
      ) : (
        product && (
          <Stack
            mt={{ lg: 10, md: 7, base: 4 }}
            mb={20}
            alignSelf={"center"}
            w={{ lg: "50vw", md: "70vw", base: "95vw" }}
            mx={"auto"}
            spacing={{ lg: 15, md: 10, base: 5 }}
            p={{ lg: "5", md: "3", base: "2" }}
            backgroundColor={mode1}
            shadow={"lg"}
          >
            <Flex alignItems={"center"} alignSelf={"center"}>
              <Text
                fontWeight={"bold"}
                fontSize={{ lg: "xl", md: "lg", base: "md" }}
              >
                Product is new ?
              </Text>
              <Switch
                id="productIsNewFlag"
                onChange={() => setProductIsNew(!productIsNew)}
                isChecked={productIsNew}
                ml={10}
              />
            </Flex>
            <Flex flexDirection={"column"}>
              <Text
                fontSize={{ lg: "sm", md: "sm", base: "xs" }}
                fontWeight={"semibold"}
                mb={{ lg: 2, md: 2, base: 1 }}
              >
                Image one
              </Text>
              <Input
                size={{ lg: "md", md: "sm", base: "xs" }}
                backgroundColor={mode2}
                value={imageOne}
                onChange={(e) => setImageOne(e.target.value)}
              />
            </Flex>
            <Flex flexDirection={"column"}>
              <Text
                fontSize={{ lg: "sm", md: "sm", base: "xs" }}
                fontWeight={"semibold"}
                mb={{ lg: 2, md: 2, base: 1 }}
              >
                Image two
              </Text>
              <Input
                size={{ lg: "md", md: "sm", base: "xs" }}
                backgroundColor={mode2}
                value={imageTwo}
                onChange={(e) => setImageTwo(e.target.value)}
              />
            </Flex>
            <Flex flexDirection={"column"}>
              <Text
                fontSize={{ lg: "sm", md: "sm", base: "xs" }}
                fontWeight={"semibold"}
                mb={{ lg: 2, md: 2, base: 1 }}
              >
                Name
              </Text>
              <Input
                size={{ lg: "md", md: "sm", base: "xs" }}
                backgroundColor={mode2}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Flex>
            <Flex flexDirection={"column"}>
              <Text
                fontSize={{ lg: "sm", md: "sm", base: "xs" }}
                fontWeight={"semibold"}
                mb={{ lg: 2, md: 2, base: 1 }}
              >
                Stock
              </Text>
              <Input
                size={{ lg: "md", md: "sm", base: "xs" }}
                backgroundColor={mode2}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Flex>
            <Flex flexDirection={"column"}>
              <Text
                fontSize={{ lg: "sm", md: "sm", base: "xs" }}
                fontWeight={"semibold"}
                mb={{ lg: 2, md: 2, base: 1 }}
              >
                Selling price
              </Text>
              <Input
                size={{ lg: "md", md: "sm", base: "xs" }}
                backgroundColor={mode2}
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </Flex>
            <Flex flexDirection={"column"}>
              <Text
                fontSize={{ lg: "sm", md: "sm", base: "xs" }}
                fontWeight={"semibold"}
                mb={{ lg: 2, md: 2, base: 1 }}
              >
                Buying price
              </Text>
              <Input
                size={{ lg: "md", md: "sm", base: "xs" }}
                backgroundColor={mode2}
                value={buyingPrice}
                onChange={(e) => setBuyingPrice(e.target.value)}
              />
            </Flex>
            <Flex flexDirection={"column"}>
              <Text
                fontSize={{ lg: "sm", md: "sm", base: "xs" }}
                fontWeight={"semibold"}
                mb={{ lg: 2, md: 2, base: 1 }}
              >
                Category
              </Text>
              <Input
                size={{ lg: "md", md: "sm", base: "xs" }}
                backgroundColor={mode2}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Flex>
            <Flex flexDirection={"column"}>
              <Text
                fontSize={{ lg: "sm", md: "sm", base: "xs" }}
                fontWeight={"semibold"}
                mb={{ lg: 2, md: 2, base: 1 }}
              >
                Description
              </Text>
              <Input
                size={{ lg: "md", md: "sm", base: "xs" }}
                backgroundColor={mode2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Flex>
            <Flex flexDirection={"column"}>
              <Text
                fontSize={{ lg: "sm", md: "sm", base: "xs" }}
                fontWeight={"semibold"}
                mb={{ lg: 2, md: 2, base: 1 }}
              >
                Brand
              </Text>
              <Input
                size={{ lg: "md", md: "sm", base: "xs" }}
                backgroundColor={mode2}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Flex>
            <Stack mt={7} mb={7}>
              <Button
                borderRadius={50}
                colorScheme="blue"
                onClick={onSaveProduct}
              >
                <Text fontWeight={"bold"}> Update</Text>
              </Button>
            </Stack>
          </Stack>
        )
      )}
    </Stack>
  );
};

export default UpdateProductScreen;
