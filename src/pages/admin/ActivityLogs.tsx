import React, { useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Activity, User, Briefcase, Users, Building2, TrendingUp } from "lucide-react";

const ActivityLogsPage: React.FC = () => {
  const { isLoading, activityLogs, loadActivityLogs } = useAdmin();

  useEffect(() => {
    loadActivityLogs();
  }, []);

  const getActivityIcon = (activityType: string) => {
    switch (activityType.toLowerCase()) {
      case "student_register":
      case "student_update":
      case "student_delete":
        return <User className="w-5 h-5" />;
      case "company_register":
      case "company_update":
      case "company_delete":
        return <Building2 className="w-5 h-5" />;
      case "matching":
        return <TrendingUp className="w-5 h-5" />;
      case "profile_forward":
      case "placement_status_change":
        return <Briefcase className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getActivityColor = (activityType: string) => {
    switch (activityType.toLowerCase()) {
      case "student_register":
      case "company_register":
        return "from-blue-500 to-blue-600";
      case "student_update":
      case "company_update":
        return "from-amber-500 to-amber-600";
      case "student_delete":
      case "company_delete":
        return "from-red-500 to-red-600";
      case "matching":
        return "from-purple-500 to-purple-600";
      case "profile_forward":
      case "placement_status_change":
        return "from-emerald-500 to-emerald-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const formatActivityType = (activityType: string) => {
    return activityType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-600 mt-1">View all system activities and actions</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {activityLogs.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {activityLogs.map((log) => (
                <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getActivityColor(log.activity_type)} text-white flex-shrink-0`}>
                      {getActivityIcon(log.activity_type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatActivityType(log.activity_type)}
                          </p>
                          <p className="text-gray-600 mt-1">{log.description}</p>
                        </div>
                        <p className="text-sm text-gray-500 flex-shrink-0">
                          {new Date(log.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {log.admin_id && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <User className="w-3 h-3" />
                            Admin Action
                          </span>
                        )}
                        {log.student_id && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            <Users className="w-3 h-3" />
                            Student ID: {log.student_id}
                          </span>
                        )}
                        {log.company_id && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <Building2 className="w-3 h-3" />
                            Company ID: {log.company_id}
                          </span>
                        )}
                        {log.placement_id && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            <Briefcase className="w-3 h-3" />
                            Placement ID: {log.placement_id}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No activity logs found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityLogsPage;