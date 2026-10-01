// app/admin/(protected)/users/page.tsx
"use client";

import { useState, useMemo } from "react";
import {
  Users as UsersIcon,
  Search,
  Trash2,
  ShieldCheck,
  ShieldOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Role = "admin" | "moderator" | "student";
type Status = "active" | "suspended";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joinedAt: string;
  avatar: string;
  avatarColor: string;
}

const MOCK_USERS: User[] = [
  { id: "u1",  name: "Aarav Sharma",      email: "aarav.sharma@univgeeks.in",    role: "admin",     status: "active",    joinedAt: "2024-01-10", avatar: "AS", avatarColor: "#1C2B3A" },
  { id: "u2",  name: "Priya Mehta",       email: "priya.mehta@univgeeks.in",     role: "moderator", status: "active",    joinedAt: "2024-03-22", avatar: "PM", avatarColor: "#8D6FA3" },
  { id: "u3",  name: "Rohan Gupta",       email: "rohan.gupta@student.in",       role: "student",   status: "active",    joinedAt: "2024-06-05", avatar: "RG", avatarColor: "#5B7A99" },
  { id: "u4",  name: "Sneha Patel",       email: "sneha.patel@student.in",       role: "student",   status: "suspended", joinedAt: "2024-07-14", avatar: "SP", avatarColor: "#E8A33D" },
  { id: "u5",  name: "Karan Verma",       email: "karan.verma@student.in",       role: "student",   status: "active",    joinedAt: "2024-08-01", avatar: "KV", avatarColor: "#6B8F71" },
  { id: "u6",  name: "Divya Nair",        email: "divya.nair@student.in",        role: "student",   status: "active",    joinedAt: "2024-09-12", avatar: "DN", avatarColor: "#B0533E" },
  { id: "u7",  name: "Arjun Reddy",       email: "arjun.reddy@student.in",       role: "student",   status: "active",    joinedAt: "2025-01-03", avatar: "AR", avatarColor: "#5B7A99" },
  { id: "u8",  name: "Meera Joshi",       email: "meera.joshi@student.in",       role: "student",   status: "suspended", joinedAt: "2025-02-18", avatar: "MJ", avatarColor: "#8D6FA3" },
  { id: "u9",  name: "Vikram Singh",      email: "vikram.singh@student.in",      role: "student",   status: "active",    joinedAt: "2025-03-07", avatar: "VS", avatarColor: "#8C7B6E" },
  { id: "u10", name: "Ananya Krishnan",   email: "ananya.krishnan@student.in",   role: "moderator", status: "active",    joinedAt: "2025-04-25", avatar: "AK", avatarColor: "#6B8F71" },
  { id: "u11", name: "Raj Malhotra",      email: "raj.malhotra@student.in",      role: "student",   status: "active",    joinedAt: "2025-05-11", avatar: "RM", avatarColor: "#E8A33D" },
  { id: "u12", name: "Pooja Iyer",        email: "pooja.iyer@student.in",        role: "student",   status: "active",    joinedAt: "2025-06-30", avatar: "PI", avatarColor: "#5B7A99" },
  { id: "u13", name: "Nikhil Choudhary",  email: "nikhil.choudhary@student.in",  role: "student",   status: "suspended", joinedAt: "2025-07-22", avatar: "NC", avatarColor: "#B0533E" },
  { id: "u14", name: "Tanya Kapoor",      email: "tanya.kapoor@student.in",      role: "student",   status: "active",    joinedAt: "2026-08-08", avatar: "TK", avatarColor: "#8D6FA3" },
  { id: "u15", name: "Siddharth Bose",    email: "siddharth.bose@student.in",    role: "student",   status: "active",    joinedAt: "2026-09-01", avatar: "SB", avatarColor: "#1C2B3A" },
];

const PAGE_SIZE = 10;

