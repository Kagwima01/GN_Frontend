import { Stack, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import Heading from "../components/Heading";

const InfoScreen = () => {
  return (
    <Stack minH={"100vH"}>
      <Heading title={"General Info"} />
      <Flex flexDirection={"column"} alignSelf={"flex-start"} ml={10}>
        <Flex flexDirection={"column"}>
          <Text fontWeight={"bold"}>Country</Text>
          <Text
            fontWeight={"semibold"}
            color={useColorModeValue("gray.700", "gray.200")}
          >
            Kenya
          </Text>
        </Flex>
        <Flex flexDirection={"column"}>
          <Text fontWeight={"bold"}>Location</Text>
          <Text
            fontWeight={"semibold"}
            color={useColorModeValue("gray.700", "gray.200")}
          >
            Kenya
          </Text>
        </Flex>
        <Flex flexDirection={"column"}>
          <Text fontWeight={"bold"}>PO.BOX</Text>
          <Text
            fontWeight={"semibold"}
            color={useColorModeValue("gray.700", "gray.200")}
          >
            2589 Eldoret
          </Text>
        </Flex>
      </Flex>
      <Heading title={"Developer Info"} />
      <Flex flexDirection={"column"} alignSelf={"flex-start"} ml={10}>
        <Flex flexDirection={"column"}>
          <Text fontWeight={"bold"}>Email</Text>
          <Text
            fontWeight={"semibold"}
            color={useColorModeValue("gray.700", "gray.200")}
          >
            walterkagwima2023@gmail.com
          </Text>
        </Flex>
        <Flex flexDirection={"column"}>
          <Text fontWeight={"bold"}>Contact</Text>
          <Text
            fontWeight={"semibold"}
            color={useColorModeValue("gray.700", "gray.200")}
          >
            +254 731321713
          </Text>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default InfoScreen;
