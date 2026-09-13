"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, FileText, AlertCircle } from "lucide-react";
import { getCurrentUser } from "@/services/api/base/authHandler";

/**
 * Tells a signed-in customer what is standing between them and the pages that
 * are closed to them.
 *
 * Inventory actions and the enquiry form are gated on customer details being
 * submitted and then approved, but nothing ever said so - the enquiry form
 * bounced people to a blank form and the inventory simply hid its buttons, so
 * both read as faults rather than as a step not yet finished. This is the
 * standing version of that explanation, for pages the user stays on.
 *
 * Renders nothing for the two cases that need no explanation: a visitor who
 * is not signed in, and a customer who is already approved. Admins never see
 * it either, since none of the gates apply to them.
 */

type Stage = "none" | "no-details" | "pending" | "rejected";

function readStage(): Stage {
  const user = getCurrentUser() as
    | {
        role?: string;
        status?: string;
        kycStatus?: string;
        customerData?: Record<string, unknown> | null;
      }
    | null;

  if (!user) return "none";
  if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") return "none";

  const status = String(user.status || "").toUpperCase();
  const kyc = String(user.kycStatus || "").toLowerCase();

  if (status === "APPROVED" || kyc === "approved") return "none";
  if (status === "REJECTED" || kyc === "rejected") return "rejected";

  const hasDetails =
    Boolean(user.customerData) && Object.keys(user.customerData || {}).length > 0;
  if (!hasDetails) return "no-details";

  return "pending";
}

const COPY: Record<
  Exclude<Stage, "none">,
  { icon: typeof Clock; title: string; body: string; action?: { href: string; label: string } }
> = {
  "no-details": {
    icon: FileText,
    title: "One step left on your account",
    body: "Add your customer details and our team will verify them. The diamond inventory and the enquiry form open once that is done.",
    action: { href: "/customer-details", label: "Complete your details" },
  },
  pending: {
    icon: Clock,
    title: "Your details are being verified",
    body: "Thank you — our team is reviewing what you submitted. The diamond inventory and the enquiry form will open as soon as your account is approved.",
  },
  rejected: {
    icon: AlertCircle,
    title: "Your application was not approved",
    body: "Get in touch using the form below and we will help you sort it out.",
  },
};

export default function AccountStatusNotice({ className = "" }: { className?: string }) {
  // Read after mount, never during render: the user is in localStorage, which
  // does not exist on the server, and reading it while rendering would give
  // the server and the client different markup.
  const [stage, setStage] = useState<Stage>("none");

  useEffect(() => {
    setStage(readStage());
  }, []);

  if (stage === "none") return null;

  const { icon: Icon, title, body, action } = COPY[stage];

  return (
    <div className={`w-full px-4 ${className}`.trim()}>
      <div
        role="status"
        className="mx-auto flex max-w-4xl items-start gap-4 rounded-xl border border-[#d4a018]/40 bg-[#101638] px-5 py-4 text-white shadow-lg"
      >
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#d4a018]" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-300">{body}</p>
          {action ? (
            <Link
              href={action.href}
              className="mt-3 inline-flex items-center rounded-lg bg-[#d4a018] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c4a639]"
            >
              {action.label}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
