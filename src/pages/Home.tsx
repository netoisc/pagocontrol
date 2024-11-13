import ListOrganizations from "../components/OrganizationList";

function Home(){

    return (
        <div className="row">
          <h1 className="h1">Mis organizaciones</h1>
          <ListOrganizations />
        </div>
    )
}

export default Home;
