import {
  SimpleGrid,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  WrapItem,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProducts } from "../redux/actions/searchActions";

const SearchScreen = () => {
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.search);
  const mode1 = useColorModeValue("blue.500", "blue.300");

  const searchForItem = (key) => {
    dispatch(getSearchProducts(key));
  };

  return (
    <Stack
      spacing="30px"
      justify="center"
      minHeight="90vh"
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <InputGroup w={"90%"} mt={5}>
        <Input
          value={searchKey}
          placeholder="Search from GN Cyclemart..."
          variant={onfocus ? "outline" : "filled"}
          onChange={(e) => setSearchKey(e.target.value)}
          type="text"
        />
        <InputRightElement>
          {searchKey != "" && (
            <SearchIcon
              onClick={(e) => {
                e.preventDefault();
                searchForItem(searchKey);
              }}
              disabled={searchKey === ""}
            />
          )}
        </InputRightElement>
      </InputGroup>
      {loading ? (
        <Flex flex={"1"} alignItems={"center"} justifyContent={"center"}>
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
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : products.length === 0 ? (
        <></>
      ) : (
        products && (
          <SimpleGrid
            py={4}
            columns={{ lg: 4, md: 3, sm: 2 }}
            columnGap={{ lg: 8, md: 6, sm: 4 }}
            rowGap={{ lg: 8, md: 6, sm: 4 }}
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

export default SearchScreen;
