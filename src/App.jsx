import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home/Home";
import Topup from "./Routes/Topup/Topup";
import Transaction from "./Routes/Transaction/Transaction";
import Account from "./Routes/Account/Account";
import Login from "./Routes/Login/Login";
import Regist from "./Routes/Regist/Regist";
import AccountEdit from "./Routes/Account/AccountEdit";
import Images from "./Components/UploadImages/Images";
import Payment from "./Routes/Payment/Payment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/topup" element={<Topup />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/account" element={<Account />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/account" element={<Account />} />
        <Route path="/accountEdit" element={<AccountEdit />} />
        <Route path="/images" element={<Images />} />
        <Route path="/payment/:serviceCode" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;
