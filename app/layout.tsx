import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header style={{ padding: 16, borderBottom: "1px solid #eee", marginBottom: 24 }}>
        <h2>Admin: Experts Table</h2>
      </header>
      <main>{children}</main>
    </div>
  );
}
