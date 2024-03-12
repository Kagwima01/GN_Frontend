import {
  Box,
  SimpleGrid,
  Stack,
  Alert,
  AlertDescription,
  AlertIcon,
  Spinner,
  AlertTitle,
  Wrap,
  useColorModeValue,
} from "@chakra-ui/react";
import BrandButton from "./BrandButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../redux/actions/filtersActions";
const BrandsComponent = () => {
  const dispatch = useDispatch();
  const { loading, error, brands } = useSelector((state) => state.filters);
  const mode1 = useColorModeValue("blue.500", "blue.300");

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  return (
    <Wrap minH={"40vh"} flexDirection={"column"} justify="center">
      {loading ? (
        <Stack direction={"row"} spacing={4}>
          <Spinner
            mt={20}
            thickness="2px"
            speed="0.5s"
            emptyColor="gray.200"
            color={mode1}
            size={"xl"}
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        brands && (
          <Box>
            <SimpleGrid
              py={4}
              columns={{ lg: 5, md: 3, base: 2 }}
              columnGap={{ lg: 4, md: 3, base: 2 }}
              rowGap={{ lg: 4, md: 3, base: 4 }}
            >
              {brands.map((brand, index) => (
                <BrandButton key={index} brand={brand} />
              ))}
            </SimpleGrid>
          </Box>
        )
      )}
    </Wrap>
  );
};

export default BrandsComponent;
