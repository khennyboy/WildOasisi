import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyle";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="cabins" element={<Cabins />} />
        <Route path="users" element={<NewUsers />} />
        <Route path="settings" element={<Settings />} />
        <Route path="account" element={<Account />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <GlobalStyles />

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;

// import styled from "styled-components"
// import GlobalStyles from "./styles/GlobalStyle"
// import Button from "./ui/Button"
// import Input from "./ui/Input"
// import Heading from "./ui/Heading"
// import Row from "./ui/Row"

// const StyledApp = styled.div`
//   padding: 20px;
// `

// const App = () => {

//   return (
//     <>
//       <GlobalStyles/>
//       <StyledApp>
//         <Row >
//           <Row type= 'horizontal'>
//             <Heading type='h1'>The Wild Oasis</Heading>
//             <div>
//               <Heading as='h2' type = 'h2'>Check in and out</Heading>
//               <Button >Check in</Button>
//               <Button variation = 'secondary' size= 'small'>Check Out</Button>
//             </div>
//           </Row>
//           <Row >
//             <Heading as ='h3' type = 'h3'>Form</Heading>
//             <form>
//               <Input type="number" placeholder="Number of Guests"/>
//               <Input type="number" placeholder="Number of Guests"/>
//             </form>
//           </Row>
//         </Row>
//       </StyledApp>
//     </>
//   )
// }

// export default App
