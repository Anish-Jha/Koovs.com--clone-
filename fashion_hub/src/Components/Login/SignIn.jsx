import React, { useState } from "react";
import {Box,Breadcrumb,BreadcrumbItem,BreadcrumbLink,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/AuthRedux/action";
import { LOGIN_SUCCESS,LOGIN_FAILURE } from "../../Redux/AuthRedux/actionTypes";
import { extendTheme } from '@chakra-ui/react'


const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}
const theme = extendTheme({ breakpoints })

const SignIn = () => {

  const toast = useToast()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = () => {
    if(email=="" || password==""){
      toast({
        title: 'invalid credentials',
        description: "Please fill all neccessary fields!",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }else if(email=='admin@gmail.com' && password=="admin"){
      navigate("/admin", { replace: true });
    }
    else if (email && password) {
      const params = {
        email,
        password,
      };
    
      dispatch(login(params)).then((res) => {
        if (res === LOGIN_SUCCESS) {
          toast({
            description: "Signed in successfully",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          navigate("/", { replace: true });
        } else{
          toast({
            description: "Please Signup First",
            status: 'error',
            duration: 2000,
            isClosable: true,

          })
        }
        
      });
    }
  };

  return (

    <Box bgColor={'#faf8f8'} borderRadius={'10px'} h='460px' width="420px" p='15px' m='auto' boxShadow='rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' mb='50px'>
        <Box>
          <Heading textAlign="center" mt='50px'>
            Welcome Back
          </Heading>
        </Box>

        <Box mx="auto" maxW="md" py="6">
          <Stack spacing={4}>
            <Box>
              <FormControl>
                <FormLabel fontWeight="hairline">Email address *</FormLabel>
                <Input
                  focusBorderColor="black"
                  errorBorderColor="red.300"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel fontWeight="hairline">Password *</FormLabel>
                <Input
                  focusBorderColor="black"
                  errorBorderColor="red.300"
                  type="password"
                  size="lg"
                 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                 
                />
                 
              </FormControl>
            </Box>
          </Stack>
          <Box paddingTop={{base: "30px", lg: "50px"}} textAlign="center">
            Don't have a account yet?{" "}
            <Link color="rgb(9, 97, 228)" href="signup">
              Sign Up
            </Link>
          </Box>

          <Box display='flex'
    alignItems='center'
    justifyContent='center'>
          <Button
            bgColor={'blue.500'}
            m='auto'
            mt='5px'
            w='40%'
            fontSize={'18px'}
            color={'white'}
            onClick={loginHandler}
            _hover={{bgColor:'green'}}
          >
            Sign In
          </Button>
          </Box>
     
        </Box>
    </Box>
  );
};

export default SignIn;