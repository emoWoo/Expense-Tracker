import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import CustomModal from "../../components/customModal";
import AddExpenseForm, {
  type AddExpenseFormRef,
} from "../../components/Expense/AddExpenseForm";
import type { ExpenseFormData } from "../../types/expense";
import ExpenseList from "../../components/Expense/ExpenseList";
import { expenseApi } from "../../api/expense";
import toast from "react-hot-toast";
import axios from "axios";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [overviewData, setOverviewData] = useState([]);
  const [openAddExpenseModel, setOpenAddExpenseModal] = useState(false);
  const addExpenseFormRef = useRef<AddExpenseFormRef>(null);
  const [openDelAlert, setOpenDelAlert] = useState({
    show: false,
    data: "",
  });
  const fetchExpenseData = async (showToast = true) => {
    try {
      const req = expenseApi.getExpenses();
      const res = showToast
        ? await toast.promise(req, {
            loading: "正在获取数据...",
            success: "支出数据成功！",
          })
        : await req;
      if (res.data) {
        setOverviewData(res.data.groupedExpense);
        setExpenseData(res.data.expense);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { message?: string } | undefined)?.message ||
          "获取收入数据失败！";
        toast.error(message);
      } else {
        toast.error("获取收入数据失败，请稍后重试！");
      }
    }
  };

  const handleAddExpense = async (expense: ExpenseFormData) => {
    if (!expense.category) {
      toast.error("支出类别不能为空！");
      return;
    }
    if (!expense.description) {
      toast.error("支出描述不能为空！");
      return;
    }
    if (!expense.amount || expense.amount <= 0) {
      toast.error("请填写正确的金额");
      return;
    }
    try {
      setOpenAddExpenseModal(false);
      const req = expenseApi.addExpense(expense);
      await toast.promise(req, {
        loading: "正在添加支出...",
        success: "支出添加成功！",
      });
      await fetchExpenseData(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { message?: string } | undefined)?.message ||
          "添加支出失败！";
        toast.error(message);
      } else {
        toast.error("添加支出失败，请稍后重试！");
      }
    }
  };

  const handleDelExpense = async (id: string) => {
    console.log("删除支出ID:", id);
    try {
      setOpenDelAlert({ show: false, data: "" });
      const req = expenseApi.deleteExpense(id);
      await toast.promise(req, {
        loading: "正在删除...",
        success: "删除成功！",
      });
      await fetchExpenseData(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { message?: string } | undefined)?.message ||
          "删除支出失败！";
        toast.error(message);
      } else {
        toast.error("删除支出失败，请稍后重试！");
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchExpenseData();
    };
    loadData();
    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="expense">
      <div className="mt-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={overviewData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id: string) => setOpenDelAlert({ show: true, data: id })}
            onDownload={() => {}}
          />
        </div>

        <CustomModal
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModal(false)}
          title="增加支出"
          modalType="add"
          confirmText="添加消费"
          onConfirm={() => addExpenseFormRef.current?.addExpense()}
        >
          <AddExpenseForm
            ref={addExpenseFormRef}
            onAddExpense={handleAddExpense}
          />
        </CustomModal>

        <CustomModal
          isOpen={openDelAlert.show}
          onClose={() => setOpenDelAlert({ show: false, data: "" })}
          title="删除支出"
          onConfirm={() => handleDelExpense(openDelAlert.data)}
          confirmText="删除"
          modalType="delete"
        >
          <p>你确定要删除吗?</p>
        </CustomModal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
