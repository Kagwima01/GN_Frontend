/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Flex,
  Image,
  Icon,
  Button,
  Tooltip,
  Stack,
  Link,
  HStack,
  Text,
  useColorModeValue,
  Box,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addSaveItem } from "../redux/actions/savedActions";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.save);
  const mode = useColorModeValue("blue.500", "blue.300");

  const toast = useToast();

  const saveItem = (id) => {
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
    <Stack
      p={2}
      spacing={{ lg: "3px", md: "2px", base: "1px" }}
      bg={useColorModeValue("white", "gray.800")}
      borderWidth="1px"
      rounded={{ lg: "lg", md: "md", base: "sm" }}
      shadow="lg"
      position="relative"
    >
      <Link as={ReactLink} to={`/product/${product._id}`}>
        <Box bg={"white"}>
          <Image
            src={product.images[0]}
            alt={product.name}
            boxSize={{ lg: "250px", md: "200px", base: "40vw" }}
            fallbackSrc="https://via.placeholder.com/150"
            objectFit="contain"
          />
        </Box>
      </Link>
      <Flex
        mt={1}
        justifyContent={"space-between"}
        alignContent={"center"}
        alignSelf={"center"}
      >
        <Link
          as={ReactLink}
          to={`/product/${product._id}`}
          pt={{ lg: 2, md: 1 }}
          cursor={"pointer"}
        >
          <Box
            fontSize={{ lg: "md", md: "sm", base: "xs" }}
            fontWeight={"bold"}
            lineHeight={"tight"}
            fontFamily={"Verdana"}
            noOfLines={1}
            maxW={{ lg: "230px", md: "180px", base: "120px" }}
          >
            {product.name}
          </Box>
        </Link>
      </Flex>
      <Flex alignSelf={"center"}>
        <Box>
          <Text
            fontSize={{ lg: "md", md: "sm", base: "xs" }}
            color={useColorModeValue("gray.500", "gray.400")}
            fontWeight={"semibold"}
          >
            {product.category}
          </Text>
        </Box>
      </Flex>

      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Box display={"flex"} flexDirection={"row"}>
          <Text
            fontStyle={"italic"}
            fontSize={{ lg: "md", md: "sm", base: "sm" }}
            fontWeight={"semibold"}
          >
            Ksh
          </Text>
          <Text
            color={useColorModeValue("blue.500", "blue.300")}
            fontWeight={"bold"}
            ml={2}
            fontSize={{ lg: "md", md: "sm", base: "sm" }}
          >
            {product.sellingPrice}
          </Text>
        </Box>
        <Box>
          <Button
            disabled={product.stock <= 0}
            variant={"ghost"}
            display={"flex"}
            onClick={() => saveItem(product._id)}
          >
            <Icon
              as={
                favorites.some((saveItem) => saveItem.id === product._id)
                  ? BsBookmarkFill
                  : BsBookmark
              }
              h={{ lg: 7, base: 5 }}
              w={{ lg: 7, base: 5 }}
              color={mode}
              mt={{ base: 2 }}
            />
          </Button>
        </Box>
      </Flex>
    </Stack>
  );
};

export default ProductCard;
