import { initializeFirebaseApp } from '@/lib/firebase'; 
import { getApp } from 'firebase/app';
import { Box, ChakraProvider } from '@chakra-ui/react';

initializeFirebaseApp();
export default function Home() {
  console.log(getApp());
  return (
    <ChakraProvider>
      <Box>Hello world</Box>
    </ChakraProvider>
  )
}
