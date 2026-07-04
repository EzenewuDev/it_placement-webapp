import React, { useEffect, useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Briefcase, Search, Send, CheckCircle, Clock, AlertCircle, Filter } from "lucide-react";

const PlacementsPage: React.FC = () => {
  const { isLoading, placements, loadPlacements, forwardProfile, bulkForward, students, companies, loadStudents, loadCompanies, findMatches, autoMatch } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedPlacements, setSelectedPlacements] = useState<number[]>([]);
  const [showMatchingModal, setShowMatchingModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [requiredSkills, setRequiredSkills] = useState("");
  const [location, setLocation] = useState("");
  const [matchingResults, setMatchingResults] = useState<any[]>([]);
  const [minScore, setMinScore] = useState(50);

  useEffect(() => {
    loadPlacements();
    loadStudents();
    loadCompanies();
  }, []);

  const filteredPlacements = placements.filter((placement) => {
    const matchesSearch = searchTerm === "" || placement.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || placement.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStudentName = (studentId: number) => {
    const student = students.find((s) => s.id === studentId);
    return student ? `${student.user.first_name} ${student.user.last_name}` : "Unknown";
  };

  const getCompanyName = (companyId: number) => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.company_name : "Unknown";
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "placed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "interview":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "forwarded":
        return <Send className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; bg: string }> = {
      applied: { color: "text-gray-800", bg: "bg-gray-100" },
      shortlisted: { color: "text-blue-800", bg: "bg-blue-100" },
      forwarded: { color: "text-blue-800", bg: "bg-blue-100" },
      interview: { color: "text-amber-800", bg: "bg-amber-100" },
      selected: { color: "text-emerald-800", bg: "bg-emerald-100" },
      rejected: { color: "text-red-800", bg: "bg-red-100" },
      placed: { color: "text-green-800", bg: "bg-green-100" },
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig.applied;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
      </span>
    );
  };

  const handleForward = (placementId: number) => {
    if (window.confirm("Are you sure you want to forward this profile?")) {
      forwardProfile(placementId);
    }
  };

  const handleBulkForward = () => {
    if (selectedPlacements.length === 0) return;
    if (window.confirm(`Are you sure you want to forward ${selectedPlacements.length} profiles?`)) {
      bulkForward(selectedPlacements);
      setSelectedPlacements([]);
    }
  };

  const handleFindMatches = async () => {
    if (!selectedCompany) return;
    try {
      const results = await findMatches(selectedCompany, requiredSkills, location);
      setMatchingResults(results);
    } catch (error) {
      console.error("Failed to find matches:", error);
    }
  };

  const handleAutoMatch = async () => {
    if (!selectedCompany) return;
    try {
      await autoMatch(selectedCompany, minScore);
      setShowMatchingModal(false);
    } catch (error) {
      console.error("Failed to auto-match:", error);
    }
  };

  const toggleSelection = (placementId: number) => {
    setSelectedPlacements((prev) =>
      prev.includes(placementId)
        ? prev.filter((id) => id !== placementId)
        : [...prev, placementId]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Placements</h1>
          <p className="text-gray-600 mt-1">Manage student placements and track progress</p>
        </div>
        <div className="flex gap-3">
          {selectedPlacements.length > 0 && (
            <button
              onClick={handleBulkForward}
              className="px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#003366]/90 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Forward Selected ({selectedPlacements.length})
            </button>
          )}
          <button
            onClick={() => setShowMatchingModal(true)}
            className="px-4 py-2 bg-[#DAA520] text-white rounded-lg hover:bg-[#DAA520]/90 flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            Find Matches
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search placements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900"
            >
              <option value="">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="forwarded">Forwarded</option>
              <option value="interview">Interview</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
              <option value="placed">Placed</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPlacements.length === filteredPlacements.length && filteredPlacements.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPlacements(filteredPlacements.map((p) => p.id));
                        } else {
                          setSelectedPlacements([]);
                        }
                      }}
                      className="rounded border-gray-300 text-[#003366] focus:ring-[#003366]"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlacements.map((placement) => (
                  <tr key={placement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPlacements.includes(placement.id)}
                        onChange={() => toggleSelection(placement.id)}
                        className="rounded border-gray-300 text-[#003366] focus:ring-[#003366]"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getStudentName(placement.student_id)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getCompanyName(placement.company_id)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {placement.match_score != null ? (
                        <div className="flex items-center gap-2">
                          {(() => {
                            const matchScore = placement.match_score ?? 0;
                            return (
                              <>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                matchScore >= 70
                                  ? "bg-green-500"
                                  : matchScore >= 50
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${matchScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {matchScore.toFixed(1)}%
                          </span>
                              </>
                            );
                          })()}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(placement.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(placement.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {placement.status !== "forwarded" &&
                        placement.status !== "placed" &&
                        placement.status !== "rejected" && (
                          <button
                            onClick={() => handleForward(placement.id)}
                            className="text-[#003366] hover:text-[#003366]/80 flex items-center gap-1 ml-auto"
                          >
                            <Send className="w-4 h-4" />
                            Forward
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPlacements.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No placements found</p>
            </div>
          )}
        </div>
      )}

      {showMatchingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Find Matching Students</h2>
                <button
                  onClick={() => setShowMatchingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Company
                  </label>
                  <select
                    value={selectedCompany || ""}
                    onChange={(e) => setSelectedCompany(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900"
                  >
                    <option value="">Choose a company</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.company_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                    placeholder="e.g., Python, JavaScript, React"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Lagos"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleFindMatches}
                    disabled={!selectedCompany}
                    className="flex-1 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#003366]/90 disabled:opacity-50"
                  >
                    Find Matches
                  </button>
                  <button
                    onClick={() => setShowMatchingModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>

                {matchingResults.length > 0 && (
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Found {matchingResults.length} matches
                      </h3>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Min Score:</label>
                        <input
                          type="number"
                          value={minScore}
                          onChange={(e) => setMinScore(Number(e.target.value))}
                          min="0"
                          max="100"
                          className="w-20 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-gray-900"
                        />
                        <button
                          onClick={handleAutoMatch}
                          className="px-4 py-2 bg-[#DAA520] text-white rounded-lg hover:bg-[#DAA520]/90"
                        >
                          Auto-Match
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {matchingResults.map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {result.student.user.first_name[0]}
                                {result.student.user.last_name[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {result.student.user.first_name} {result.student.user.last_name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {result.student.department}
                              </p>
                              {result.matched_skills.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {result.matched_skills.slice(0, 3).map((skill: string, i: number) => (
                                    <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                                      {skill}
                                    </span>
                                  ))}
                                  {result.matched_skills.length > 3 && (
                                    <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                                      +{result.matched_skills.length - 3} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#003366]">
                              {result.match_score.toFixed(1)}%
                            </div>
                            <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className={`h-2 rounded-full ${
                                  result.match_score >= 70
                                    ? "bg-green-500"
                                    : result.match_score >= 50
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${result.match_score}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementsPage;