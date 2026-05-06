"use client";

import React, { useState, useEffect } from "react";
import { X, Clock, Save } from "lucide-react";
import toast from "react-hot-toast";
import { Marcellus, Jost, Maven_Pro } from "next/font/google";

const marcellus = Marcellus({
    variable: "--font-marcellus",
    subsets: ["latin"],
    weight: "400",
});

const jost = Jost({
    variable: "--font-jost",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    display: "swap",
});

const mavenPro = Maven_Pro({
    variable: "--font-maven-pro",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

interface RapnetScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ScheduleData {
    jobKey: string;
    enabled: boolean;
    cronExpression: string;
    timezone: string;
    startTime: string;
    intervalHours: number;
    resolvedFrom: string;
    lastRunAt: string | null;
    lastRunSuccess: boolean | null;
    lastRunMessage: string | null;
    nextRunAt: string | null;
    credentialsConfigured: boolean;
}

const SCHEDULE_API =
    "https://dalila-inventory-service-dev.caratlogic.com/api/diamonds/admin/rapnet-schedule";

const ALLOWED_INTERVAL_HOURS = [1, 2, 3, 4, 6, 8, 12, 24] as const;

const formatDateTime = (iso: string | null, timeZone?: string) => {
    if (!iso) return "—";
    try {
        const date = new Date(iso);
        const formatted = new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: timeZone || undefined,
            timeZoneName: "short",
        }).format(date);
        return formatted;
    } catch {
        return iso;
    }
};

