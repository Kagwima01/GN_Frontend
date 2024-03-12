import {
  Tr,
  Td,
  Button,
  VStack,
  Textarea,
  Tooltip,
  Input,
  FormControl,
  Switch,
  FormLabel,
  Text,
  Badge,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProduct } from "../redux/actions/adminActions";

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.admin);

  const [name, setName] = useState("");
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [stock, setStock] = useState("");
  const [productIsNew, setProductIsNew] = useState(false);

  const createNewProduct = () => {
    dispatch(
      uploadProduct({
        name,
        images: [`${imageOne}`, `${imageTwo}`],
        brand,
        category,
        description,
        buyingPrice,
        sellingPrice,
        stock,
        productIsNew,
      })
    );
  };

  return (
    <Tr>
      <Td>
        <Text fontSize="sm">Image Url Path 1</Text>
        <Tooltip
          label={
            "Enter the image url of your first image e.g., https://laundrybag.jpg"
          }
          fontSize="sm"
        >
          <Input
            size="sm"
            value={imageOne}
            onChange={(e) => setImageOne(e.target.value)}
          />
        </Tooltip>
        <Spacer />
        <Text fontSize="sm">Image Url Path 2</Text>
        <Tooltip
          label={
            "Enter the image url of the second image e.g., https://canvastote-bag.jpg"
          }
          fontSize="sm"
        >
          <Input
            size="sm"
            value={imageTwo}
            onChange={(e) => setImageTwo(e.target.value)}
          />
        </Tooltip>
      </Td>
      <Td>
        <Text fontSize="sm">Description</Text>
        <Textarea
          value={description}
          w="270px"
          h="120px"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          size="sm"
        />
      </Td>
      <Td>
        <Text fontSize="sm">Name</Text>
        <Input
          size="sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Craft bag"
        />
        <Text fontSize="sm">Category</Text>
        <Input
          size="sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="CG 150"
        />
      </Td>
      <Td>
        <Text fontSize="sm">Brand</Text>
        <Input
          size="sm"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Vinslon"
        />
        <Text fontSize="sm">Stock</Text>
        <Input
          size="sm"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="4"
        />
      </Td>
      <Td>
        <Text fontSize="sm">Selling Price</Text>
        <Input
          size="sm"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          placeholder="1200"
        />
        <Text fontSize="sm">Buying Price</Text>
        <Input
          size="sm"
          value={buyingPrice}
          onChange={(e) => setBuyingPrice(e.target.value)}
          placeholder="1000"
        />
      </Td>

      <Td>
        <Text fontSize="sm">New badge shown on product card</Text>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="productIsNewFlag" mb="0" fontSize="sm">
            Enable
            <Badge
              rounded="full"
              px="1"
              mx="1"
              fontSize="0.8em"
              colorScheme="green"
            >
              new
            </Badge>
            badge?
          </FormLabel>
          <Switch
            id="productIsNewFlag"
            onChange={() => setProductIsNew(!productIsNew)}
            isChecked={productIsNew}
          />
        </FormControl>
      </Td>
      <Td>
        <VStack>
          <Button
            variant="outline"
            w="160px"
            colorScheme="blue"
            onClick={createNewProduct}
            isLoading={loading}
          >
            <Text ml="2">Save Product</Text>
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};

export default AddNewProduct;
