"use client";

import { CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";

export default function TaskStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const inProgressTasks = tasks.filter((task) => task.status === "in_progress").length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      name: "Total Tasks",
      value: totalTasks,
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-600",
      change: "+12%",
    },
    {
      name: "Completed",
      value: completedTasks,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
      change: `+${completionRate}%`,
    },
    {
      name: "Pending",
      value: pendingTasks,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
      change: `${pendingTasks > 0 ? "+" : ""}${pendingTasks}`,
    },
    {
      name: "In Progress",
      value: inProgressTasks,
      icon: AlertCircle,
      color: "bg-purple-100 text-purple-600",
      change: `${inProgressTasks > 0 ? "+" : ""}${inProgressTasks}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">
                <span className="text-green-600 font-medium">{stat.change}</span> from last week
              </p>
            </div>
            <div className={`p-3 rounded-full ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
