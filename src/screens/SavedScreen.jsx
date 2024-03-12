import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  SimpleGrid,
  Spinner,
  Stack,
  Link,
  WrapItem,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import Heading from "../components/Heading";
import SavedItem from "../components/SavedItem";
const SavedScreen = () => {
  const { loading, error, favorites } = useSelector((state) => state.save);
  const mode1 = useColorModeValue("blue.500", "blue.300");

  return (
    <Stack minHeight="90vh" flexDirection={"column"}>
      <Heading title={"Saved Items"} />
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
      ) : favorites.length <= 0 ? (
        <Flex>
          <Alert status="warning">
            <AlertIcon />
            <AlertTitle>No Saved products.</AlertTitle>
            <AlertDescription>
              <Link as={ReactLink} to="/products">
                Navigate to products
              </Link>
            </AlertDescription>
          </Alert>
        </Flex>
      ) : (
        favorites && (
          <SimpleGrid
            py={2}
            px={{ base: 1 }}
            columns={{ lg: 2, md: 1, base: 1 }}
            columnGap={{ lg: 3, md: 3, base: 1 }}
            rowGap={{ lg: 3, md: 3, base: 2 }}
          >
            {favorites.map((savedItem) => (
              <WrapItem key={savedItem.id}>
                <SavedItem product={savedItem} />
              </WrapItem>
            ))}
          </SimpleGrid>
        )
      )}
    </Stack>
  );
};

export default SavedScreen;
