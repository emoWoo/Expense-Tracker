import { forwardRef, useImperativeHandle, useState } from "react";
import Selector from "../../components/Input/Selector";
import Input from "../../components/Input/Input";
import { INCOME_SOURCE_CONFIG } from "../../constants/income";
import type { IncomeFormData } from "../../types/income";

export type AddIncomeFormRef = {
  addIncome: () => void;
};

type AddIncomeFormProps = {
  onAddIncome: (income: IncomeFormData) => void;
};

const AddIncomeForm = forwardRef<AddIncomeFormRef, AddIncomeFormProps>(
  ({ onAddIncome }, ref) => {
    const initialIncome: IncomeFormData = {
      source: "",
      amount: 0,
      date: "",
      description: "",
    };

    const [income, setIncome] = useState<IncomeFormData>(initialIncome);

    const handleChange = <K extends keyof IncomeFormData>(
      key: K,
      value: IncomeFormData[K],
    ) => {
      setIncome((prev) => ({ ...prev, [key]: value }));
    };

    const incomeSourceOptions = INCOME_SOURCE_CONFIG.map((item) => ({
      label: item.label,
      value: item.value,
    }));

    const handleSubmit = () => {
      onAddIncome(income);
      setIncome(initialIncome);
    };

    useImperativeHandle(ref, () => ({
      addIncome: handleSubmit,
    }));

    return (
      <div>
        <Selector
          label="来源"
          placeholder=""
          value={income.source}
          options={incomeSourceOptions}
          onChange={(e) => handleChange("source", e.target.value)}
        />
        <Input
          label="描述"
          type="text"
          placeholder="输入收入描述"
          value={income.amount ? income.amount.toString() : ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <Input
          label="数目"
          type="number"
          placeholder="输入收入数目"
          value={income.amount ? income.amount.toString() : ""}
          onChange={(e) =>
            handleChange(
              "amount",
              e.target.value ? parseFloat(e.target.value) : 0,
            )
          }
        />

        <Input
          label="日期"
          type="date"
          placeholder=""
          value={income.date}
          onChange={(e) => handleChange("date", e.target.value)}
        />
      </div>
    );
  },
);

AddIncomeForm.displayName = "AddIncomeForm";

export default AddIncomeForm;
