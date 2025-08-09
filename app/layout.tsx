export const metadata = { title: 'TalentPilot — Talent Pool' } as const
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'ui-sans-serif, system-ui', background: '#f8fafc' }}>{children}</body>
    </html>
  )
}
