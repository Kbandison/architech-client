import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllHistory, reset } from "../features/history/historySlice";
import Spinner from "../Components/Spinner";
import AdminOrdersTable from "../Components/AdminOrdersTable";

const AdminOrderHistory = () => {
  const dispatch = useDispatch();
  const { history, isLoading, isError, message } = useSelector(
    (state) => state.history
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getAllHistory());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  const newHistory =
    history && history.length > 0 && history.map((order) => order);

  let reversedhistory = newHistory && newHistory.reverse();

  if (isLoading) return <Spinner />;

  return (
    <div className="table-container">
      <h1>Orders History</h1>
      <AdminOrdersTable
        orders={reversedhistory}
        history={history}
        count={`# of Past Orders: ${history && history.length}`}
      />
    </div>
  );
};

export default AdminOrderHistory;
