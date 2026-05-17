import React, { type FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';

interface WidgetProps {
  title?: string;
  subtitle?: string;
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
}

const collaborators = [
  { id: '1', name: 'SHARON Mazor', role: 'Design Lead', avatar: 'AR', status: 'active' },
  { id: '2', name: 'Sam Chen', role: 'Frontend Dev', avatar: 'SC', status: 'active' },
  { id: '3', name: 'Jordan Lee', role: 'Product Manager', avatar: 'JL', status: 'idle' },
  { id: '4', name: 'Morgan Blake', role: 'Backend Dev', avatar: 'MB', status: 'active' },
];

const CollaboratorsDryRun: FC<WidgetProps> = ({
  title = 'Collaborators Dry Run',
  subtitle = 'Active team members',
  bgColor = '#0d0f1a',
  accentColor = '#6c63ff',
  textColor = '#e8e6ff',
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const styles: Record<string, React.CSSProperties> = {
    wrapper: {
      backgroundColor: bgColor,
      padding: '28px 24px',
      fontFamily: '"DM Sans", "Segoe UI", system-ui, sans-serif',
      minHeight: '320px',
      borderRadius: '12px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    },
    header: {
      marginBottom: '20px',
    },
    title: {
      fontSize: '20px',
      fontWeight: 700,
      color: textColor,
      margin: 0,
      letterSpacing: '-0.3px',
    },
    subtitle: {
      fontSize: '12px',
      color: accentColor,
      marginTop: '4px',
      textTransform: 'uppercase' as const,
      letterSpacing: '1.2px',
      fontWeight: 600,
    },
    list: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '10px',
    },
    card: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '12px 14px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background 0.18s ease',
    },
    cardActive: {
      background: `${accentColor}18`,
      border: `1px solid ${accentColor}40`,
    },
    cardDefault: {
      background: `${textColor}08`,
      border: '1px solid transparent',
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '13px',
      fontWeight: 700,
      flexShrink: 0,
      background: accentColor,
      color: '#fff',
    },
    info: {
      flex: 1,
      overflow: 'hidden',
    },
    name: {
      fontSize: '14px',
      fontWeight: 600,
      color: textColor,
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    role: {
      fontSize: '12px',
      color: `${textColor}80`,
      marginTop: '2px',
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      flexShrink: 0,
    },
  };

  if (!mounted) return null;

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div style={styles.title}>{title}</div>
        <div style={styles.subtitle}>{subtitle}</div>
      </div>
      <div style={styles.list}>
        {collaborators.map((c, i) => (
          <div
            key={c.id}
            style={{
              ...styles.card,
              ...(activeIndex === i ? styles.cardActive : styles.cardDefault),
            }}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          >
            <div style={styles.avatar}>{c.avatar}</div>
            <div style={styles.info}>
              <div style={styles.name}>{c.name}</div>
              <div style={styles.role}>{c.role}</div>
            </div>
            <div
              style={{
                ...styles.statusDot,
                backgroundColor: c.status === 'active' ? '#4ade80' : '#fbbf24',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const customElement = reactToWebComponent(CollaboratorsDryRun, React, ReactDOM, {
  props: {
    title: 'string',
    subtitle: 'string',
    bgColor: 'string',
    accentColor: 'string',
    textColor: 'string',
  },
});

export default customElement;
