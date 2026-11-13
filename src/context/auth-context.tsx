"use client";

import * as React from "react";
import {
  AuthUser,
  UserRole,
  SeekerUser,
  ProviderUser,
  ProviderActiveJob,
  SavedProperty,
} from "@/types/auth";
import { DEMO_SEEKER, DEMO_PROVIDER } from "@/data/mock-users";

interface AuthContextType {
  user: AuthUser;
  role: UserRole;
  isHydrated: boolean;
  loginAsSeeker: () => void;
  loginAsProvider: () => void;
  logout: () => void;
  toggleProviderOnDuty: () => void;
  updateJobStatus: (jobId: string, status: ProviderActiveJob["status"]) => void;
  acceptBroadcastJob: (broadcastId: string) => void;
  declineBroadcastJob: (broadcastId: string) => void;
  addSavedProperty: (property: Omit<SavedProperty, "id">) => void;
  setServiceRadius: (radiusKm: number) => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "sdr_auth_user_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser>(null);
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Restore on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to storage
  const saveUser = (newUser: AuthUser) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  };

  const loginAsSeeker = () => {
    saveUser(DEMO_SEEKER);
  };

  const loginAsProvider = () => {
    saveUser(DEMO_PROVIDER);
  };

  const logout = () => {
    saveUser(null);
  };

  const toggleProviderOnDuty = () => {
    if (!user || user.role !== "provider") return;
    const updated: ProviderUser = {
      ...user,
      isOnDuty: !user.isOnDuty,
    };
    saveUser(updated);
  };

  const updateJobStatus = (jobId: string, status: ProviderActiveJob["status"]) => {
    if (!user || user.role !== "provider") return;
    const updatedJobs = user.activeJobs.map((j) => (j.id === jobId ? { ...j, status } : j));
    const completedIncrement = status === "Completed" ? 1 : 0;
    const earningsIncrement = status === "Completed" ? 280 : 0;
    const updated: ProviderUser = {
      ...user,
      activeJobs: updatedJobs,
      completedJobsToday: user.completedJobsToday + completedIncrement,
      todayEarnings: user.todayEarnings + earningsIncrement,
    };
    saveUser(updated);
  };

  const acceptBroadcastJob = (broadcastId: string) => {
    if (!user || user.role !== "provider") return;
    const target = user.broadcastQueue.find((b) => b.id === broadcastId);
    if (!target) return;

    const newActiveJob: ProviderActiveJob = {
      id: `job-${Date.now()}`,
      ticketRef: target.ticketRef,
      customerName: "Verified Resident",
      customerPhone: "0468 991 300",
      address: `12 Station Rd, ${target.suburb}`,
      suburb: target.suburb,
      issue: target.issue,
      urgency: target.urgency,
      status: "En Route",
      etaMinutes: 25,
      diagnosticFee: "$149 Urgent Diagnostic (Waived if repair approved)",
      totalQuote: target.payoutEstimate,
    };

    const updated: ProviderUser = {
      ...user,
      broadcastQueue: user.broadcastQueue.filter((b) => b.id !== broadcastId),
      activeJobs: [newActiveJob, ...user.activeJobs],
    };
    saveUser(updated);
  };

  const declineBroadcastJob = (broadcastId: string) => {
    if (!user || user.role !== "provider") return;
    const updated: ProviderUser = {
      ...user,
      broadcastQueue: user.broadcastQueue.filter((b) => b.id !== broadcastId),
    };
    saveUser(updated);
  };

  const addSavedProperty = (prop: Omit<SavedProperty, "id">) => {
    if (!user || user.role !== "seeker") return;
    const newProp: SavedProperty = {
      ...prop,
      id: `prop-${Date.now()}`,
    };
    const updated: SeekerUser = {
      ...user,
      savedProperties: [...user.savedProperties, newProp],
    };
    saveUser(updated);
  };

  const setServiceRadius = (radiusKm: number) => {
    if (!user || user.role !== "provider") return;
    const updated: ProviderUser = {
      ...user,
      serviceRadiusKm: radiusKm,
    };
    saveUser(updated);
  };

  const role: UserRole = user ? user.role : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isHydrated,
        loginAsSeeker,
        loginAsProvider,
        logout,
        toggleProviderOnDuty,
        updateJobStatus,
        acceptBroadcastJob,
        declineBroadcastJob,
        addSavedProperty,
        setServiceRadius,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

