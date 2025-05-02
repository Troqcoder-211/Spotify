import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import TransactionService from "../services/TransactionService";
import { useDispatch, useSelector } from "react-redux";
import {setAccountType} from "../features/auth/authSlice"

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const orderCode = query.get("orderCode");
    const payosStatus = query.get("status"); // "PAID", "CANCELLED", ...

    if (orderCode && payosStatus === "PAID") {
      // Gọi API cập nhật trạng thái
      updateTransactionStatus(orderCode);
    } else {
      alert("Thanh toán không thành công hoặc bị huỷ.");
      navigate("/");
    }
  }, []);

  const updateTransactionStatus = async (orderCode) => {
    try {
      const res = await TransactionService.updateStatusTransaction(orderCode);
      if (res.success) {
        dispatch(setAccountType("premium"))
        navigate("/");
      } else {
        alert("Không cập nhật được giao dịch.");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Lỗi cập nhật giao dịch.");
    }
  };

  return <div>Đang xử lý thanh toán...</div>;
};

export default PaymentSuccess;
