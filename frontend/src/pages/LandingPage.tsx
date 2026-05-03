import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <VStack gap={6} textAlign="center" p={8} bg="white" shadow="md" borderRadius="xl" maxW="lg">
        <Heading size="2xl" color="gray.800">
          Machine Learning Hub
        </Heading>
        <Text fontSize="lg" color="gray.600">
          A simple, integrated platform for exploring machine learning concepts, built with React, Supabase, and Vercel.
        </Text>
        <Button 
          size="lg" 
          bg="#5E766C" 
          color="white" 
          _hover={{ bg: "#4a5d55" }}
          onClick={() => navigate('/auth')}
        >
          Get Started
        </Button>
      </VStack>
    </Box>
  );
}