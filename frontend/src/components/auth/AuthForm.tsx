import { useState } from 'react';
import { Box, Button, Input, VStack, Text, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);
  const navigate = useNavigate();

  const getAuthErrorMessage = (error: any) => {
    const message = typeof error?.message === 'string' ? error.message : 'An unexpected error occurred. Please try again.';
    const normalized = message.toLowerCase();

    if (/rate.*limit|too many|throttl|email.*rate|rate.*email/.test(normalized)) {
      return 'Too many email requests have been sent. Please wait a few minutes and try again.';
    }

    return message;
  };

  const handleSignUp = async () => {
    const emailValue = email.trim().toLowerCase();

    if (!emailValue || !password) {
      setMessage({ text: 'Please enter a valid email and password.', type: 'error' });
      return;
    }
    if (password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signUp({ email: emailValue, password });
    
    if (error) {
      setMessage({ text: getAuthErrorMessage(error), type: 'error' });
    } else {
      setMessage({ text: 'Sign up successful! You can now log in.', type: 'success' });
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    const emailValue = email.trim().toLowerCase();

    if (!emailValue || !password) {
      setMessage({ text: 'Please enter your email and password.', type: 'error' });
      return;
    }
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email: emailValue, password });
    
    if (error) {
      setMessage({ text: getAuthErrorMessage(error), type: 'error' });
    } else {
      navigate('/dashboard'); // Redirect on success
    }
    setLoading(false);
  };

  return (
    <Box p={8} bg="white" shadow="md" borderRadius="xl" w="full" maxW="md">
      <VStack gap={4}>
        <Heading size="lg">Access the Hub</Heading>
        
        {message && (
          <Text color={message.type === 'error' ? 'red.500' : 'green.500'} fontSize="sm" textAlign="center">
            {message.text}
          </Text>
        )}

        <Input 
          placeholder="Email address" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input 
          placeholder="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <VStack w="full" gap={2} mt={4}>
          <Button w="full" bg="#5E766C" color="white" _hover={{ bg: "#4a5d55" }} onClick={handleLogin} disabled={loading}>
            {loading ? 'Processing...' : 'Login'}
          </Button>
          <Button w="full" variant="outline" color="#5E766C" borderColor="#5E766C" onClick={handleSignUp} disabled={loading}>
            Sign Up
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}