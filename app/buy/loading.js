export default function Loading() {
  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "56px 32px 80px",
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      color: "var(--text-muted)",
      fontFamily: "var(--font-display)",
      letterSpacing: "0.08em"
    }}>
      <div style={{
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        border: "3px solid rgba(255, 255, 255, 0.1)",
        borderTopColor: "var(--accent)",
        animation: "spin 0.8s linear infinite"
      }} />
      <p style={{ fontSize: "16px", textTransform: "uppercase" }}>Loading verified accounts...</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
