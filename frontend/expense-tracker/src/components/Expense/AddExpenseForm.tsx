import { forwardRef, useImperativeHandle, useState } from "react";
import Selector from "../../components/Input/Selector";
import Input from "../../components/Input/Input";
import { EXPENSE_CATEGORY_CONFIG } from "../../constants/expenseConfig";
import type { ExpenseFormData } from "../../types/expense";

export type AddExpenseFormRef = {
  addExpense: () => void;
};

type AddExpenseFormProps = {
  onAddExpense: (expense: ExpenseFormData) => void;
};

const AddExpenseForm = forwardRef<AddExpenseFormRef, AddExpenseFormProps>(
  ({ onAddExpense }, ref) => {
    const initialExpense: ExpenseFormData = {
      category: "",
      amount: 0,
      date: "",
      description: "",
    };

    const [expense, setExpense] = useState<ExpenseFormData>(initialExpense);

    const handleChange = <K extends keyof ExpenseFormData>(
      key: K,
      value: ExpenseFormData[K],
    ) => {
      setExpense((prev) => ({ ...prev, [key]: value }));
    };

    const expenseSourceOptions = EXPENSE_CATEGORY_CONFIG.map((item) => ({
      label: item.label,
      value: item.value,
    }));

    const handleSubmit = () => {
      onAddExpense(expense);
      setExpense(initialExpense);
    };

    useImperativeHandle(ref, () => ({
      addExpense: handleSubmit,
    }));

    return (
      <div>
        <Selector
          label="类别"
          placeholder=""
          value={expense.category}
          options={expenseSourceOptions}
          onChange={(e) => handleChange("category", e.target.value)}
        />
        <Input
          label="描述"
          type="text"
          placeholder="输入收入描述"
          value={expense.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <Input
          label="数目"
          type="number"
          placeholder="输入收入数目"
          value={expense.amount ? expense.amount.toString() : ""}
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
          value={expense.date}
          onChange={(e) => handleChange("date", e.target.value)}
        />
      </div>
    );
  },
);

AddExpenseForm.displayName = "AddIncomeForm";

export default AddExpenseForm;