const ROLE_COLORS: Record<Role, string> = {
  admin: "#B0533E",
  moderator: "#E8A33D",
  student: "#5B7A99",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isNewThisMonth(dateStr: string) {
  const now = new Date();
  const joined = new Date(dateStr);
  return (
    joined.getMonth() === now.getMonth() &&
    joined.getFullYear() === now.getFullYear()
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"" | Role>("");
  const [statusFilter, setStatusFilter] = useState<"" | Status>("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const totalActive = users.filter((u) => u.status === "active").length;
  const newThisMonth = users.filter((u) => isNewThisMonth(u.joinedAt)).length;

  const filtered = useMemo(() => {
    let list = users;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }
    if (roleFilter) list = list.filter((u) => u.role === roleFilter);
    if (statusFilter) list = list.filter((u) => u.status === statusFilter);
    return list;
  }, [users, search, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const allSelected =
    paginated.length > 0 && paginated.every((u) => selectedIds.has(u.id));

  function toggleAll() {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        paginated.forEach((u) => next.delete(u.id));
      } else {
        paginated.forEach((u) => next.add(u.id));
      }
      return next;
    });
  }

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function bulkSetStatus(status: Status) {
    setUsers((prev) =>
      prev.map((u) => (selectedIds.has(u.id) ? { ...u, status } : u))
    );
    setSelectedIds(new Set());
  }

  function bulkDelete() {
    setUsers((prev) => prev.filter((u) => !selectedIds.has(u.id)));
    setSelectedIds(new Set());
  }

  function changeRole(id: string, role: Role) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  }

  function toggleStatus(id: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "suspended" : "active" }
          : u
      )
    );
  }

  function deleteUser(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setConfirmDeleteId(null);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1C2B3A]">Users</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {users.length} total &middot; {totalActive} active
          </p>
        </div>
      </div>

      {/* Summary strip */}
      <div className="flex flex-wrap gap-2">
        <div className="bg-white border border-[#E5E0D5] rounded-full px-3 py-1 text-xs text-[#6B7280] flex items-center gap-1.5">
          <UsersIcon size={12} className="text-[#9CA3AF]" />
          Total Users: <span className="font-medium text-[#1C2B3A]">{users.length}</span>
        </div>
        <div className="bg-white border border-[#E5E0D5] rounded-full px-3 py-1 text-xs text-[#6B7280] flex items-center gap-1.5">
          Active: <span className="font-medium text-[#1C2B3A]">{totalActive}</span>
        </div>
        <div className="bg-white border border-[#E5E0D5] rounded-full px-3 py-1 text-xs text-[#6B7280] flex items-center gap-1.5">
          New This Month: <span className="font-medium text-[#1C2B3A]">{newThisMonth}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="border border-[#E5E0D5] rounded-md pl-9 pr-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value as "" | Role); setPage(1); }}
          className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D]"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="student">Student</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as "" | Status); setPage(1); }}
          className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D]"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>

        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-[#6B7280]">{selectedIds.size} selected</span>
            <button
              onClick={() => bulkSetStatus("active")}
              className="text-sm border border-[#6B8F71]/30 bg-[#6B8F71]/5 text-[#6B8F71] px-3 py-1.5 rounded-md hover:bg-[#6B8F71]/10 transition-colors"
            >
              Activate
            </button>
            <button
              onClick={() => bulkSetStatus("suspended")}
              className="text-sm border border-[#E8A33D]/30 bg-[#E8A33D]/5 text-[#E8A33D] px-3 py-1.5 rounded-md hover:bg-[#E8A33D]/10 transition-colors"
            >
              Suspend
            </button>
            <button
              onClick={bulkDelete}
              className="text-sm text-[#B0533E] border border-[#B0533E]/30 bg-[#B0533E]/5 px-3 py-2 rounded-md hover:bg-[#B0533E]/10 transition-colors"
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-md border border-[#E5E0D5] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 flex flex-col items-center gap-3 text-center">
            <UsersIcon size={36} className="text-[#9CA3AF]" />
            <p className="text-sm text-[#6B7280]">No users match your filters.</p>
            <button
              onClick={() => { setSearch(""); setRoleFilter(""); setStatusFilter(""); }}
              className="text-sm text-[#5B7A99] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B7280] border-b border-[#E5E0D5]">
                  <th className="px-4 py-3 font-medium w-10">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="rounded border-[#E5E0D5] accent-[#1C2B3A] cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((u) => {
                  const roleColor = ROLE_COLORS[u.role];
                  const isConfirmingDelete = confirmDeleteId === u.id;

                  return (
                    <tr
                      key={u.id}
                      className="border-b border-[#F0EDE5] last:border-0 hover:bg-[#FAF7F2] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(u.id)}
                          onChange={() => toggleOne(u.id)}
                          className="rounded border-[#E5E0D5] accent-[#1C2B3A] cursor-pointer"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold"
                            style={{
                              backgroundColor: `${u.avatarColor}26`,
                              color: u.avatarColor,
                            }}
                          >
                            {u.avatar}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-[#1C2B3A] truncate">{u.name}</p>
                            <p className="text-xs text-[#9CA3AF] truncate">{u.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                          style={{
                            backgroundColor: `${roleColor}1A`,
                            color: roleColor,
                          }}
                        >
                          {u.role}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {u.status === "active" ? (
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ backgroundColor: "#6B8F711A", color: "#6B8F71" }}
                          >
                            Active
                          </span>
                        ) : (
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ backgroundColor: "#B0533E1A", color: "#B0533E" }}
                          >
                            Suspended
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-[#6B7280]">
                        {formatDate(u.joinedAt)}
                      </td>

                      <td className="px-4 py-3">
                        {isConfirmingDelete ? (
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs text-[#6B7280]">Delete user?</span>
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="text-xs text-[#B0533E] border border-[#B0533E]/30 bg-[#B0533E]/5 px-2 py-1 rounded-md hover:bg-[#B0533E]/10 transition-colors"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="text-xs text-[#6B7280] hover:text-[#1C2B3A] px-2 py-1 transition-colors"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <select
                              value={u.role}
                              onChange={(e) => changeRole(u.id, e.target.value as Role)}
                              className="text-xs px-2 py-1 border border-[#E5E0D5] rounded-md bg-white text-[#374151] focus:outline-none focus:ring-1 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D]"
                            >
                              <option value="admin">Admin</option>
                              <option value="moderator">Moderator</option>
                              <option value="student">Student</option>
                            </select>

                            {u.status === "active" ? (
                              <button
                                onClick={() => toggleStatus(u.id)}
                                title="Suspend user"
                                className="p-1.5 rounded text-[#9CA3AF] hover:text-[#B0533E] transition-colors"
                              >
                                <ShieldOff size={15} />
                              </button>
                            ) : (
                              <button
                                onClick={() => toggleStatus(u.id)}
                                title="Activate user"
                                className="p-1.5 rounded text-[#9CA3AF] hover:text-[#6B8F71] transition-colors"
                              >
                                <ShieldCheck size={15} />
                              </button>
                            )}

                            <button
                              onClick={() => setConfirmDeleteId(u.id)}
                              title="Delete user"
                              className="p-1.5 rounded text-[#9CA3AF] hover:text-[#B0533E] transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-[#F0EDE5] flex items-center justify-between">
              <p className="text-xs text-[#9CA3AF]">
                Showing {Math.min((safePage - 1) * PAGE_SIZE + 1, filtered.length)}–
                {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} users
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="text-sm border border-[#E5E0D5] px-3 py-1.5 rounded-md text-[#374151] hover:bg-[#FAF7F2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <ChevronLeft size={14} />
                  Prev
                </button>
                <span className="text-xs text-[#6B7280] px-1">
                  Page {safePage} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="text-sm border border-[#E5E0D5] px-3 py-1.5 rounded-md text-[#374151] hover:bg-[#FAF7F2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
