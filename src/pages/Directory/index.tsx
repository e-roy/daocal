import React, { useEffect, useState } from "react";
import { TextField, Button } from "../../components/elements";
import { checkUserTokens, createNewDao } from "../../utils/directory/index";

export default function DirectoryPage() {
  const [loading, setLoading] = useState(true);
  const [gatedTokens, setGatedTokens] = useState([]);
  const [daoAddress, setDaoAddress] = useState("");

  useEffect(() => {
    console.log("DirectoryPage");

    const fetchData = async () => {
      const gatedTokens: any = await checkUserTokens();
      console.log(gatedTokens);
      setGatedTokens(gatedTokens);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>directory page</div>
      {daoAddress}
      <TextField
        label="dao address"
        onChange={(e) => setDaoAddress(e.target.value)}
      />
      <Button onClick={() => createNewDao(daoAddress)}>create dao</Button>
    </div>
  );
}
