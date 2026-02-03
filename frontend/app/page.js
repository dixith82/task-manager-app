import Link from "next/link";
import { CheckCircle, Calendar, Users, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">TaskFlow</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Organize Your Work,
            <span className="text-blue-600"> Achieve More</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            A modern task management solution that helps teams and individuals 
            stay productive, organized, and focused on what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything you need to manage tasks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Task Management
              </h3>
              <p className="text-gray-600">
                Create, organize, and prioritize tasks with ease. Set due dates, 
                add descriptions, and track progress.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Deadline Tracking
              </h3>
              <p className="text-gray-600">
                Never miss a deadline with visual due date tracking and 
                automated reminders.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your data is protected with industry-standard encryption and 
                secure authentication.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-24 bg-blue-50 rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Try Demo Credentials
          </h3>
          <p className="text-gray-600 mb-6">
            Use these credentials to explore the app without signing up:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Demo User 1</h4>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> demo@test.com
                <br />
                <span className="font-medium">Password:</span> Demo@123
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Demo User 2</h4>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> user@test.com
                <br />
                <span className="font-medium">Password:</span> User@123
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/login"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Go to Login →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <CheckCircle className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">TaskFlow</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2024 TaskFlow. Built for the PrimeTrade AI internship assignment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
