import React, { useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Users, Building2, Briefcase, TrendingUp, Activity, CheckCircle, Clock, AlertCircle } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const { isLoading, dashboardStats, loadDashboard, activityLogs, loadActivityLogs } = useAdmin();

  useEffect(() => {
    loadDashboard();
    loadActivityLogs();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "placed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "interview":
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const stats = [
    {
      label: "Total Students",
      value: dashboardStats?.total_students || 0,
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Companies",
      value: dashboardStats?.total_companies || 0,
      icon: <Building2 className="w-8 h-8" />,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Total Placements",
      value: dashboardStats?.total_placements || 0,
      icon: <Briefcase className="w-8 h-8" />,
      color: "from-amber-500 to-amber-600",
    },
    {
      label: "Placement Rate",
      value: `${dashboardStats?.placement_rate.toFixed(1) || 0}%`,
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to the IT Placement System Admin Dashboard</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dashboardStats?.status_breakdown && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Placement Status Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(dashboardStats.status_breakdown).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(status)}
                        <span className="capitalize text-gray-700">{status.replace("_", " ")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#003366] h-2 rounded-full"
                            style={{
                              width: `${
                                dashboardStats.total_placements > 0
                                  ? (count / dashboardStats.total_placements) * 100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {activityLogs.length > 0 ? (
                  activityLogs.slice(0, 8).map((log) => (
                    <div key={log.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                      <div className="p-2 bg-[#003366]/10 rounded-lg">
                        <Activity className="w-4 h-4 text-[#003366]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{log.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(log.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;