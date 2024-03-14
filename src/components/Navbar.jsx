/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

//Chakra
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Divider,
  Image,
  Spacer,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

import { useRef } from "react";
import AlertDialogPrint from "./AlertDialogPrint";
//icons
import { BiUserCheck, BiLogInCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import {
  MdHistory,
  MdOutlineAttachMoney,
  MdLogout,
  MdOutlineAdminPanelSettings,
  MdCached,
} from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";

//react
import { useState, useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { googleLogout } from "@react-oauth/google";

const links = [
  { linkName: "Products", path: "/products" },
  { linkName: "Saved", path: "/saved" },

  {
    linkName: "Search",
    path: "/search",
  },
  {
    linkName: "Info",
    path: "/info",
  },
];

const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    px={2}
    py={2}
    rounded="md"
    fontFamily="Lucida Console"
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const toast = useToast();

  const [isHovering, setIsHovering] = useState(false);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [showBanner, setShowBanner] = useState(
    userInfo ? !userInfo.active : false
  );

  useEffect(() => {
    if (userInfo && !userInfo.active) {
      setShowBanner(true);
    }
  }, [dispatch, userInfo]);

  const logoutHandler = () => {
    googleLogout();

    dispatch(logout());
    toast({
      description: "You have been logged out",
      status: "success",
      isClosable: true,
    });
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack>
            <Link
              as={ReactLink}
              to="/"
              style={{ textDecoration: "none" }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Flex alignItems="center">
                <Image
                  w={{ lg: 12, base: 9 }}
                  h={{ lg: 12, base: 9 }}
                  src={"/gnlogo.jpg"}
                  display={{ lg: "flex", md: "flex", base: "none" }}
                  rounded={"md"}
                />

                <Text
                  fontWeight="extrabold"
                  ml={2}
                  fontFamily={"Times New Roman"}
                >
                  GN Cyclemart
                </Text>
              </Flex>
            </Link>
            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              {links.map((link) => (
                <NavLink key={link.linkName} path={link.path}>
                  {link.linkName}
                </NavLink>
              ))}
            </HStack>
            <NavLink>
              <Icon
                as={colorMode === "light" ? MoonIcon : SunIcon}
                alignSelf="center"
                onClick={() => toggleColorMode()}
              />
            </NavLink>
          </HStack>
          <Flex alignItems="center">
            {userInfo ? (
              <Menu>
                <MenuButton
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW="0"
                >
                  <HStack>
                    {userInfo.googleImage ? (
                      <Image
                        borderRadius="full"
                        boxSize="40px"
                        src={userInfo.googleImage}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <BiUserCheck size="30" />
                    )}

                    <ChevronDownIcon />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <HStack>
                    <Text pl="3" as="i">
                      {userInfo.email}
                    </Text>
                    {userInfo.googleId && <FcGoogle />}
                  </HStack>
                  <Divider py="1" />
                  {userInfo.isAdmin && (
                    <>
                      <MenuItem as={ReactLink} to="/sales">
                        <MdOutlineAttachMoney />
                        <Text ml="2">Daily Sales</Text>
                      </MenuItem>
                      <MenuDivider />
                    </>
                  )}

                  <MenuItem as={ReactLink} to="/out">
                    <MdHistory />
                    <Text ml="2"> Out of Stock</Text>
                  </MenuItem>
                  <MenuDivider />

                  <MenuItem>
                    <MdCached />
                    <Text ml="2"> Clear Cache</Text>
                  </MenuItem>

                  {userInfo.isSuperAdmin && (
                    <>
                      <MenuDivider />
                      <MenuItem as={ReactLink} to="/admin-console">
                        <MdOutlineAdminPanelSettings />
                        <Text ml="2">Admin Console</Text>
                      </MenuItem>
                    </>
                  )}
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>
                    <MdLogout />
                    <Text ml="2">Logout</Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <AiOutlineUserDelete />
                    <Text ml="2">Delete Account</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button
                  as={ReactLink}
                  p={2}
                  fontSize="sm"
                  variant="link"
                  to="/login"
                  colorScheme="blue"
                  fontWeight={"bold"}
                >
                  Sign In
                </Button>
                <Button
                  as={ReactLink}
                  m={2}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize="sm"
                  fontWeight={"bold"}
                  to="/registration"
                  colorScheme="blue"
                  borderRadius={50}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              {links.map((link) => (
                <NavLink key={link.linkName} path={link.path}>
                  {link.linkName}
                </NavLink>
              ))}
              {userInfo === null && (
                <NavLink key="signUp" path="/registration">
                  Sign Up
                </NavLink>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
      {userInfo && !userInfo.active && showBanner && (
        <Box>
          <Alert status="warning">
            <AlertIcon />
            <AlertTitle>Email not verified!</AlertTitle>
            <AlertDescription>
              You must verify your email address.
            </AlertDescription>
            <Spacer />
            <CloseIcon
              cursor={"pointer"}
              onClick={() => setShowBanner(false)}
            />
          </Alert>
        </Box>
      )}
    </>
  );
};

export default Navbar;
