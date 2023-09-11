"use client"

import { initializeFirebaseApp } from '@/lib/firebase'; 
import { getApp } from 'firebase/app';
import { Box, ChakraProvider } from '@chakra-ui/react';
import  Voicecontentlist from '@/components/voice/voicecontent';

const DataList = [{
    imageUrl: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "test",
    price: 500,
    userId: "test"
  }, {
    imageUrl: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "test",
    price: 500,
    userId: "test"
  }
]

export default function Home() {
  return (
    <>
      <Voicecontentlist datalist={DataList}/>
    </>
  )
}
