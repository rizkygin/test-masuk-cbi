'use client';
import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import getUser from "@/models/user";

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
      handleSetIsLogging(true, data.data);
    });

  }

  return (
    <div className="flex flex-col gap-2">
      <h1>Login</h1>
      <p>Login to your account</p>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}