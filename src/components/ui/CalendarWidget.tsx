import { motion } from 'framer-motion';
import { useState } from 'react';

interface CalendarWidgetProps {
    events?: Array<{
        id: number;
        name: string;
        date: string;
    }>;
    className?: string;
}

const CalendarWidget = ({ events = [], className = '' }: CalendarWidgetProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const today = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    // Generate calendar days
    const calendarDays = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
        calendarDays.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(prev.getMonth() - 1);
            } else {
                newDate.setMonth(prev.getMonth() + 1);
            }
            return newDate;
        });
    };

    const hasEvent = (day: number) => {
        const targetDate = new Date(currentYear, currentMonth, day);
        return events.some(event => {
            const eventDate = new Date(event.date);
            return eventDate.getFullYear() === targetDate.getFullYear() &&
                   eventDate.getMonth() === targetDate.getMonth() &&
                   eventDate.getDate() === targetDate.getDate();
        });
    };

    const isToday = (day: number) => {
        return today.getDate() === day && 
               today.getMonth() === currentMonth && 
               today.getFullYear() === currentYear;
    };

    // Rich animations for all devices
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.02,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const dayVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    // Create mobile-safe variants
    const mobileVariants = undefined;

    // Check if device is mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    return (
        <motion.div
            className={`calendar-widget ${className}`}
            variants={isMobile ? mobileVariants : containerVariants}
            initial={isMobile ? undefined : "hidden"}
            animate={isMobile ? undefined : "visible"}
            style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: isMobile ? 'none' : 'blur(10px)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: isMobile ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                maxWidth: '320px',
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
                transform: isMobile ? 'translateZ(0)' : undefined,
                backfaceVisibility: isMobile ? 'hidden' : undefined
            }}
        >
            {/* Floating background effect - disabled on mobile */}
            {!isMobile && (
                <div
                    style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: 'conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.05), transparent)',
                        animation: 'rotate 20s linear infinite',
                        opacity: 0.6,
                        pointerEvents: 'none'
                    }}
                />
            )}

            {/* Calendar Header */}
            <motion.div
                variants={isMobile ? mobileVariants : headerVariants}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <motion.button
                    onClick={() => navigateMonth('prev')}
                    whileHover={isMobile ? undefined : { scale: 1.1, rotate: -5 }}
                    whileTap={isMobile ? undefined : { scale: 0.9 }}
                    style={{
                        background: 'var(--gradient-primary)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                        transition: 'all 0.2s ease'
                    }}
                >
                    ←
                </motion.button>
                
                <motion.h3
                    key={`${currentMonth}-${currentYear}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        margin: 0,
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        backgroundSize: '200% 200%',
                        animation: 'gradientShift 4s ease infinite',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {monthNames[currentMonth]} {currentYear}
                </motion.h3>
                
                <motion.button
                    onClick={() => navigateMonth('next')}
                    whileHover={isMobile ? undefined : { scale: 1.1, rotate: 5 }}
                    whileTap={isMobile ? undefined : { scale: 0.9 }}
                    style={{
                        background: 'var(--gradient-primary)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                        transition: 'all 0.2s ease'
                    }}
                >
                    →
                </motion.button>
            </motion.div>

            {/* Day Names */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
                marginBottom: '8px',
                position: 'relative',
                zIndex: 1
            }}>
                {dayNames.map((day, index) => (
                    <motion.div
                        key={day}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        style={{
                            textAlign: 'center',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: 'var(--text-secondary)',
                            padding: '6px 4px',
                            background: 'rgba(59, 130, 246, 0.05)',
                            borderRadius: '6px',
                            border: '1px solid rgba(59, 130, 246, 0.1)'
                        }}
                    >
                        {day}
                    </motion.div>
                ))}
            </div>

            {/* Calendar Days */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
                position: 'relative',
                zIndex: 1
            }}>
                {calendarDays.map((day, index) => (
                    <motion.div
                        key={index}
                        variants={isMobile ? mobileVariants : dayVariants}
                        whileHover={day && !isMobile ? { 
                            scale: 1.15, 
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
                        } : undefined}
                        whileTap={day && !isMobile ? { scale: 0.95 } : undefined}
                        onClick={() => day && setSelectedDate(new Date(currentYear, currentMonth, day))}
                        style={{
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.9rem',
                            borderRadius: '8px',
                            cursor: day ? 'pointer' : 'default',
                            position: 'relative',
                            background: day && isToday(day) 
                                ? 'var(--gradient-primary)' 
                                : day && selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth
                                ? 'rgba(59, 130, 246, 0.2)'
                                : day 
                                ? 'rgba(255, 255, 255, 0.8)'
                                : 'transparent',
                            color: day && isToday(day) 
                                ? 'white' 
                                : day 
                                ? 'var(--text-primary)' 
                                : 'transparent',
                            fontWeight: day && isToday(day) ? '700' : '500',
                            transition: 'all 0.2s ease',
                            border: day ? '1px solid rgba(59, 130, 246, 0.1)' : 'none',
                            boxShadow: day && isToday(day) 
                                ? '0 4px 12px rgba(59, 130, 246, 0.4)' 
                                : day 
                                ? '0 2px 4px rgba(0, 0, 0, 0.05)'
                                : 'none'
                        }}
                    >
                        {day}
                        {day && hasEvent(day) && (
                            <motion.div
                                initial={{ scale: 0, rotate: 0 }}
                                animate={{ scale: 1, rotate: 360 }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: index * 0.02,
                                    type: "spring",
                                    stiffness: 200
                                }}
                                style={{
                                    position: 'absolute',
                                    bottom: '3px',
                                    right: '3px',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: 'var(--gradient-warning)',
                                    boxShadow: '0 0 8px rgba(251, 191, 36, 0.6), 0 0 4px rgba(251, 191, 36, 0.8)',
                                    animation: 'pulse 2s ease-in-out infinite'
                                }}
                            />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Event Count */}
            {events.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.4, type: "spring" }}
                    style={{
                        marginTop: '1.25rem',
                        padding: '1rem',
                        background: 'var(--gradient-success)',
                        borderRadius: '12px',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        color: 'white',
                        fontWeight: '600',
                        boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                            animation: 'shimmer 2s infinite'
                        }}
                    />
                    <span style={{ position: 'relative', zIndex: 1 }}>
                        📅 {events.length} event{events.length !== 1 ? 's' : ''} this month
                    </span>
                </motion.div>
            )}
        </motion.div>
    );
};

export default CalendarWidget;