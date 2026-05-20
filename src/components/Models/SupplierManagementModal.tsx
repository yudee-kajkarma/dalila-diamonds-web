"use client";

import React, { useState, useEffect } from "react";
import { X, Settings } from "lucide-react";
import Toggle from "../ui/Toggle";
import ConfigureAPIModal from "./ConfigureAPIModal";
import toast from "react-hot-toast";
import { Marcellus, Jost, Maven_Pro } from "next/font/google";
import { API_URL } from "@/services/api/base/apiClient";

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

interface SupplierManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  suppliers?: Array<{ name: string; totalDiamonds: number; isVisible: boolean }>;
  onSupplierUpdate?: () => void;
}

interface SupplierData {
  name: string;
  totalDiamonds: number;
  isVisible: boolean;
  loading: boolean;
}

const SUPPLIERS = ["Dharam Web Api", "Finestar", "rapnet"];

const SupplierManagementModal: React.FC<SupplierManagementModalProps> = ({
  isOpen,
  onClose,
  onSupplierUpdate,
}) => {
  const [suppliersData, setSuppliersData] = useState<SupplierData[]>(
    SUPPLIERS.map(name => ({ name, totalDiamonds: 0, isVisible: false, loading: false }))
  );
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<string>("");

  // Fetch total diamonds count for a specific supplier
  const fetchTotalDiamonds = async (supplierName: string) => {
    setSuppliersData(prev => prev.map(s => 
      s.name === supplierName ? { ...s, loading: true } : s
    ));
    
    try {
      const url = new URL(`${API_URL}/api/diamonds/admin/search`);
      url.searchParams.set("source", supplierName);
      url.searchParams.set("page", "1");
      url.searchParams.set("limit", "10");
      
      const response = await fetch(url.toString(), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch diamond count for ${supplierName}`);
      }

      const data = await response.json();
      const totalRecords = data.pagination?.totalRecords || 0;
      
      setSuppliersData(prev => prev.map(s => 
        s.name === supplierName 
          ? { ...s, totalDiamonds: totalRecords, loading: false }
          : s
      ));
    } catch (error) {
      console.error(`Error fetching diamond count for ${supplierName}:`, error);
      toast.error(`Failed to fetch diamond count for ${supplierName}`);
      setSuppliersData(prev => prev.map(s => 
        s.name === supplierName ? { ...s, loading: false } : s
      ));
    }
  };

  // Fetch visibility status for a specific supplier
  const fetchVisibilityStatus = async (supplierName: string) => {
    try {
      const storedValue = localStorage.getItem(`supplier_${supplierName}_visible`);
      if (storedValue !== null) {
        const isVisible = storedValue === 'true';
        setSuppliersData(prev => prev.map(s => 
          s.name === supplierName ? { ...s, isVisible } : s
        ));
      }
    } catch (error) {
      console.error(`Error fetching visibility for ${supplierName}:`, error);
    }
  };

  // Load data when modal opens
  useEffect(() => {
    if (isOpen) {
      SUPPLIERS.forEach(supplierName => {
        fetchTotalDiamonds(supplierName);
        fetchVisibilityStatus(supplierName);
      });
    }
  }, [isOpen]);

  const handleOpenConfigModal = (supplierName: string) => {
    setSelectedSupplier(supplierName);
    setShowConfigModal(true);
  };

  const handleConfigSaved = () => {
    // Refresh data after config is saved
    if (selectedSupplier) {
      fetchTotalDiamonds(selectedSupplier);
    }
    if (onSupplierUpdate) {
      onSupplierUpdate();
    }
  };

  const handleToggleVisibility = async (supplierName: string) => {
    const supplier = suppliersData.find(s => s.name === supplierName);
    if (!supplier) return;
    
    try {
      const newStatus = !supplier.isVisible;
      const response = await fetch(
        `${API_URL}/api/users/admin/supplier-settings/${encodeURIComponent(supplierName)}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isVisible: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update supplier status");
      }

      const data = await response.json();
      toast.success(
        data.message || `Supplier ${newStatus ? "activated" : "deactivated"} successfully`
      );

      // Update local state
      setSuppliersData(prev => prev.map(s => 
        s.name === supplierName ? { ...s, isVisible: newStatus } : s
      ));
      
      // Store in localStorage
      localStorage.setItem(`supplier_${supplierName}_visible`, String(newStatus));

      // Dispatch custom event to notify inventory page
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('supplierStatusChanged', { 
          detail: { isVisible: newStatus, supplierName } 
        }));
      }

      // Notify parent to refresh
      if (onSupplierUpdate) {
        onSupplierUpdate();
      }
    } catch (err) {
      console.error("Error toggling supplier visibility:", err);
      toast.error(err instanceof Error ? err.message : "Failed to update supplier status");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div>
            <h2 className={`${marcellus.variable} text-2xl font-bold text-[#040d39]`}>
              My Suppliers
            </h2>
            <p className={`${jost.variable} text-sm text-gray-500 mt-1`}>
              Manage your supplier configurations and inventory
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <table className={`w-full ${mavenPro.variable}`}>
            <thead>
              <tr className="bg-[#050c3a] text-white">
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-center py-3 px-4 font-semibold">
                  Total Diamonds
                </th>
                <th className="text-center py-3 px-4 font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {suppliersData.map((supplier) => (
                <tr key={supplier.name} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">{supplier.name}</td>
                  <td className="py-3 px-4 text-center text-gray-800">
                    {supplier.loading ? (
                      <span className="text-gray-400">Loading...</span>
                    ) : (
                      supplier.totalDiamonds.toLocaleString()
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-3">
                      <Toggle
                        checked={supplier.isVisible}
                        onChange={() => handleToggleVisibility(supplier.name)}
                        disabled={supplier.loading}
                      />
                      <button
                        onClick={() => handleOpenConfigModal(supplier.name)}
                        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                        title="Configure API"
                      >
                        <Settings className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configure API Modal */}
      {selectedSupplier && (
        <ConfigureAPIModal
          isOpen={showConfigModal}
          onClose={() => {
            setShowConfigModal(false);
            setSelectedSupplier("");
          }}
          supplierName={selectedSupplier}
          onConfigSaved={handleConfigSaved}
        />
      )}
    </div>
  );
};

export default SupplierManagementModal;
