"use client";

import { useState } from "react";
import { User2, ChevronUp, ChevronDown } from "lucide-react";
import LogoutButton from "@/src/ui/LogoutButton";
import { useTheme } from "@/components/public/auth/ThemeProvider";

interface UserSession {
  name?: string;
  email: string;
  category: "owner" | "vet" | "clinic" | "store";
  planName?: string;
}

interface UserProfilePanelProps {
  session: UserSession;
  expanded: boolean;
}

const UserProfilePanel: React.FC<UserProfilePanelProps> = ({
  session,
  expanded,
}) => {
  const { isDarkMode } = useTheme();
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  return (
    <div
      className={`p-2 border-t ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="relative">
        <button
          onClick={() => expanded && setShowProfileInfo(!showProfileInfo)}
          className={`flex items-center justify-between w-full p-2 rounded-lg transition ${
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`p-2 rounded-full ${expanded ? "mr-3" : "mx-auto"} ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <User2
                size={18}
                className={isDarkMode ? "text-blue-400" : "text-blue-600"}
              />
            </div>
            {expanded && (
              <div className="text-left overflow-hidden">
                <p
                  className={`text-sm font-medium truncate ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {session.name || session.email}
                </p>
                <p
                  className={`text-xs truncate ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {session.category}
                </p>
              </div>
            )}
          </div>
          {expanded && (
            <div>
              {showProfileInfo ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          )}
        </button>

        {expanded && showProfileInfo && (
          <div
            className={`mt-2 p-3 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {session.planName && (
              <div className="mb-3">
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Plan actual
                </p>
                <p
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {session.planName}
                </p>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <LogoutButton />
            </div>
          </div>
        )}

        {!expanded && (
          <div className="mt-2 flex flex-col items-center gap-2">
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePanel;
