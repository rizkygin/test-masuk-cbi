'use client';
import { Button } from "@/src/components/ui/button";
import { useState, CSSProperties, useEffect } from "react";
import getUser from "@/models/user";
import Image from "next/image";
import InputTextLogin from "@/src/components/ui/inputtextlogin";
import Alert from "@/src/components/ui/alert";
import Icons, { eyeClosedIcon, eyeOpenIcon } from "@/public/icons/icons";

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '5rem',
    height: '100vh',
    borderRadius: '1rem',
    margin: '1rem'
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#e1e1e1ff',

    width: '50%',
    height: '100%',
    borderRadius: '1rem'
  }
}

type user = {
  berarToken: string;
  name: string;
  department: string;
  position: string;
}

type props = {
  handleSetIsLogging: (value: boolean, user: user) => void
}



export default function Login({ handleSetIsLogging }: props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }, [showAlert]);


  const handleLogin = async () => {

    const userInput = {
      email: username,
      password: password
    }

    const data = new URLSearchParams({
      'email': username,
      'password': password
    });

    const user = await getUser(userInput).then((data) => {
      if (data.statusCode === 1) {
        handleSetIsLogging(true, data.data);
      } else {
        setShowAlert(true);
        setError(data.message);
      }
    }).catch((error) => {
      setShowAlert(true);
      setError(error.message);
    });

  }

  return (
    <div style={styles.container}>
      {
        error && (
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 'auto', height: 'auto', display: 'flex', zIndex: 100 }}>
            <Alert show={showAlert} message={error} color="red" />
          </div>
        )
      }
      <div style={styles.imageContainer}>
        <Image src="/images/loginwalpaper2.webp" alt="imagelogin" fill={true} style={{ borderRadius: '1rem' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{ position: 'relative', width: '150px', height: '90px', marginBottom: '1rem' }}>
          <Image src="/images/logocbi.png" alt="logocbi" fill={true} style={{ borderRadius: '1rem' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <p style={{ fontFamily: 'Poppins', fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>Login</p>
            <p style={{ fontFamily: 'Poppins', color: 'white', top: '70px', position: 'absolute', fontSize: '0.5rem' }}>Login to your account</p>

          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              {username.length > 0 && (
                <div style={{ position: 'absolute', fontFamily: 'poppins', fontSize: '0.5rem', left: 10, top: -15, color: 'white', paddingRight: '0.5rem', paddingLeft: '0.5rem', height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4754dfff', borderRadius: '0.5rem' }}>
                  <p>Email</p>
                </div>
              )}
              <InputTextLogin styles={error ? { width: '100%', border: '1px solid red' } : { width: '100%' }} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

            </div>
            <div style={{ position: 'relative', width: '100%' }}>
              {password.length > 0 && (
                <div style={{ position: 'absolute', fontFamily: 'poppins', fontSize: '0.5rem', left: 10, top: -15, color: 'white', paddingRight: '0.5rem', paddingLeft: '0.5rem', height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4754dfff', borderRadius: '0.5rem' }}>
                  <p>Password</p>
                </div>
              )}
              <InputTextLogin styles={{ width: '100%' }} type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <div style={{ position: 'absolute', right: -10, top: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button onClick={() => setShowPassword(!showPassword)} style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}><Icons icon={showPassword ? eyeClosedIcon : eyeOpenIcon} color="white" /></Button>
              </div>
            </div>
            <Button style={{ fontFamily: 'poppins', backgroundColor: 'transparent', border: '1px solid #ccc', color: 'white', cursor: 'pointer' }} onClick={handleLogin}>Login</Button>
          </div>
        </div>

      </div>

    </div >
  );
}