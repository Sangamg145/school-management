"use client";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-4">School Management</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Comprehensive school management system designed to streamline educational operations and enhance student learning outcomes.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-blue-500 transition text-xl">f</a>
              <a href="#" className="text-gray-500 hover:text-blue-500 transition text-xl">𝕏</a>
              <a href="#" className="text-gray-500 hover:text-blue-500 transition text-xl">in</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/dashboard" className="text-gray-600 hover:text-blue-500 transition">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/dashboard/students" className="text-gray-600 hover:text-blue-500 transition">
                  Students
                </a>
              </li>
              <li>
                <a href="/dashboard/teachers" className="text-gray-600 hover:text-blue-500 transition">
                  Teachers
                </a>
              </li>
              <li>
                <a href="/dashboard/reports" className="text-gray-600 hover:text-blue-500 transition">
                  Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span>📧</span>
                <a href="mailto:info@school.com" className="text-gray-600 hover:text-blue-500 transition">
                  info@school.com
                </a>
              </li>
              <li className="flex gap-2">
                <span>📞</span>
                <a href="tel:+919876543210" className="text-gray-600 hover:text-blue-500 transition">
                  +91-9876543210
                </a>
              </li>
              <li className="flex gap-2">
                <span>📍</span>
                <span className="text-gray-600">123 Education Street,<br />School City, State 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            <p>&copy; 2024 School Management System. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-blue-500 transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500 transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500 transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
