import { Container, Typography, Box } from '@mui/material';
import LoginForm from './LoginForm';

const LoginPage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#007FFF',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        m: 0,
        p: 0,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ bgcolor: '#fbfbfc', padding: 3, boxShadow: 3, borderRadius: '5px' }}
      >
        <Typography variant="h4" color="#3d1ce2ff" textAlign={'center'} padding={'1em'}>
          Login
        </Typography>
        <LoginForm />
      </Container>
    </Box>
  );
};

export default LoginPage;
