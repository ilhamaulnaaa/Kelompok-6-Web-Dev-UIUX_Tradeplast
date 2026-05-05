"use client";

import { useEffect, useState } from "react";
// 1. Rename 'User' icon biar nggak bentrok sama type 'User' dari Supabase
import { User as UserIcon, Lock, Bell } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
// 2. Import type User dari Supabase
import { User } from "@supabase/supabase-js";

export default function SettingsPage() {
  const supabase = createClient();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  // 3. Kasih tau TypeScript kalau state ini bisa berisi User atau null
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUser(data?.user ?? null);
    };

    getUser();
  }, [supabase.auth]); // Tambahin dependency biar aman

  return (
    <div className="max-w-6xl mx-auto font-poppins p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* SIDEBAR */}
        <div className="space-y-2">
          <button
            onClick={() => {
              setActiveTab("profile");
              setIsEditing(false);
            }}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${activeTab === "profile" ? "bg-emerald-50 text-emerald-600 font-semibold" : "hover:bg-slate-100"}`}
          >
            <UserIcon size={16} /> Profile
          </button>

          <button
            onClick={() => {
              setActiveTab("security");
              setIsEditing(false);
            }}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${activeTab === "security" ? "bg-emerald-50 text-emerald-600 font-semibold" : "hover:bg-slate-100"}`}
          >
            <Lock size={16} /> Security
          </button>

          <button
            onClick={() => {
              setActiveTab("notifications");
              setIsEditing(false);
            }}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${activeTab === "notifications" ? "bg-emerald-50 text-emerald-600 font-semibold" : "hover:bg-slate-100"}`}
          >
            <Bell size={16} /> Notifications
          </button>
        </div>

        {/* CONTENT */}
        <div className="md:col-span-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          {/* ================= PROFILE ================= */}
          {activeTab === "profile" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Profile</h2>

                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="text-sm px-4 py-2 border rounded-lg hover:bg-slate-50">
                    Edit
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="font-medium">{currentUser?.email || "-"}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Full Name</p>
                    <p className="text-slate-400">-</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 4. Tambahin label/aria-label buat accessibility */}
                  <input aria-label="Full Name" className="w-full p-3 border rounded-xl text-sm" placeholder="Full Name" />

                  <div className="flex gap-2">
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-50">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">Save</button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ================= SECURITY ================= */}
          {activeTab === "security" && (
            <>
              <h2 className="text-xl font-bold mb-6">Security</h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Password</p>
                    <p className="text-xs text-slate-500">Update your password</p>
                  </div>
                  <button className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-50">Change</button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Email Verification</p>
                    <p className="text-xs text-slate-500">Verify your email address</p>
                  </div>
                  <button className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-50">Verify</button>
                </div>
              </div>
            </>
          )}

          {/* ================= NOTIFICATIONS ================= */}
          {activeTab === "notifications" && (
            <>
              <h2 className="text-xl font-bold mb-6">Notifications</h2>

              <div className="space-y-6">
                {/* 5. Bungkus checkbox pake label dan id biar nggak error linter */}
                <div className="flex justify-between items-center">
                  <label htmlFor="email-notif">
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-xs text-slate-500">Receive updates via email</p>
                  </label>
                  <input type="checkbox" id="email-notif" className="w-4 h-4" />
                </div>

                <div className="flex justify-between items-center">
                  <label htmlFor="push-notif">
                    <p className="text-sm font-medium">Push Notifications</p>
                    <p className="text-xs text-slate-500">Receive push notifications</p>
                  </label>
                  <input type="checkbox" id="push-notif" className="w-4 h-4" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
