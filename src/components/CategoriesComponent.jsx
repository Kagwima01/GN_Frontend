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
import CategoryButton from "./CategoryButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/filtersActions";
const CategoriesComponent = () => {
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector((state) => state.filters);
  const mode1 = useColorModeValue("blue.500", "blue.300");

  useEffect(() => {
    dispatch(getCategories());
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
        <Box>
          <SimpleGrid
            py={4}
            columns={{ lg: 5, md: 3, base: 2 }}
            columnGap={{ lg: 4, md: 3, base: 2 }}
            rowGap={{ lg: 4, md: 3, base: 4 }}
          >
            {categories.map((category, index) => (
              <CategoryButton key={index} category={category} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Wrap>
  );
};

export default CategoriesComponent;
