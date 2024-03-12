/* eslint-disable no-unused-vars */

//react
import { useEffect, useState } from "react";
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";

//icons
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { BiCheckShield, BiPackage, BiSupport } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

//chakra
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  Wrap,
  useToast,
  Tooltip,
  Input,
  Icon,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";

//redux
import { addSaveItem } from "../redux/actions/savedActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/actions/productActions";
import { addSalesItem } from "../redux/actions/salesActions";

import * as Yup from "yup";
import { Formik } from "formik";

const AmountSchema = Yup.object().shape({
  amount: Yup.number()
    .min(1, "Least amount is 1 piece")
    .required("Amount is required"),
});

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.save);
  const { loading, error, product } = useSelector((state) => state.product);

  const toast = useToast();

  const { userInfo } = useSelector((state) => state.user);
  const { salesItems } = useSelector((state) => state.sales);

  const mode1 = useColorModeValue("blue.500", "blue.300");
  const mode2 = useColorModeValue("#F3F4F8", "gray.700");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [amount, setAmount] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = "/products";

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id, toast]);

  const previousSlider = () => {
    setCurrentIndex(0);
  };
  const nextSlider = () => {
    setCurrentIndex(1);
  };

  const goBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(redirect);
    }
  };

  const addItem = () => {
    if (salesItems.some((item) => item.id === id)) {
      salesItems.find((item) => {
        item.id === id;
        setAmount((item.qty += 1));
        dispatch(addSalesItem(id, (item.qty += 1)));
        toast({
          description: "Item has been Updated.",
          status: "success",
          isClosable: true,
        });
      });
    } else {
      dispatch(addSalesItem(id, amount));
      toast({
        description: "Item has been added.",
        status: "success",
        isClosable: true,
      });
    }
  };

  const saveItem = () => {
    if (favorites.some((saveItem) => saveItem.id === id)) {
      toast({
        description: "Item already saved, navigate to your saved products",
        status: "error",
        isClosable: true,
      });
    } else {
      dispatch(addSaveItem(id));

      toast({
        description: "Item saved",
        status: "success",
        isClosable: true,
      });
    }
  };

  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Flex flex={"1"} alignItems={"center"} justifyContent={"center"}>
          <Spinner
            mt="20"
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color={mode1}
            size="xl"
          />
        </Flex>
      ) : error ? (
        <Flex>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>We are sorry!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </Flex>
      ) : (
        product && (
          <Stack
            direction={{ base: "column", lg: "row" }}
            align="flex-start"
            p={{ lg: 10 }}
          >
            <Flex
              mt={{ lg: 10, md: 7 }}
              direction={"row"}
              justify={"space-between"}
              alignItems={"center"}
              w={"100vw"}
              display={{ lg: "none", base: "flex" }}
            >
              <Box>
                <Button
                  variant={"ghost"}
                  display={"flex"}
                  onClick={() => goBack()}
                >
                  <Icon
                    as={FaCircleChevronLeft}
                    h={{ lg: 10, base: 7 }}
                    w={{ lg: 10, base: 7 }}
                    color={"blue.500"}
                    mt={{ base: 2 }}
                  />
                </Button>
              </Box>

              <Box>
                <Button
                  variant={"ghost"}
                  display={"flex"}
                  onClick={() => saveItem()}
                >
                  <Icon
                    as={
                      favorites.some((saveItem) => saveItem.id === product._id)
                        ? BsBookmarkFill
                        : BsBookmark
                    }
                    h={{ lg: 10, base: 7 }}
                    w={{ lg: 10, base: 7 }}
                    color={"blue.500"}
                    mt={{ base: 2 }}
                  />
                </Button>
              </Box>
            </Flex>

            <Flex
              direction={"column"}
              flex={"1.5"}
              align="center"
              _dark={{ bg: "gray.900" }}
              mr={{ lg: "10" }}
              display={{ lg: "flex", base: "none" }}
            >
              <Image
                mb="30px"
                src={product.images[0]}
                alt={product.name}
                fallbackSrc={<Skeleton />}
              />
              <Image
                mb="30px"
                src={product.images[1]}
                alt={product.name}
                fallbackSrc={<Skeleton />}
              />
            </Flex>
            <Box
              display={{ lg: "none", base: "flex" }}
              flexDirection={"row"}
              overflow="hidden"
              alignItems={"center"}
              alignSelf={"center"}
              mt={-45}
              w={"100vw"}
              backgroundColor={"white"}
            >
              <Box>
                <Icon
                  color={"blue.500"}
                  as={FaChevronLeft}
                  onClick={previousSlider}
                  w={7}
                  h={7}
                />
              </Box>
              <Box alignSelf={"center"}>
                <Image
                  src={product.images[currentIndex]}
                  alt={product.name}
                  fallbackSrc={<Skeleton />}
                  objectFit="contain"
                  boxSize="350px"
                />
              </Box>
              <Box>
                <Icon
                  color={"blue.500"}
                  as={FaChevronRight}
                  onClick={nextSlider}
                  w={7}
                  h={7}
                />
              </Box>
            </Box>
            <Stack
              p={{ base: 5 }}
              pr={{ base: "0", md: "row" }}
              flex="1.5"
              mb={{ base: "12", md: "none" }}
              //w={{ lg: "45vw" }}
            >
              <Flex justify={"space-between"} alignItems={"center"}>
                {product.productIsNew ? (
                  <Badge
                    p={{ lg: 2, md: 2, base: 1 }}
                    rounded="md"
                    w={{ lg: "50px", base: "40px" }}
                    fontSize="0.8em"
                    colorScheme="green"
                  >
                    New
                  </Badge>
                ) : product.stock === 0 ? (
                  <Badge
                    p={{ lg: 2, md: 2, base: 1 }}
                    rounded="md"
                    w={{ base: "100px" }}
                    fontSize="0.8em"
                    colorScheme="red"
                  >
                    Out of Stock
                  </Badge>
                ) : (
                  <Badge
                    p={{ lg: 2, md: 2, base: 1 }}
                    rounded="md"
                    w={{ lg: "80px", base: "70px" }}
                    fontSize="0.8em"
                    colorScheme="blue"
                  >
                    In Stock
                  </Badge>
                )}
                <Button colorScheme="blue">
                  <Text fontWeight={"extrabold"}>{product.stock}</Text>
                </Button>
              </Flex>
              <Heading fontSize="2xl" fontWeight="extrabold">
                {product.brand} {product.name}
              </Heading>
              <Stack spacing={{ lg: "5", base: "2" }}>
                <Box display={"flex"}>
                  <Text
                    mr={{ base: 3 }}
                    fontWeight={"semibold"}
                    fontSize={"xl"}
                  >
                    Ksh
                  </Text>
                  <Text fontSize="xl" fontWeight={"extrabold"} color={mode1}>
                    {product.sellingPrice}
                  </Text>
                  <Text ml={3} fontWeight={"semibold"} fontSize={"xl"}>
                    per piece
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight={"semibold"}>{product.category}</Text>
                </Box>
                <Box>
                  <Text fontWeight={"semibold"}>{product.description}</Text>
                </Box>
              </Stack>
              {userInfo === null ? (
                <></>
              ) : (
                userInfo.isAdmin && (
                  <Flex
                    width={{ base: "90vw", lg: "45vw" }}
                    p="5px"
                    alignItems="center"
                    borderRadius={10}
                    flexDirection={"column"}
                    backgroundColor={mode2}
                  >
                    <Box display={"flex"} flexDirection={"row"} my={5}>
                      <Text fontWeight="bold">Quantity: </Text>
                      <Text ml={5} fontWeight="bold">
                        ({amount}) Piece
                      </Text>
                    </Box>
                    <Formik
                      initialValues={{ amount: "" }}
                      validationSchema={AmountSchema}
                      onSubmit={(values) => setAmount(values.amount)}
                    >
                      {({
                        handleChange,
                        handleSubmit,
                        touched,
                        values,
                        errors,
                        isValid,
                        setFieldTouched,
                      }) => (
                        <Box>
                          <Box display={"flex"}>
                            <Input
                              onFocus={() => {
                                setFieldTouched("amount");
                              }}
                              onBlur={() => setFieldTouched("amount", "")}
                              placeholder="How many pieces..."
                              size={{ lg: "md", md: "sm", base: "sm" }}
                              variant="outline"
                              w={{ lg: "35vw" }}
                              value={values.amount}
                              onChange={handleChange("amount")}
                            />
                            <Button
                              ml={5}
                              disabled={!isValid}
                              onClick={handleSubmit}
                            >
                              Save
                            </Button>
                          </Box>
                          {touched.amount && errors.amount && (
                            <Text fontSize={"xs"} color={"red"}>
                              {errors.amount}
                            </Text>
                          )}
                        </Box>
                      )}
                    </Formik>
                    <Stack width="270px" py={5}>
                      <Flex alignItems="center">
                        <BiCheckShield size="20px" />
                        <Text fontWeight="medium" fontSize="sm" ml="2">
                          A random NB
                        </Text>
                      </Flex>

                      <Button
                        mt={5}
                        isDisabled={product.stock <= 0}
                        colorScheme="blue"
                        onClick={() => addItem()}
                        borderRadius={20}
                      >
                        <Text fontWeight={"bold"}>
                          {product.stock <= 0 ? "OUT OF STOCK" : "Add to sales"}
                        </Text>
                      </Button>
                    </Stack>
                  </Flex>
                )
              )}
              {userInfo === null ? (
                <></>
              ) : (
                userInfo.isSuperAdmin && (
                  <Stack spacing={{ lg: 10, base: 10 }}>
                    <Button
                      as={ReactLink}
                      colorScheme="blue"
                      variant={"outline"}
                      borderRadius={50}
                      mt={{ lg: 15, base: 10 }}
                      to="/update-prodcut"
                    >
                      <Text fontWeight={"bold"}>Update Item</Text>
                    </Button>
                    <Button colorScheme="red" borderRadius={50}>
                      <Text fontWeight={"bold"}>Delete Product</Text>
                    </Button>
                  </Stack>
                )
              )}
            </Stack>
          </Stack>
        )
      )}
    </Wrap>
  );
};

export default ProductScreen;
