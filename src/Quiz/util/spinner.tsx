import * as React from 'react';

export default (props: { style: React.CSSProperties }) => {
  // Keyframes in index.html
  return (
    <div style={{ ...props, position: 'relative' }}>
      <div className="spinner"></div>
    </div>
  );
}