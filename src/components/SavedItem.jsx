/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Flex,
  Image,
  Button,
  Stack,
  Link,
  Badge,
  Text,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

import { Link as ReactLink } from "react-router-dom";
import { removeSaveItem } from "../redux/actions/savedActions";
import { useDispatch } from "react-redux";

const SavedItem = ({ product }) => {
  const {
    name,
    category,
    stock,
    brand,
    productIsNew,
    sellingPrice,
    image,
    description,
    id,
  } = product;

  const dispatch = useDispatch();

  return (
    <Flex
      flex={1}
      direction={"row"}
      backgroundColor={useColorModeValue("gray.100", "gray.700")}
      p={{ lg: 2, md: 2, base: 1 }}
    >
      <Box
        backgroundColor={"white"}
        flex={1}
        boxSize={{ lg: "160px", md: "150px", base: "140px" }}
      >
        <Link as={ReactLink} to={`/product/${id}`}>
          <Image
            fit={"contain"}
            src={image}
            alt={name}
            draggable="false"
            loading="lazy"
            fallbackSrc="https://via.placeholder.com/150"
            boxSize={{ lg: "160px", md: "150px", base: "140px" }}
          />
        </Link>
      </Box>
      <Stack
        direction={"column"}
        ml={{ lg: 2, md: 3, base: 1 }}
        w={{ lg: "30vw", md: "70vw", base: "55vw" }}
      >
        <Flex
          direction={"row"}
          justify={"space-between"}
          alignItems={"center"}
          alignSelf={"flex-start"}
        >
          <Box>
            <Text
              color={useColorModeValue("blue.500", "blue.300")}
              fontWeight={"bold"}
              minW={{ lg: "25vw", md: "65vw", base: "43vw" }}
            >
              Ksh {sellingPrice}
            </Text>
          </Box>
          <Box>
            <Button onClick={() => dispatch(removeSaveItem(id))}>X</Button>
          </Box>
        </Flex>
        <Flex justify={"space-between"}>
          <Box display={{ lg: "flex", md: "flex", base: "none" }}>
            <Text fontWeight={"bold"}>{brand}</Text>
          </Box>
          <Box maxW={{ base: "100px", md: "150px" }}>
            <Text fontWeight={{ lg: "semibold", md: "semibold" }} noOfLines={1}>
              {category}
            </Text>
          </Box>
          <Box>
            <Text fontWeight={{ lg: "bold", md: "bold", base: "semibold" }}>
              {name}
            </Text>
          </Box>
        </Flex>
        <Box>
          {productIsNew ? (
            <Badge
              p={{ lg: 2, md: 2, base: 1 }}
              rounded="md"
              fontSize="0.8em"
              colorScheme="green"
            >
              New
            </Badge>
          ) : stock === 0 ? (
            <Badge
              p={{ lg: 2, md: 2, base: 1 }}
              rounded="md"
              fontSize="0.8em"
              colorScheme="red"
            >
              Out of Stock
            </Badge>
          ) : (
            <Badge
              p={{ lg: 2, md: 2, base: 1 }}
              rounded="md"
              fontSize="0.8em"
              colorScheme="blue"
            >
              In Stock
            </Badge>
          )}
        </Box>
        <Flex>
          <Box maxW={{ lg: "330px", md: "450px", base: "200px" }}>
            <Text fontWeight={"semibold"} noOfLines={1}>
              {description}
            </Text>
          </Box>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default SavedItem;
