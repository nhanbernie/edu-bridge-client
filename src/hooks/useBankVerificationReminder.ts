import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

const BANK_VERIFY_REMINDER_KEY = "bank_verify_reminder";
const REMINDER_INTERVAL = 6 * 60 * 60 * 1000;

interface BankVerifyReminderData {
  lastShown: number;
  dismissed: boolean;
}

export const useBankVerificationReminder = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?.tutor) return;

    const isBankVerified = user.tutor.isBankAccountVerified;

    if (isBankVerified) {
      localStorage.removeItem(BANK_VERIFY_REMINDER_KEY);
      setShouldShow(false);
      return;
    }

    const stored = localStorage.getItem(BANK_VERIFY_REMINDER_KEY);
    const now = Date.now();

    if (!stored) {
      setShouldShow(true);
      return;
    }

    try {
      const data: BankVerifyReminderData = JSON.parse(stored);
      const timeSinceLastShown = now - data.lastShown;

      if (timeSinceLastShown >= REMINDER_INTERVAL) {
        setShouldShow(true);
      }
    } catch {
      setShouldShow(true);
    }
  }, [user]);

  const markAsShown = () => {
    const data: BankVerifyReminderData = {
      lastShown: Date.now(),
      dismissed: false,
    };
    localStorage.setItem(BANK_VERIFY_REMINDER_KEY, JSON.stringify(data));
    setShouldShow(false);
  };

  return { shouldShow, markAsShown };
};
