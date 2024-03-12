/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Stack,
  Text,
  useColorModeValue,
  Link,
  Input,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { Link as ReactLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { updateStock } from "../redux/actions/adminActions";
import { useState } from "react";

const AmountSchema = Yup.object().shape({
  stock: Yup.number()
    .min(0, "Can not be empty.")
    .required("Quantity is required"),
});

const OutItem = ({ product }) => {
  const dispatch = useDispatch();
  const [showChangeInput, setShowChangeInput] = useState(false);
  const [stock, setStock] = useState(product.stock);
  const id = product._id;
  return (
    <Stack
      backgroundColor={useColorModeValue("gray.100", "gray.700")}
      p={{ base: 2 }}
      w={{ lg: "32vw", md: "48vw", base: "99vw" }}
    >
      <Box>
        <Box display={"flex"}>
          <Text
            fontWeight={"semibold"}
            minW={{ lg: "10vw", md: "15vw", base: "25vw" }}
          >
            Name:
          </Text>
          <Link
            as={ReactLink}
            to={`/product/${product._id}`}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Text fontWeight={"bold"}>{product.name}</Text>
          </Link>
        </Box>
        <Box display={"flex"}>
          <Text
            fontWeight={"semibold"}
            minW={{ lg: "10vw", md: "15vw", base: "25vw" }}
          >
            Category:
          </Text>
          <Text>{product.category}</Text>
        </Box>
        <Box display={"flex"}>
          <Text
            fontWeight={"semibold"}
            minW={{ lg: "10vw", md: "15vw", base: "25vw" }}
          >
            Brand:
          </Text>
          <Text>{product.brand}</Text>
        </Box>
        <Box display={"flex"}>
          <Text
            fontWeight={"semibold"}
            minW={{ lg: "10vw", md: "15vw", base: "25vw" }}
          >
            Stock:
          </Text>
          <Text>{stock}</Text>
        </Box>
      </Box>
      <Box alignSelf={"flex-end"} mt={-10}>
        {!showChangeInput && (
          <Button onClick={() => setShowChangeInput(true)}>
            <MdEdit />
          </Button>
        )}
        {showChangeInput && (
          <Formik
            initialValues={{ stock: "" }}
            validationSchema={AmountSchema}
            onSubmit={(values) => {
              setStock(values.stock);
              dispatch(updateStock(id, values.stock));
              console.log(values.stock);
              console.log(product.stock);
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
              <Box mt={5} alignItems={"center"} marginTop={10}>
                <Box display={"flex"}>
                  <Input
                    onFocus={() => {
                      setFieldTouched("stock");
                    }}
                    onBlur={() => setFieldTouched("stock", "")}
                    placeholder="How many pieces..."
                    size={{ lg: "sm", md: "sm", base: "xs" }}
                    variant="outline"
                    w={{ lg: "20vw" }}
                    value={values.stock}
                    onChange={handleChange("stock")}
                  />
                  <Button
                    ml={5}
                    disabled={!isValid}
                    onClick={handleSubmit}
                    size={{ lg: "sm", md: "sm", base: "xs" }}
                    borderRadius={20}
                    colorScheme="blue"
                  >
                    Update
                  </Button>
                </Box>
                {touched.stock && errors.stock && (
                  <Text fontSize={"xs"} color={"red"}>
                    {errors.stock}
                  </Text>
                )}
              </Box>
            )}
          </Formik>
        )}
      </Box>
    </Stack>
  );
};

export default OutItem;
