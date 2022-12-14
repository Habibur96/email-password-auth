
import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';



const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const handleEmailBlur = event => {
    setEmail(event.target.value)
  }

  const handlePasswordBlur = event => {
    setPassword(event.target.value);

  }

  const handleRegisteredChange = event => {
    setRegistered(event.target.checked);
  }



  const handleFormSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (!/(?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]/.test(password)) {
      setError('Password should contain at least one special character');
      return
    }
    setValidated(true);
    setError('');

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.log(error);
          setError(error.message);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');
          verifyEmail();
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })

    }

    console.log('form submitted', email, password)
  }

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email sent');
      })
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email Varification Sent')
      })
  }
  return (
    <div >
      <div className="registration w-50 mx-auto mt-5">
        <h2 className='text-primary'>Please {registered ? 'Login' : 'Register'}!!</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />

            <Form.Control.Feedback type="invalid">
              Please provide your email.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide your password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicCheckbox">

            <Form.Check onChange={handleRegisteredChange} type='checkbox' label="Already Registered?" />
          </Form.Group>


          <p className='text-danger'>{error}</p>
          <Button onClick={handlePasswordReset} variant="link"> Forget Password?</Button> <br />
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>


    </div>
  );
}

export default App;
