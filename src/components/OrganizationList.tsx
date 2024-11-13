import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

type Organization = Schema["Organization"]["type"];

const ListOrganizations = () =>{
    const [organizations, setOrganizations] = useState<Organization[]>([]);



    useEffect(() => {
        client.models.Organization.observeQuery().subscribe({
          next: (data) => setOrganizations([...data.items]),
        });
      }, []);

      return (
        <>
            {organizations.length == 0 &&
            (
                <div className="row">
                    <Link to="/create-organization">Crea tu primer organización o negocio para registrar y llevar control de pagos</Link>
                </div>
            )
            }
            {organizations.length > 0 &&
            organizations.map((org) => (
                <div className="row">
                    {org.name}
                </div>
            ))}
        </>
      );

};

export default ListOrganizations;
