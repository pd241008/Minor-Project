import React from "react";
import { LogEntry } from "../types";

interface ExperimentLogProps {
  logs: LogEntry[];
}

export default function ExperimentLog({ logs }: ExperimentLogProps) {
  return (
    <div className="card h-full overflow-hidden flex flex-col">
      <h2 className="mb-4">Experiment Log</h2>

      {logs.length === 0 ? (
        <p className="text-gray-500 italic">No experiments logged yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-bottom border-gray-700">
                <th className="pb-2 text-gray-400 font-medium">Type</th>
                <th className="pb-2 text-gray-400 font-medium">Metric</th>
                <th className="pb-2 text-gray-400 font-medium">Value</th>
                <th className="pb-2 text-gray-400 font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx} className="border-t border-gray-800/50 hover:bg-white/5 transition-colors">
                  <td className="py-2">{log.type}</td>
                  <td className="py-2">{log.metric}</td>
                  <td className="py-2 text-cyan-400 font-mono">{log.value}</td>
                  <td className="py-2 text-gray-500">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
