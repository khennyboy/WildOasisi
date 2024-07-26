import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from '../features/dashboard/DashboardFilter'

function Dashboard() {
  // const [userData, setUserData] = useState(null)
  // const queryClient = useQueryClient()
  // useEffect(()=>{
  //   const cachedData = queryClient.getQueryData(['user'])
  //   setUserData({...cachedData.user})
  // }, [queryClient])

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>

  );
}

export default Dashboard;
