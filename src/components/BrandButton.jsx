/* eslint-disable react/prop-types */
import { Button, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate, Link as ReactLink } from "react-router-dom";

const BrandButton = ({ brand }) => {
  const textMode = useColorModeValue("gray.700", "black.900");
  const navigate = useNavigate;

  return (
    <Button
      variant="outline"
      maxW={{ lg: "17vw", md: "30vw", base: "40vw" }}
      colorScheme="blue"
      size={{ lg: "md", md: "md", base: "sm" }}
      as={ReactLink}
      to={`/brand/${brand}`}
      onClick={() => navigate(`/brand/${brand}`)}
    >
      <Text noOfLines={1} color={textMode}>
        {brand}
      </Text>
    </Button>
  );
};

export default BrandButton;
