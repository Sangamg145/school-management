"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type UserRole } from "@/context/AuthContext";
import Link from "next/link";

const roleOptions = [
  { id: "super_admin", label: "Super Admin", icon: "👑", color: "from-red-500 to-red-600" },
  { id: "admin", label: "Admin", icon: "🔐", color: "from-blue-500 to-blue-600" },
  { id: "teacher", label: "Teacher", icon: "👨‍🏫", color: "from-green-500 to-green-600" },
  { id: "student", label: "Student", icon: "👨‍🎓", color: "from-purple-500 to-purple-600" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      login(email, password, selectedRole);
      router.push("/dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-blue-800 to-purple-900 flex flex-col">
      {/* Header */}
      <div className="py-6 px-6 border-b border-blue-700">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-blue-200 transition">
          <span className="text-2xl">🎓</span>
          <span className="text-xl font-bold">School Management System</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Info */}
            <div className="text-white hidden lg:block">
              <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
              <p className="text-lg text-blue-100 mb-8">
                Login to your school management dashboard. Choose your role and access your personalized experience.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <p className="font-semibold">Easy Access</p>
                    <p className="text-sm text-blue-200">Quick login for all roles</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">🔒</span>
                  <div>
                    <p className="font-semibold">Secure</p>
                    <p className="text-sm text-blue-200">Your data is protected</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="font-semibold">Fast</p>
                    <p className="text-sm text-blue-200">Instant dashboard access</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-white rounded-lg shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
              <p className="text-gray-600 mb-8">Select your role and login to continue</p>

              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {/* Role Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Select Your Role</label>
                <div className="grid grid-cols-2 gap-3">
                  {roleOptions.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id as UserRole)}
                      className={`p-4 rounded-lg border-2 transition text-center ${
                        selectedRole === role.id
                          ? `bg-linear-to-br ${role.color} text-white border-transparent shadow-lg`
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-3xl mb-2">{role.icon}</div>
                      <p className="font-semibold text-sm">{role.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition"
                >
                  Login
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-semibold text-blue-900 mb-2">📝 Demo Credentials</p>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li><strong>Email:</strong> demo@school.com</li>
                  <li><strong>Password:</strong> password123</li>
                </ul>
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-blue-600 font-semibold hover:text-blue-700">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-blue-700 text-center text-blue-100 text-sm">
        <p>&copy; 2024 School Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
