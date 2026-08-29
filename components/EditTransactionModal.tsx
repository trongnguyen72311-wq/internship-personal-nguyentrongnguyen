"use client";

import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { updateTransaction } from "@/app/actions/transactions";

interface Category {
  id: string;
  name: string;
  type: string;
}

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  date: Date | string;
  categoryId: string;
}

export default function EditTransactionModal({
  transaction,
  categories,
}: {
  transaction: Transaction;
  categories: Category[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(transaction.type);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formattedDate = new Date(transaction.date).toISOString().split("T")[0];
  const filteredCategories = categories.filter((c) => c.type === type);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("id", transaction.id);

    const res = await updateTransaction(formData);
    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-1.5 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded-lg transition"
        title="Chỉnh sửa giao dịch"
      >
        <Pencil className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">✏️ Chỉnh Sửa Giao Dịch</h3>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setType("EXPENSE")}
                  className={`py-2 text-xs font-semibold rounded-lg transition ${
                    type === "EXPENSE" ? "bg-rose-500 text-white shadow" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Chi Tiêu
                </button>
                <button
                  type="button"
                  onClick={() => setType("INCOME")}
                  className={`py-2 text-xs font-semibold rounded-lg transition ${
                    type === "INCOME" ? "bg-emerald-500 text-white shadow" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Thu Nhập
                </button>
              </div>
              <input type="hidden" name="type" value={type} />

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Tên giao dịch</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={transaction.title}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Số tiền (VNĐ)</label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={transaction.amount}
                  required
                  min="1"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Danh mục</label>
                  <select
                    name="categoryId"
                    defaultValue={transaction.categoryId}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500"
                  >
                    {filteredCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Ngày</label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={formattedDate}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Đang lưu..." : "Cập Nhật Giao Dịch"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}