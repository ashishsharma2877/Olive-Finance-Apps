import React from 'react';

interface TabNavProps {
  tabs: string[];
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const TabNav: React.FC<TabNavProps> = ({ tabs, selectedTab, onTabSelect }) => {
  return (
    <nav style={{ display: 'flex', borderBottom: '1px solid #ccc', marginBottom: 24 }}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabSelect(tab)}
          style={{
            padding: '12px 24px',
            border: 'none',
            borderBottom: selectedTab === tab ? '3px solid #222' : '3px solid transparent',
            background: 'none',
            fontWeight: selectedTab === tab ? 'bold' : 'normal',
            cursor: 'pointer',
            outline: 'none',
            fontSize: 16
          }}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default TabNav; 