import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useQueryClient } from "@tanstack/react-query";

function Dashboard() {
    const [userData, setUserData] = useState(null)
    const queryClient = useQueryClient()
    useEffect(()=>{
      const cachedData = queryClient.getQueryData(['user'])
      setUserData({...cachedData.user})
    }, [queryClient])
    
  return (
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <p>TEST</p>
      <p>Welcome! {userData && userData?.user_metadata.fullName} </p>
    </Row>
  );
}

export default Dashboard;
