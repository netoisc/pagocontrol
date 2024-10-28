import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();


function App() {
  const { signOut, user} = useAuthenticator();
  const [organizations, setOrganizations] = useState<Array<Schema["Organization"]["type"]>>([]);

  useEffect(() => {
    client.models.Organization.observeQuery().subscribe({
      next: (data) => setOrganizations([...data.items]),
    });
  }, []);

  return (
    <main>
      <h1>Control de pagos</h1>
      <div>
      <h1>Bienvenido {user?.username}</h1>
      <ul>
        {organizations.map((org) => (
          <li key={org.id}>{org.name}</li>
        ))}
      </ul>
      </div>
      <div>
      </div>

      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
