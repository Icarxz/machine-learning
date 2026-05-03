import { Box } from '@chakra-ui/react';
import AuthForm from '../components/auth/AuthForm';

export default function AuthPage() {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <AuthForm />
    </Box>
  );
}