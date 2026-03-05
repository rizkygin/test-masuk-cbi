
'use client';

import { useState, useEffect } from "react";
import Login from "@/src/components/pages/login";
import { createContext } from "react";
import { Button } from "@/src/components/ui/button";

type user = {
  berarToken: string;
  name: string;
  department: string;
  position: string;
}
export const userContext = createContext({
  berarToken: '',
  name: '',
  department: '',
  position: ''
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const [user, setUser] = useState<user>({
    berarToken: '',
    name: '',
    department: '',
    position: ''
  });

  const [isLogging, setIsLogging] = useState(false);

  const handleSetIsLogging = (x: boolean, user: user) => {
    setIsLogging(x);
    setUser(user);
  }

  const handleLogout = () => {
    console.log('logout');
    setIsLogging(false);
    sessionStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  }


  return (
    <html>
      <body style={{ backgroundColor: '#4754dfff' }}>
        {sessionStorage.getItem('user') === null ? <Login handleSetIsLogging={handleSetIsLogging} /> :
          <nav>

            <userContext.Provider value={user}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <div style={{ position: 'absolute', top: 0, right: 20 }}>

                  <Button onClick={handleLogout}>Logout</Button>
                </div>
                <div className="flex justify-between">
                  <div>{children}</div>
                </div>
              </div>


            </userContext.Provider>
          </nav>}

      </body>
    </html>
  );
}
