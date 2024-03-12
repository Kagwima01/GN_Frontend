/* eslint-disable no-undef */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { getImages } from "../redux/actions/carouselActions";
import { Link as ReactLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const imageList = useSelector((state) => state.carousel);
  const { loading, error, images } = imageList;
  const [currentIndex, setCurrentIndex] = useState(0);
  const mode1 = useColorModeValue("blue.500", "blue.300");

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const previousImage = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextImage = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <Box
      maxW="8xl"
      mx="auto"
      px={{ base: "0", lg: "12" }}
      py={{ base: "0", lg: "12" }}
    >
      <Stack
        direction={{ base: "column-reverse", lg: "row" }}
        spacing={{ base: "0", lg: "20" }}
      >
        <Box
          width={{ lg: "sm" }}
          transform={{ base: "translateY(-50%)", lg: "none" }}
          bg={{
            base: useColorModeValue("blue.50", "gray.700"),
            lg: "transparent",
          }}
          mx={{ base: "6", md: "8", lg: "0" }}
          px={{ base: "6", md: "8", lg: "0" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack spacing={{ base: "8", lg: "10" }}>
            <Stack spacing={{ base: "2", lg: "4" }}>
              <Flex alignItems={"center"}>
                <Image w={12} h={12} src={"/gnlogo.jpg"} rounded={"md"} />

                <Heading
                  size="xl"
                  color={mode1}
                  fontFamily={"Times New Roman"}
                  ml={3}
                >
                  GN Cyclemart
                </Heading>
              </Flex>

              <Heading size="lg" fontWeight="600" fontFamily="Papyrus">
                Unleash the Power Within, We Got the Spares You Need!
              </Heading>
            </Stack>
            <HStack spacing="3">
              <Link
                as={ReactLink}
                to="/featured"
                color={mode1}
                fontWeight="bold"
                fontSize="lg"
                fontFamily={"Times New Roman"}
              >
                Discover now
              </Link>
              <Icon color={mode1} as={FaArrowRight} />
            </HStack>
          </Stack>
        </Box>
        {loading ? (
          <Flex
            Flex
            flex="1"
            overflow="hidden"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Spinner
              mt={20}
              thickness="2px"
              speed="0.5s"
              emptyColor="gray.200"
              color={mode1}
              size={"xl"}
            />
          </Flex>
        ) : error ? (
          <Flex
            Flex
            flex="1"
            overflow="hidden"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>We are sorry!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </Flex>
        ) : images.length === 0 ? (
          <></>
        ) : (
          images && (
            <Flex flex="1" overflow="hidden">
              <Icon
                color={mode1}
                as={FaChevronCircleLeft}
                alignSelf="center"
                mx={3}
                onClick={previousImage}
                w={{ lg: 8, sm: 5 }}
                h={{ lg: 8, sm: 5 }}
              />
              <Image
                src={images[currentIndex]}
                alt="Lovely Image"
                fallback={<Skeleton />}
                maxH="450px"
                minW="300px"
                objectFit="cover"
                flex="1"
                rounded={"md"}
              />
              <Icon
                color={mode1}
                as={FaChevronCircleRight}
                alignSelf="center"
                mx={3}
                w={{ lg: 8, sm: 5 }}
                h={{ lg: 8, sm: 5 }}
                onClick={nextImage}
              />
            </Flex>
          )
        )}
      </Stack>
    </Box>
  );
};

export default HomePage;
