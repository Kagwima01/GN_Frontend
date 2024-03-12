import { Box, Text } from "@chakra-ui/react";
// eslint-disable-next-line react/prop-types
const Heading = ({ title }) => {
  return (
    <Box textAlign="left" ml={8} mr={4} borderBottomWidth={1}>
      <Box>
        <Text fontWeight="bold" mb={{ lg: 2, base: 1 }}>
          {title}
        </Text>
      </Box>
    </Box>
  );
};

export default Heading;
