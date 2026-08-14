"use client";

import React, { useState } from "react";
import {
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  Search,
  LogIn,
  UserPlus,
  LogOut,
  Trash2,
  Calendar,
  Tag,
  DollarSign,
  FileText,
  Lock,
  Mail,
  User,
  Wallet,
} from "lucide-react";

// Định dạng tiền tệ VNĐ
const formatCurrency = (amount: number) => {
  return amount.toLocaleString("vi-VN") + " đ";
};

// Dữ liệu mẫu ban đầu
const initialTransactions = [
  {
    id: "1",
    title: "Lương tháng 08",
    type: "INCOME",
    category: "Lương",
    amount: 15000000,
    date: "2026-08-01",
    note: "Chuyển khoản VCB",
  },
  {
    id: "2",
    title: "Tiền điện nước",
    type: "EXPENSE",
    category: "Hóa đơn",
    amount: 850000,
    date: "2026-08-05",
    note: "Điện sinh hoạt",
  },
  {
    id: "3",
    title: "Mua sắm siêu thị",
    type: "EXPENSE",
    category: "Mua sắm",
    amount: 1200000,
    date: "2026-08-08",
    note: "Nhu yếu phẩm",
  },
  {
    id: "4",
    title: "Thưởng dự án Kyanon",
    type: "INCOME",
    category: "Thưởng",
    amount: 3000000,
    date: "2026-08-10",
    note: "Hoàn thành giai đoạn 1",
  },
];

