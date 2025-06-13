import { AlertTriangle, Clock } from "lucide-react";
import React, { FC } from "react";

interface HealthAlert {
  id: string;
  petName: string;
  message: string;
  priority: "high" | "medium" | "low";
  daysLeft: number;
}

interface HealthAlertProps {
  healthAlerts: HealthAlert[];
}

const HealthAlerts: FC<HealthAlertProps> = ({ healthAlerts }) => {
  return (
    <div className="mt-8 mb-8">
      {/* Health Alerts */}
      {healthAlerts.length > 0 && (
        <div className="">
          <h2 className="text-xl font-semibold  mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-amber-500" size={20} />
            Alertas de Salud
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border-l-4 ${
                  alert.priority === "high"
                    ? "border-red-400 bg-red-50 dark:bg-red-900/20"
                    : alert.priority === "medium"
                    ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20"
                    : "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                } shadow-sm`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{alert.petName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {alert.message}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        alert.priority === "high"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                          : alert.priority === "medium"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                      }`}
                    >
                      <Clock size={10} className="mr-1" />
                      {alert.daysLeft} días
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthAlerts;
