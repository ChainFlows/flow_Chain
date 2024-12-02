import React, { useEffect, useState, useCallback } from "react";
import { login } from "../../utils/auth";
// import { Notification } from "../../components/utils/Notifications";
// import Login from "./Login";
// import { getClientCompanyByOwner } from "../../utils/clientCompany";
// import { Loader } from "../../components/utils";
// import ActivateClientAccount from "./ActivateClientAccount";
// import CompanyOverviewPage from "./CompanyOverview";

import {flow_chain_backend} from "../../../../declarations/flow_chain_backend";
import AdminDashboard from "../dashboard/AdminDashboard";

const Client = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(false);

  // const isAuthenticated = window.auth.isAuthenticated;

  const fetchClient = useCallback(async () => {
    try {
      setLoading(true);
      setClient(
        await flow_chain_backend.get_client_by_owner()
          .then(async (res) => {
          console.log(res);
          return res.Ok;
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  console.log("client", client);

  useEffect(() => {
    fetchClient();
  }, []);

  return (
    <>
      {/* <Notification />
      {isAuthenticated ? (
        !loading ? (
          client?.name ? (
              <AdminDashboard />
          ) : (
            <ActivateClientAccount
              fetchClient={fetchClient}
            />
          )
        ) : (
          <Loader />
        )
      ) : (
        <Login login={login} />
      )} */}
      <h1>Paragrapgh written</h1>
    </>
  );
};

export default Client;
