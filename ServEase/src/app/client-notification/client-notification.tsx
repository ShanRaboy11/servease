"use client";

// Step 1: Add necessary imports
import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/client-notification.module.css";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client"; // Import your Supabase client
import { formatDistanceToNow } from "date-fns";   // Import date-fns for timestamps

// Step 2: Update the Notification interface to match our needs
export interface Notification {
  id: string; // This will be the UUID from the notifications table
  appointmentId: string | number; // This will be the bigint from the appointments table
  title: string;
  subtitle: string;
  body: string;
  type: "new" | "updated"; // The UI type ("new" or "updated")
  icon: string;
  timestamp: string; // This will be an ISO date string from the DB
  isRead: boolean;
}

type DbNotification = {
  id: string;
  is_read: boolean;
  created_at: string;
  type: 'APPOINTMENT_BOOKED' | 'APPOINTMENT_STATUS_UPDATED' | 'APPOINTMENT_CANCELLED';
  metadata: { from?: string; to?: string } | null;
  appointments: {
    id: number;
    time: string;
    services: string;
    profiles: { // THIS IS NOW 'profiles'
      name: string;
    } | null;
  } | null;
};

const formatNotificationForUI = (n: DbNotification): Notification | null => {
  if (!n.appointments || !n.appointments.profiles) return null;

  const { appointments: appointment, metadata } = n;
  const { profiles: provider } = appointment; // Changed from 'providers' to 'profiles'

  const base = {
    id: n.id,
    appointmentId: appointment.id,
    timestamp: n.created_at,
    isRead: n.is_read,
    subtitle: `${provider.name} - ${appointment.services}`,
  };

  switch (n.type) {
    case 'APPOINTMENT_BOOKED':
      return {
        ...base,
        title: "New Appointment Booked",
        body: `Your appointment has been successfully scheduled for ${new Date(appointment.time).toLocaleString()}. Please arrive 15 minutes early for check-in.`,
        type: "new",
        icon: "/calendar_month noti.svg",
      };
    case 'APPOINTMENT_STATUS_UPDATED':
      return {
        ...base,
        title: "Appointment Status Updated",
        body: `Your appointment status has been changed from "${metadata?.from}" to "${metadata?.to}". The appointment is scheduled for ${new Date(appointment.time).toLocaleString()}.`,
        type: "updated",
        icon: "/autorenew.svg",
      };
    default:
      return null;
  }
};

interface NotificationItemProps {
  notification: Notification;
  onToggleRead: (id: string, currentState: boolean) => void;
}

const NotificationItem = ({
  notification,
  onToggleRead,
}: NotificationItemProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // This function now calls the parent with the required info
  const handleToggleRead = useCallback(() => {
    setIsAnimating(true);
    onToggleRead(notification.id, notification.isRead);
    const timer = setTimeout(() => setIsAnimating(false), 150);
    return () => clearTimeout(timer); // Cleanup
  }, [notification.id, notification.isRead, onToggleRead]);

  // handleButtonClick for the ripple effect (no changes needed here)
  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!buttonRef.current) return;
      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const existingRipples = button.getElementsByClassName(styles.ripple);
      Array.from(existingRipples).forEach((r) => r.remove());
      const ripple = document.createElement("span");
      ripple.className = styles.ripple;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      button.appendChild(ripple);
      const timer = setTimeout(() => ripple.remove(), 600);
      return () => clearTimeout(timer);
    },
    []
  );

  return (
    <article
      className={`${styles.notification} ${
        notification.isRead ? styles.read : ""
      }`}
      aria-live={notification.isRead ? "off" : "polite"}
      onClick={handleToggleRead}
      aria-label={notification.isRead ? "Mark as unread" : "Mark as read"}
    >
      <header className={styles.notificationHeader}>
        <div className={styles.notificationIcon}>
          <span>
            <Image src={notification.icon} width={24} height={24} alt="icon" />
          </span>
        </div>
        <div className={styles.notificationContent}>
          <h3 className={styles.notificationTitle}>{notification.title}</h3>
          <p className={styles.notificationSubtitle}>{notification.subtitle}</p>
        </div>
        <div
          className={`${styles.statusBadge} ${
            notification.type === "new"
              ? styles.statusNew
              : styles.statusUpdated
          }`}
          aria-label={`Status: ${notification.type}`}
        >
          <span className={styles.statusDot} aria-hidden="true"></span>
          {notification.type === "new" ? "New" : "Updated"}
        </div>
      </header>
      <div className={styles.notificationBody}>
        <p>{notification.body}</p>
      </div>
      <footer className={styles.notificationMeta}>
        <div className={styles.notificationTime}>
          <Image
            className={styles.cardAvatar}
            width={20}
            height={20}
            alt="Clock icon"
            src="/clock-profile.svg" // Make sure this icon exists
          />
          {/* Step 4: Use date-fns to format the timestamp dynamically */}
          <time dateTime={notification.timestamp}>
            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
          </time>
        </div>
        <div className={styles.notificationActions}>
          <button
            className={`${styles.readIndicator} ${
              notification.isRead ? styles.read : ""
            } ${isAnimating ? styles.animating : ""}`}
            title={notification.isRead ? "Mark as unread" : "Mark as read"}
          />
          <button
            ref={buttonRef}
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={(e) => {
              handleButtonClick(e);
              // You can even make this dynamic if needed:
              router.push(`/client-appointments/${notification.appointmentId}`);
            }}
            aria-label={`View details for ${notification.title}`}
          >
            View Details
          </button>
        </div>
      </footer>
    </article>
  );
};


const NotificationPage = () => {
  // --- THE FIX: Create a stable Supabase client instance for this component ---
  // The initializer function for useState runs only once, on the first render.
  const [supabase] = useState(() => createClient());
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // It's good practice to get this once at the top

  const handleToggleRead = useCallback(async (id: string, currentState: boolean) => {
    // Optimistic UI update for instant feedback
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !currentState } : n))
    );

    // Update the record in Supabase
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: !currentState })
      .eq('id', id);

    if (error) {
      console.error("Failed to update notification status:", error);
      // If the update fails, revert the UI change
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: currentState } : n))
      );
    }
  }, [supabase]); // Now it's correct to include the stable `supabase` instance as a dependency

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // We will use the `!inner` join first, as it's more likely to be correct
        // if your data integrity is good.
        const { data, error } = await supabase
          .from('notifications')
          .select(`
            id, is_read, created_at, type, metadata,
            appointments!inner (
              id, time, services,
              providers!inner ( name )
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching notifications:", error);
          throw error;
        }

        console.log("Raw data from Supabase:", data); // Keep this for debugging

        if (data) {
          const formattedData = data.map(formatNotificationForUI).filter(Boolean) as Notification[];
          setNotifications(formattedData);
        }
      } catch (error) {
        console.error("An error occurred in fetchNotifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [supabase]); // It's also correct to include the stable `supabase` instance here

  if (isLoading) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Notifications</h1>
          <p>Loading your latest activities...</p>
        </header>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Notifications</h1>
        <p>Stay updated with your latest activities</p>
      </header>
      <main className={styles.notificationContainer}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onToggleRead={handleToggleRead}
            />
          ))
        ) : (
          <p>You have no new notifications.</p>
        )}
      </main>
    </div>
  );
};

export default NotificationPage;