import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Mobile detection hook
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                         window.innerWidth <= 768 ||
                         ('ontouchstart' in window) ||
                         (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
            setIsMobile(mobile);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    return isMobile;
};

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
    const isMobile = useIsMobile();

    const today = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get first day of the month and number of days
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
        const dateStr = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
        return events.some(event => event.date.startsWith(dateStr));
    };

    const isToday = (day: number) => {
        return today.getDate() === day && 
               today.getMonth() === currentMonth && 
               today.getFullYear() === currentYear;
    };

    // Simplified animations for mobile
    const containerVariants = {
        hidden: { opacity: 0, scale: isMobile ? 1 : 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: isMobile ? 0.2 : 0.5,
                staggerChildren: isMobile ? 0.01 : 0.02
            }
        }
    };

    const dayVariants = {
        hidden: { opacity: 0, y: isMobile ? 0 : 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: isMobile ? 0.1 : 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className={`calendar-widget ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
                background: isMobile ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: isMobile ? 'blur(5px)' : 'blur(10px)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: isMobile ? '0 4px 16px rgba(0, 0, 0, 0.08)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
                maxWidth: '320px',
                margin: '0 auto',
                willChange: isMobile ? 'auto' : 'transform'
            }}
        >
            {/* Calendar Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
            }}>
                <motion.button
                    onClick={() => navigateMonth('prev')}
                    whileHover={isMobile ? {} : { scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        background: 'var(--calendar-blue)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        boxShadow: isMobile ? '0 1px 4px rgba(59, 130, 246, 0.2)' : '0 2px 8px rgba(59, 130, 246, 0.3)',
                        willChange: 'transform'
                    }}
                >
                    ←
                </motion.button>
                
                <motion.h3
                    key={`${currentMonth}-${currentYear}`}
                    initial={{ opacity: 0, y: isMobile ? 0 : -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: isMobile ? 0.1 : 0.3 }}
                    style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        background: isMobile ? 'var(--calendar-blue)' : 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: isMobile ? 'var(--calendar-blue)' : 'transparent',
                        backgroundClip: 'text',
                        color: isMobile ? 'var(--calendar-blue)' : 'transparent'
                    }}
                >
                    {monthNames[currentMonth]} {currentYear}
                </motion.h3>
                
                <motion.button
                    onClick={() => navigateMonth('next')}
                    whileHover={isMobile ? {} : { scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        background: 'var(--calendar-blue)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        boxShadow: isMobile ? '0 1px 4px rgba(59, 130, 246, 0.2)' : '0 2px 8px rgba(59, 130, 246, 0.3)',
                        willChange: 'transform'
                    }}
                >
                    →
                </motion.button>
            </div>

            {/* Day Names */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
                marginBottom: '8px'
            }}>
                {dayNames.map(day => (
                    <div
                        key={day}
                        style={{
                            textAlign: 'center',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: 'var(--text-secondary)',
                            padding: '4px'
                        }}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Days */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px'
            }}>
                {calendarDays.map((day, index) => (
                    <motion.div
                        key={index}
                        variants={dayVariants}
                        whileHover={day && !isMobile ? { scale: 1.1 } : undefined}
                        whileTap={day ? { scale: 0.95 } : undefined}
                        onClick={() => day && setSelectedDate(new Date(currentYear, currentMonth, day))}
                        style={{
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem',
                            borderRadius: '8px',
                            cursor: day ? 'pointer' : 'default',
                            position: 'relative',
                            background: day && isToday(day) 
                                ? 'var(--calendar-blue)' 
                                : day && selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth
                                ? 'rgba(59, 130, 246, 0.2)'
                                : 'transparent',
                            color: day && isToday(day) 
                                ? 'white' 
                                : day 
                                ? 'var(--text-primary)' 
                                : 'transparent',
                            fontWeight: day && isToday(day) ? '600' : '400',
                            transition: isMobile ? 'background-color 0.1s ease' : 'all 0.2s ease',
                            willChange: 'transform'
                        }}
                    >
                        {day}
                        {day && hasEvent(day) && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: isMobile ? 0.1 : 0.3 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '2px',
                                    right: '2px',
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: 'var(--calendar-yellow)',
                                    boxShadow: isMobile ? 'none' : '0 0 4px rgba(251, 191, 36, 0.5)'
                                }}
                            />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Event Count */}
            {events.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: isMobile ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isMobile ? 0.1 : 0.5, duration: isMobile ? 0.2 : 0.3 }}
                    style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        background: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}
                >
                    📅 {events.length} event{events.length !== 1 ? 's' : ''} this month
                </motion.div>
            )}
        </motion.div>
    );
};

export default CalendarWidget;