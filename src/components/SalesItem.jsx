/* eslint-disable react/prop-types */
import {
  CloseButton,
  Text,
  Box,
  Stack,
  Image,
  Flex,
  HStack,
  Button,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addSalesItem, removeSalesItem } from "../redux/actions/salesActions";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";

const AmountSchema = Yup.object().shape({
  qty: Yup.number()
    .min(2, "Least amount is 1 piece")
    .required("Amount is required"),
});

const SalesItem = ({ salesItem }) => {
  const { name, image, price, qty, id } = salesItem;
  const dispatch = useDispatch();
  const [showChangeInput, setShowChangeInput] = useState(false);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify={"space-between"}
      align={{ lg: "flex-start", md: "center", base: "center" }}
      w={{ lg: "50vw", md: "70vw", base: "99vw" }}
      backgroundColor={useColorModeValue("gray.100", "gray.700")}
      p={{ lg: 2, md: 2, base: 1 }}
    >
      <Stack direction={"row"} w={"full"}>
        <Box bg={"white"}>
          <Image
            rounded={"lg"}
            boxSize={{ lg: "12vw", md: "20vw", base: "120px" }}
            fit={"contain"}
            src={image}
            alt={name}
            draggable="false"
            loading="lazy"
            fallbackSrc="https://via.placeholder.com/150"
          />
        </Box>

        <Box pt={2} w={{ lg: "45vw", base: "60vw" }}>
          <Stack spacing={0.5}>
            <Text fontWeight={"bold"}>{name}</Text>
          </Stack>
          <HStack>
            <Box minW={{ lg: "10vw", base: "25vw" }}>
              <Text>Quantity:</Text>
            </Box>
            <Box>
              <Text>{qty} Pieces</Text>
            </Box>
          </HStack>
          <HStack>
            <Box minW={{ lg: "10vw", base: "25vw" }}>
              <Text>Price:</Text>
            </Box>
            <Box>
              <Text fontWeight={"medium"}>{price} Per Piece</Text>
            </Box>
          </HStack>
          <HStack>
            <Box minW={{ lg: "10vw", base: "25vw" }}>
              <Text>Subtotal:</Text>
            </Box>
            <Box>
              <Text>Ksh {price * qty}</Text>
            </Box>
          </HStack>
          {!showChangeInput && (
            <Button
              variant={"outline"}
              colorScheme={"blue"}
              borderRadius={20}
              size={{ lg: "sm", md: "sm", base: "xs" }}
              mt={{ lg: 5, md: 2, base: 1 }}
              onClick={() => setShowChangeInput(true)}
              ml={{ base: 3 }}
            >
              Change Amount
            </Button>
          )}
          {showChangeInput && (
            <Formik
              initialValues={{ qty: "" }}
              validationSchema={AmountSchema}
              onSubmit={(values) => {
                dispatch(addSalesItem(id, values.qty));
                setShowChangeInput(false);
              }}
            >
              {({
                handleChange,
                handleSubmit,
                touched,
                values,
                errors,
                isValid,
                setFieldTouched,
              }) => (
                <Box mt={5} alignItems={"center"}>
                  <Box display={"flex"}>
                    <Input
                      onFocus={() => {
                        setFieldTouched("qty");
                      }}
                      onBlur={() => setFieldTouched("qty", "")}
                      placeholder="How many pieces..."
                      size={{ lg: "md", md: "sm", base: "xs" }}
                      variant="outline"
                      w={{ lg: "35vw" }}
                      value={values.qty}
                      onChange={handleChange("qty")}
                    />
                    <Button
                      ml={5}
                      disabled={!isValid}
                      onClick={handleSubmit}
                      size={{ lg: "md", md: "sm", base: "xs" }}
                      borderRadius={20}
                      colorScheme="blue"
                      paddingLeft={{ base: 10 }}
                    >
                      Change
                    </Button>
                  </Box>
                  {touched.qty && errors.qty && (
                    <Text fontSize={"xs"} color={"red"}>
                      {errors.qty}
                    </Text>
                  )}
                </Box>
              )}
            </Formik>
          )}
        </Box>
        <Box>
          <CloseButton
            onClick={() => dispatch(removeSalesItem(id))}
            w={7}
            h={7}
            color={"red"}
            mt={2}
          />
        </Box>
      </Stack>

      <Box w={{ lg: "25vw" }}></Box>
    </Flex>
  );
};

export default SalesItem;
