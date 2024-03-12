import {
  Box,
  Heading,
  Link,
  Stack,
  Spinner,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  Wrap,
} from "@chakra-ui/react";

import { Link as ReactLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SalesItem from "../components/SalesItem";

const SalesScreen = () => {
  const { loading, error, salesItems } = useSelector((state) => state.sales);
  const getHeadingContent = () =>
    salesItems.length === 1 ? "(1 Item)" : `(${salesItems.length} Items)`;
  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Stack direction={"row"} spacing={4}>
          <Spinner
            mt={20}
            thickness="2px"
            speed="0.5s"
            emptyColor="gray.200"
            color="blue.500"
            size={"xl"}
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : salesItems.length <= 0 ? (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Your daily sales is empty.</AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to="/products">
              Navigate to products
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          maxW={{ base: "3xl", lg: "7xl" }}
          mx={"auto"}
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
            spacing={{ base: "4", md: "16" }}
          >
            <Stack spacing={{ base: "8", md: "10" }} flex={"2"}>
              <Heading fontSize={"2xl"} fontWeight={"extrabold"}>
                Daily Sales {getHeadingContent()}
              </Heading>

              <Stack spacing="2">
                {salesItems.map((salesItem) => (
                  <SalesItem key={salesItem.id} salesItem={salesItem} />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default SalesScreen;
