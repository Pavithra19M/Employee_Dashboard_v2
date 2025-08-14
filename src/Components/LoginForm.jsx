import { useState, useCallback } from 'react';
import { TextField, Typography, InputAdornment, Button, IconButton } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { messages } from '../config/Message';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailTxtFieldErr, setEmailTxtFieldErr] = useState('');
  const [passTxtFieldErr, setPassTxtFieldErr] = useState([]);

  const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegx = /^[a-zA-Z0-9_()@.!#]+$/;
  const hasCaptialRegex = /[A-Z]/;

  //useCallback memoizes the function so it doesn’t get recreated on every render
  //togglePasswordVisibility - to show and hide password
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // validates for text box
  const isValidate = () => {
    let isValid = true;
    let passwordErr = [];

    if (email.trim() === '') {
      setEmailTxtFieldErr(messages.emailField);
      isValid = false;
    } else if (!emailRegx.test(email)) {
      setEmailTxtFieldErr(messages.emailRegxErr);
      isValid = false;
    }

    if (password.trim() === '') {
      passwordErr.push(messages.passwordFiled);
      setPassTxtFieldErr(passwordErr);
      isValid = false;
      return isValid;
    }

    if (!passwordRegx.test(password.trim())) {
      passwordErr.push(messages.passRegex1);
      isValid = false;
    }
    if (!hasCaptialRegex.test(password)) {
      passwordErr.push(messages.passRegex2);
      isValid = false;
    }
    if (password.trim().length < 8) {
      passwordErr.push(messages.passRegex3);
      isValid = false;
    }

    setPassTxtFieldErr(passwordErr);
    return isValid;
  };

  //submitHandler
  const submitHandler = e => {
    e.preventDefault();
    if (!isValidate()) return;
    // console.log('submitted');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <TextField
          placeholder="Enter EmailId"
          sx={{ width: '100%', mb: 2 }}
          type="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setEmailTxtFieldErr('');
          }}
          error={!!emailTxtFieldErr}
          helperText={emailTxtFieldErr}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          placeholder="Enter Password"
          sx={{ width: '100%', mb: 2 }}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setPassTxtFieldErr([]);
          }}
          error={!!passTxtFieldErr.length}
          helperText={
            passTxtFieldErr.length > 0 && (
              <>
                {passTxtFieldErr.map((err, index) => (
                  <Typography variant="caption" color="error" display="block" key={index}>
                    {err}
                  </Typography>
                ))}
              </>
            )
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="subtitle1">
          Forgot Password? <a href="#">Click here!</a>
        </Typography>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
