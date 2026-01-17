import React from "react";

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      border: '2px solid orange',
      background: '#FFF8E1',
      borderRadius: 8,
      padding: 16,
      margin: '16px 0',
      fontWeight: 500,
    }}>
      {children}
    </div>
  );
}
