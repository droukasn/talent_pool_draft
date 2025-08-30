'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Expert } from '../../lib/Expert';

export default function AdminExpertsPage() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  useEffect(() => {
    supabase
      .from('experts')
      .select('website_title, tags_sectors')
      .then(({ data }) => {
        setExperts(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  if (selectedExpert) {
    return (
      <div style={{ padding: 40 }}>
        <button onClick={() => setSelectedExpert(null)} style={{ marginBottom: 24 }}>
          ← Back
        </button>
        <div style={{
          border: "1px solid #eee",
          borderRadius: 8,
          padding: 20,
          margin: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          width: 320,
          background: "#fff"
        }}>
          <h3>{selectedExpert.website_title}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {selectedExpert.tags_sectors.map((tag, idx) => (
              <span key={idx} style={{
                background: "#eee",
                borderRadius: 12,
                padding: "4px 10px",
                fontSize: 12,
                color: "#333"
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 16,
      padding: "32px",
      justifyContent: "flex-start"
    }}>
      {experts.map(expert => (
        <div
          key={expert.website_title}
          onClick={() => setSelectedExpert(expert)}
          style={{
            border: "1px solid #eee",
            borderRadius: 8,
            padding: 20,
            margin: 8,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            width: 260,
            background: "#fff"
          }}
        >
          <h3 style={{ marginBottom: 12 }}>{expert.website_title}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {expert.tags_sectors.map((tag, idx) => (
              <span key={idx} style={{
                background: "#eee",
                borderRadius: 12,
                padding: "4px 10px",
                fontSize: 12,
                color: "#333"
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
      {experts.length === 0 && (
        <div>No experts found.</div>
      )}
    </div>
  );
}
