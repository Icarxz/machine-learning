import { useEffect, useState } from 'react';
import { Box, Button, Heading, Text, VStack, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | undefined>('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth'); // Boot them out if not logged in
      } else {
        setUserEmail(session.user.email);
      }
      setLoading(false);
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return <Box minH="100vh" display="flex" justifyContent="center" alignItems="center"><Spinner size="xl" /></Box>;
  }

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <VStack gap={6} p={8} bg="white" shadow="md" borderRadius="xl" textAlign="center">
        <Heading size="xl">Welcome to the Dashboard!</Heading>
        <Text fontSize="lg" color="gray.600">
          You are successfully logged in as: <strong>{userEmail}</strong>
        </Text>
        <Button onClick={handleLogout} colorScheme="red" variant="outline">
          Logout
        </Button>
      </VStack>
    </Box>
  );
}