"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user: authUser } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(authUser);
    setIsHydrated(true);
  }, [authUser]);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-blue-800 to-purple-900">
      {/* Navigation */}
      <nav className="py-6 px-6 border-b border-blue-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-blue-200 transition">
            <span className="text-3xl">🎓</span>
            <span className="text-2xl font-bold">School Management</span>
          </Link>
          <div className="flex gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="px-6 py-2 text-white border border-white rounded-lg hover:bg-white hover:text-blue-900 transition font-medium">
                  Login
                </Link>
                <Link href="/signup" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            School Management <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">System</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Comprehensive solution for managing students, teachers, attendance, exams, and more
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg">
              Get Started
            </Link>
            <Link href="#features" className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 transition font-semibold text-lg">
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-20">
          {[
            { icon: "👨‍🎓", title: "Student Management", desc: "Manage student information, admissions, and records" },
            { icon: "👨‍🏫", title: "Teacher Portal", desc: "Manage faculty, qualifications, and schedules" },
            { icon: "✓", title: "Attendance", desc: "Track daily attendance and generate reports" },
            { icon: "📝", title: "Exams", desc: "Schedule exams and manage question papers" },
            { icon: "💰", title: "Fee Management", desc: "Track fee collections and payments" },
            { icon: "📊", title: "Reports", desc: "Generate detailed reports and analytics" },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-blue-100">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Roles Section */}
        <div className="my-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">User Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "👑", role: "Super Admin", color: "from-red-500 to-red-600", features: ["Full Control", "User Management", "System Settings"] },
              { icon: "🔐", role: "Admin", color: "from-blue-500 to-blue-600", features: ["Dashboard Access", "Reports", "Settings"] },
              { icon: "👨‍🏫", role: "Teacher", color: "from-green-500 to-green-600", features: ["Class Records", "Attendance", "Student Info"] },
              { icon: "👨‍🎓", role: "Student", color: "from-purple-500 to-purple-600", features: ["View Grades", "Attendance", "Profile"] },
            ].map((role, idx) => (
              <div key={idx} className={`bg-linear-to-br ${role.color} rounded-lg p-8 text-white shadow-lg hover:shadow-xl transition`}>
                <div className="text-5xl mb-4">{role.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{role.role}</h3>
                <ul className="space-y-2">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex gap-2">
                      <span>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-20 border-t border-blue-700">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of schools using our management system</p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-lg">
              Sign Up Now
            </Link>
            <Link href="/login" className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 transition font-semibold text-lg">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-blue-700 text-center text-blue-100">
        <p>&copy; 2024 School Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
