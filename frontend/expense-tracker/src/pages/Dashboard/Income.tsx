import { useEffect, useRef, useState } from "react";
import IncomeOverview from "../../components/Income/IncomeOverview";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast from "react-hot-toast";
import { incomeApi } from "../../api/income";
import axios from "axios";
import type { IncomeFormData } from "../../types/income";

import AddIncomeForm, {
  type AddIncomeFormRef,
} from "../../components/Income/AddIncomeForm";

import IcomeList from "../../components/Income/IcomeList";
import CustomModal from "../../components/customModal";
import { useUserAuth } from "../../hooks/useUserAuth";

//todo:将统计图的下标换成日期

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [openAddIncomeModel, setOpenAddIncomeModal] = useState(false);
  const addIncomeFormRef = useRef<AddIncomeFormRef>(null);
  const [openDelAlert, setOpenDelAlert] = useState({
    show: false,
    data: "",
  });

  const fetchIncomeData = async (showToast = true) => {
    try {
      const req = incomeApi.getIcomes();
      const res = showToast
        ? await toast.promise(req, {
            loading: "正在获取收入数据...",
            success: "收入数据获取成功！",
          })
        : await req;

      if (res.data) {
        setIncomeData(res.data.incomes);
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

  const handleAddIncome = async (income: IncomeFormData) => {
    const { description, source, amount, date } = income;
    if (!description) {
      toast.error("收入描述不能为空！");
      return;
    }
    if (!source) {
      toast.error("收入来源不能为空！");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("请输入有效的收入金额！");
      return;
    }
    if (!date) {
      toast.error("请选择收入日期！");
      return;
    }
    try {
      await toast.promise(incomeApi.addIcome(income), {
        loading: "正在添加收入...",
        success: "收入添加成功！",
      });
      await fetchIncomeData(false);
      setOpenAddIncomeModal(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { message?: string } | undefined)?.message ||
          "添加收入失败！";
        toast.error(message);
      } else {
        toast.error("添加收入失败，请稍后重试！");
      }
    }
  };

  const handleDelIncome = async (id: string) => {
    try {
      await toast.promise(incomeApi.deleteIcome(id), {
        loading: "正在删除...",
        success: "删除成功！",
      });
      await fetchIncomeData(false);
      setOpenDelAlert({ show: false, data: "" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { message?: string } | undefined)?.message ||
          "删除收入失败！";
        toast.error(message);
      } else {
        toast.error("删除收入失败，请稍后重试！");
      }
    }
  };

  const handleEditIncome = async () => {};

  useEffect(() => {
    const loadIncomeData = async () => {
      await fetchIncomeData();
    };

    loadIncomeData();
    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="income">
      <div className="mt-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <IcomeList
          transactions={incomeData}
          onDelete={(income) =>
            setOpenDelAlert({ show: true, data: income._id })
          }
          // onEdit={(income) => handleEditIncome(income)}
          onDownload={(income) => console.log("Download income:", income)}
        />

        <CustomModal
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
          onConfirm={() => addIncomeFormRef.current?.addIncome()}
          confirmText="添加"
          modalType="add"
        >
          <AddIncomeForm ref={addIncomeFormRef} onAddIncome={handleAddIncome} />
        </CustomModal>

        <CustomModal
          isOpen={openDelAlert.show}
          onClose={() => setOpenDelAlert({ show: false, data: "" })}
          title="Delete Income"
          onConfirm={() => handleDelIncome(openDelAlert.data)}
          confirmText="删除"
          modalType="delete"
        >
          <p>你确定要删除吗?</p>
        </CustomModal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