export default function App() {
  // Quản lý trạng thái xác thực & Người dùng
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [authMode, setAuthMode] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });

  // Quản lý giao dịch
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL");

  // Quản lý Modal thêm giao dịch
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({
    title: "",
    amount: "",
    type: "EXPENSE",
    category: "Ăn uống",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  // Xử lý Auth (Đăng nhập / Đăng ký)
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authForm.email || !authForm.password) return;

    if (authMode === "REGISTER") {
      setCurrentUser({
        name: authForm.name || "Nguyễn Trọng Nguyễn",
        email: authForm.email,
      });
    } else {
      setCurrentUser({
        name: authForm.email.split("@")[0],
        email: authForm.email,
      });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthForm({ name: "", email: "", password: "" });
  };

  // Xử lý Thêm giao dịch
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTx.title || !newTx.amount) return;

    const createdTx = {
      id: Date.now().toString(),
      title: newTx.title,
      amount: parseFloat(newTx.amount),
      type: newTx.type,
      category: newTx.category,
      date: newTx.date,
      note: newTx.note,
    };

    setTransactions([createdTx, ...transactions]);
    setIsModalOpen(false);
    setNewTx({
      title: "",
      amount: "",
      type: "EXPENSE",
      category: "Ăn uống",
      date: new Date().toISOString().split("T")[0],
      note: "",
    });
  };

  // Xóa giao dịch
  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Tính toán số liệu
  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Lọc giao dịch
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "ALL" || t.type === filterType;
    return matchesSearch && matchesType;
  });

  // ==========================================
  // 1. MÀN HÌNH ĐĂNG NHẬP / ĐĂNG KÝ (NẾU CHƯA LOGIN)
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-blue-500/30">
              <Wallet className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {authMode === "LOGIN" ? "Đăng Nhập Tài Khoản" : "Đăng Ký Tài Khoản"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Hệ thống Quản Lý Thu Chi Cá Nhân - Kyanon Internship
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === "REGISTER" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Trọng Nguyễn"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  placeholder="nguyen@example.com"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition active:scale-[0.99] flex items-center justify-center gap-2 mt-6"
            >
              {authMode === "LOGIN" ? (
                <>
                  <LogIn className="w-5 h-5" /> Đăng Nhập
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" /> Tạo Tài Khoản
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            {authMode === "LOGIN" ? (
              <p>
                Chưa có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("REGISTER")}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Đăng ký ngay
                </button>
              </p>
            ) : (
              <p>
                Đã có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("LOGIN")}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Đăng nhập
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. MÀN HÌNH DASHBOARD CHÍNH (KHI ĐÃ LOGIN)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Header điều hướng */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-tight">Quản Lý Thu Chi</h1>
              <p className="text-xs text-slate-500">MSSV: 2411020013 - Nhóm 2</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">{currentUser.name}</p>
              <p className="text-xs text-slate-500">{currentUser.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
              title="Đăng xuất"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Banner tiêu đề & Nút thêm giao dịch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Bảng Điều Khiển Tài Chính</h2>
            <p className="text-sm text-slate-500 mt-1">Theo dõi và kiểm soát dòng tiền của bạn hàng ngày</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition active:scale-95"
          >
            <PlusCircle className="w-5 h-5" />
            Thêm Thu / Chi Mới
          </button>
        </div>

        {/* 3 Thẻ chỉ số tổng quan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Thẻ Số Dư */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Số Dư Hiện Tại</p>
              <p className={`text-2xl sm:text-3xl font-extrabold mt-2 ${balance >= 0 ? "text-slate-900" : "text-rose-600"}`}>
                {formatCurrency(balance)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ArrowLeftRight className="w-6 h-6" />
            </div>
          </div>

          {/* Thẻ Tổng Thu */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng Thu Nhập</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-2">
                +{formatCurrency(totalIncome)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          {/* Thẻ Tổng Chi */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng Chi Tiêu</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-2">
                -{formatCurrency(totalExpense)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Khu vực danh sách giao dịch & Bộ lọc */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Thanh công cụ lọc & tìm kiếm */}
          <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, danh mục..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setFilterType("ALL")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterType === "ALL" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilterType("INCOME")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterType === "INCOME" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Thu nhập
              </button>
              <button
                onClick={() => setFilterType("EXPENSE")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterType === "EXPENSE" ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Chi tiêu
              </button>
            </div>
          </div>

          {/* Bảng danh sách */}
          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <p className="text-base font-medium">Không tìm thấy giao dịch nào phù hợp.</p>
              <p className="text-xs text-slate-400 mt-1">Hãy thử đổi từ khóa tìm kiếm hoặc thêm giao dịch mới.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredTransactions.map((tx) => {
                const isIncome = tx.type === "INCOME";
                return (
                  <div
                    key={tx.id}
                    className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/80 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                          isIncome ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {isIncome ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm sm:text-base">{tx.title}</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span className="font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                            {tx.category}
                          </span>
                          <span>•</span>
                          <span>{tx.date}</span>
                          {tx.note && (
                            <>
                              <span>•</span>
                              <span className="italic text-slate-400">{tx.note}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <p
                        className={`text-sm sm:text-base font-bold text-right ${
                          isIncome ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatCurrency(tx.amount)}
                      </p>
                      <button
                        onClick={() => handleDeleteTransaction(tx.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Xóa giao dịch"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* ========================================== */}
      {/* 3. MODAL THÊM KHOẢN THU / CHI */}
      {/* ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Thêm Khoản Thu / Chi Mới</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              {/* Chọn loại Thu/Chi */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Loại giao dịch</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewTx({ ...newTx, type: "EXPENSE" })}
                    className={`py-2 rounded-xl text-sm font-semibold border transition ${
                      newTx.type === "EXPENSE"
                        ? "border-rose-600 bg-rose-50 text-rose-600 shadow-sm"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    🔴 Chi Tiêu
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTx({ ...newTx, type: "INCOME" })}
                    className={`py-2 rounded-xl text-sm font-semibold border transition ${
                      newTx.type === "INCOME"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-600 shadow-sm"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    🟢 Thu Nhập
                  </button>
                </div>
              </div>

              {/* Tiêu đề */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Tiêu đề</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    required
                    placeholder="VD: Mua sách lập trình, Tiền lương..."
                    value={newTx.title}
                    onChange={(e) => setNewTx({ ...newTx, title: e.target.value })}
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>

              {/* Số tiền */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Số tiền (VNĐ)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="number"
                    required
                    min="1000"
                    placeholder="VD: 50000"
                    value={newTx.amount}
                    onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>

              {/* Danh mục & Ngày */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Danh mục</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <select
                      value={newTx.category}
                      onChange={(e) => setNewTx({ ...newTx, category: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    >
                      {newTx.type === "EXPENSE" ? (
                        <>
                          <option value="Ăn uống">Ăn uống</option>
                          <option value="Mua sắm">Mua sắm</option>
                          <option value="Đi lại">Đi lại</option>
                          <option value="Hóa đơn">Hóa đơn</option>
                          <option value="Học tập">Học tập</option>
                          <option value="Khác">Khác</option>
                        </>
                      ) : (
                        <>
                          <option value="Lương">Lương</option>
                          <option value="Thưởng">Thưởng</option>
                          <option value="Thu nhập phụ">Thu nhập phụ</option>
                          <option value="Đầu tư">Đầu tư</option>
                          <option value="Khác">Khác</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Ngày</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="date"
                      required
                      value={newTx.date}
                      onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Ghi chú */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Ghi chú (Tùy chọn)</label>
                <input
                  type="text"
                  placeholder="Ghi chú thêm..."
                  value={newTx.note}
                  onChange={(e) => setNewTx({ ...newTx, note: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>

              {/* Nút hành động */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition active:scale-95"
                >
                  Lưu Giao Dịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}