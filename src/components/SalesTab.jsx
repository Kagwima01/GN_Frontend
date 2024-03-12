import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSales,
  resetErrorAndRemoval,
  deleteSale,
  setConfirmed,
} from "../redux/actions/adminActions";
import ConfirmRemovalAlert from "./ConfirmRemovalAlert";
import { FaCheck } from "react-icons/fa";

const SalesTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [saleToDelete, setSaleToDelete] = useState("");
  const dispatch = useDispatch();
  const { error, loading, sales, confirmedFlag, salesRemoval } = useSelector(
    (state) => state.admin
  );
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllSales());
    dispatch(resetErrorAndRemoval());
    if (salesRemoval) {
      toast({
        description: "Sales has been removed.",
        status: "success",
        isClosable: true,
      });
    }

    if (confirmedFlag) {
      toast({
        description: "Sale has been set to Confirmed.",
        status: "success",
        isClosable: true,
      });
    }
  }, [dispatch, toast, confirmedFlag, salesRemoval]);

  const openDeleteConfirmBox = (sale) => {
    setSaleToDelete(sale);
    onOpen();
  };

  const onSetToConfirmed = (sale) => {
    dispatch(resetErrorAndRemoval());
    dispatch(setConfirmed(sale._id));
  };

  return (
    <Box>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify="center">
          <Stack direction="row" spacing="4">
            <Spinner
              mt="20"
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="cyan.500"
              size="xl"
            />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Items Sold</Th>
                  <Th>Total</Th>
                  <Th>Confirmed</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sales &&
                  sales.map((sale) => (
                    <Tr key={sale._id}>
                      <Td>{new Date(sale.createdAt).toDateString()}</Td>
                      <Td>{sale.username}</Td>
                      <Td>{sale.email}</Td>

                      <Td>
                        {sale.salesItems.map((item) => (
                          <Box
                            key={item._id}
                            display={"flex"}
                            flexDirection={"row"}
                          >
                            <Text>
                              {item.qty} x {item.name}
                            </Text>
                            <Text ml={5} fontSize={"sm"}>
                              {item.category}
                            </Text>
                          </Box>
                        ))}
                      </Td>
                      <Td>Ksh {sale.totalPrice}</Td>
                      <Td>
                        {sale.isConfirmed ? <CheckCircleIcon /> : "Pending"}
                      </Td>
                      <Td>
                        <Flex direction="column">
                          <Button
                            variant="outline"
                            onClick={() => openDeleteConfirmBox(sale)}
                          >
                            <DeleteIcon mr="5px" />
                            Remove Sale
                          </Button>
                          {!sale.isConfirmed && (
                            <Button
                              mt="4px"
                              variant="outline"
                              onClick={() => onSetToConfirmed(sale)}
                            >
                              <FaCheck />
                              <Text ml="5px">Confirm</Text>
                            </Button>
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ConfirmRemovalAlert
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            itemToDelete={saleToDelete}
            deleteAction={deleteSale}
          />
        </Box>
      )}
    </Box>
  );
};

export default SalesTab;