const RapnetScheduleModal: React.FC<RapnetScheduleModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [schedule, setSchedule] = useState<ScheduleData | null>(null);
    const [startTime, setStartTime] = useState<string>("");
    const [intervalHours, setIntervalHours] = useState<number>(24);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchSchedule = async () => {
        setLoading(true);
        try {
            const response = await fetch(SCHEDULE_API, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch RapNet schedule");
            }

            const json = await response.json();
            if (json.success && json.data) {
                setSchedule(json.data);
                setStartTime(json.data.startTime || "");
                setIntervalHours(json.data.intervalHours || 24);
            } else {
                toast.error(json.message || "Failed to load schedule");
            }
        } catch (err) {
            console.error("Error fetching RapNet schedule:", err);
            toast.error(
                err instanceof Error ? err.message : "Failed to load schedule",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchSchedule();
        }
    }, [isOpen]);

    const handleSave = async () => {
        if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(startTime)) {
            toast.error("Start time must be in HH:MM (24-hour) format");
            return;
        }
        if (
            !ALLOWED_INTERVAL_HOURS.includes(
                intervalHours as (typeof ALLOWED_INTERVAL_HOURS)[number],
            )
        ) {
            toast.error(
                `Interval hours must be one of: ${ALLOWED_INTERVAL_HOURS.join(", ")}`,
            );
            return;
        }

        setSaving(true);
        try {
            const response = await fetch(SCHEDULE_API, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    startTime,
                    intervalHours,
                    enabled: true,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update RapNet schedule");
            }

            const json = await response.json();
            if (json.success) {
                toast.success(json.message || "Schedule updated successfully");
                if (json.data) {
                    setSchedule(json.data);
                    setStartTime(json.data.startTime || startTime);
                    setIntervalHours(json.data.intervalHours || intervalHours);
                } else {
                    fetchSchedule();
                }
            } else {
                toast.error(json.message || "Failed to update schedule");
            }
        } catch (err) {
            console.error("Error saving RapNet schedule:", err);
            toast.error(
                err instanceof Error ? err.message : "Failed to save schedule",
            );
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 p-6 flex justify-between items-start flex-shrink-0">
                    <div>
                        <h2
                            className={`${marcellus.variable} text-2xl font-bold text-[#040d39] flex items-center gap-2`}
                        >
                            <Clock className="w-6 h-6" />
                            RapNet Schedule
                        </h2>
                        <p
                            className={`${jost.variable} text-sm text-gray-500 mt-1`}
                        >
                            Configure the RapNet inventory refresh cron schedule
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div
                    className={`flex-1 overflow-y-auto p-6 ${mavenPro.variable}`}
                >
                    {loading && !schedule ? (
                        <div className="flex items-center justify-center h-40">
                            <span className="text-gray-500">
                                Loading schedule…
                            </span>
                        </div>
                    ) : (
                        <>
                            {/* Editable fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Start Time (HH:MM, 24-hour)
                                    </label>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) =>
                                            setStartTime(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#050C3A] focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Interval (hours)
                                    </label>
                                    <select
                                        value={intervalHours}
                                        onChange={(e) =>
                                            setIntervalHours(
                                                Number(e.target.value),
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#050C3A] focus:border-transparent bg-white"
                                    >
                                        {ALLOWED_INTERVAL_HOURS.map((h) => (
                                            <option key={h} value={h}>
                                                {h} {h === 1 ? "hour" : "hours"}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Read-only info */}
                            {schedule && (
                                <div className="bg-[#FAF6EB] border border-gray-200 rounded-md p-4 text-sm space-y-2">
                                    <div className="flex justify-between gap-4">
                                        {/* <span className="font-medium text-gray-700">
                                            Job Key
                                        </span>
                                        <span className="text-gray-900">
                                            {schedule.jobKey}
                                        </span> */}
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="font-medium text-gray-700">
                                            Status
                                        </span>
                                        <span
                                            className={
                                                schedule.enabled
                                                    ? "text-green-700"
                                                    : "text-red-700"
                                            }
                                        >
                                            {schedule.enabled
                                                ? "Enabled"
                                                : "Disabled"}
                                        </span>
                                    </div>
                                    {/* <div className="flex justify-between gap-4">
                                        <span className="font-medium text-gray-700">
                                            Cron Expression
                                        </span>
                                        <span className="text-gray-900 font-mono">
                                            {schedule.cronExpression}
                                        </span>
                                    </div> */}
                                    <div className="flex justify-between gap-4">
                                        <span className="font-medium text-gray-700">
                                            Timezone
                                        </span>
                                        <span className="text-gray-900">
                                            {schedule.timezone}
                                        </span>
                                    </div>
                                    {/* <div className="flex justify-between gap-4">
                                        <span className="font-medium text-gray-700">
                                            Resolved From
                                        </span>
                                        <span className="text-gray-900">
                                            {schedule.resolvedFrom}
                                        </span>
                                    </div> */}
                                    <div className="flex justify-between gap-4">
                                        <span className="font-medium text-gray-700">
                                            Credentials
                                        </span>
                                        <span
                                            className={
                                                schedule.credentialsConfigured
                                                    ? "text-green-700"
                                                    : "text-red-700"
                                            }
                                        >
                                            {schedule.credentialsConfigured
                                                ? "Configured"
                                                : "Not configured"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="font-medium text-gray-700">
                                            Last Run
                                        </span>
                                        <span className="text-gray-900">
                                            {formatDateTime(schedule.lastRunAt, schedule.timezone)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="font-medium text-gray-700">
                                            Last Run Result
                                        </span>
                                        <span
                                            className={
                                                schedule.lastRunSuccess
                                                    ? "text-green-700"
                                                    : schedule.lastRunSuccess ===
                                                        false
                                                      ? "text-red-700"
                                                      : "text-gray-900"
                                            }
                                        >
                                            {schedule.lastRunSuccess === null
                                                ? "—"
                                                : schedule.lastRunSuccess
                                                  ? "Success"
                                                  : "Failed"}
                                        </span>
                                    </div>
                                    {schedule.lastRunMessage && (
                                        <div className="flex justify-between gap-4">
                                            <span className="font-medium text-gray-700">
                                                Last Run Message
                                            </span>
                                            <span className="text-gray-900 text-right">
                                                {schedule.lastRunMessage}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between gap-4">
                                        <span className="font-medium text-gray-700">
                                            Next Run
                                        </span>
                                        <span className="text-gray-900">
                                            {formatDateTime(schedule.nextRunAt, schedule.timezone)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4 flex justify-end gap-2 flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || loading}
                        className="bg-[#050C3A] text-white px-6 py-2 rounded-md hover:bg-[#070d4a] transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? "Saving…" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RapnetScheduleModal;
