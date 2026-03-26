"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import SpecRequestsList from "@/components/SpecRequests/SpecRequestsList";

export default function SpecRequestsPage() {
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={["ADMIN", "SUPER_ADMIN"]}
            redirectTo="/"
        >
            <div className="min-h-screen bg-gray-50 py-8 pt-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                    <SpecRequestsList />
                </div>
            </div>
        </ProtectedRoute>
    );
}
