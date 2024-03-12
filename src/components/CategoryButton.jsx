/* eslint-disable react/prop-types */
import { Button, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate, Link as ReactLink } from "react-router-dom";

const CategoryButton = ({ category }) => {
  const textMode = useColorModeValue("black.900", "gray.800");
  const navigate = useNavigate;

  return (
    <Button
      maxW={{ lg: "17vw", md: "30vw", base: "40vw" }}
      colorScheme="blue"
      variant={"solid"}
      size={{ lg: "md", md: "md", base: "sm" }}
      as={ReactLink}
      to={`/category/${category}`}
      onClick={() => navigate(`/category/${category}`)}
    >
      <Text ml="2" color={textMode}>
        {category}
      </Text>
    </Button>
  );
};

export default CategoryButton;
