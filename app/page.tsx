'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { listCandidates, upsertCandidate, deleteCandidate, type Candidate } from '../lib/candidates'

function toInitials(name: string){ return name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase() }

export default function Page(){
  const [items, setItems] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState<Candidate|null>(null)

  useEffect(()=>{ (async()=>{ setLoading(true); const data = await listCandidates(); setItems(data); setLoading(false) })() },[])

  const filtered = useMemo(()=>{
    const n = q.trim().toLowerCase()
    return items.filter(c=>{
      const t = [c.full_name, c.headline, c.country, c.city, ...(c.skills||[]), ...(c.roles||[])].filter(Boolean).join(' ').toLowerCase()
      return !n || t.includes(n)
    })
  },[items,q])

  async function remove(id?: string){ if(!id) return; await deleteCandidate(id); setItems(await listCandidates()); setSelected(null) }
  async function save(c: Candidate){ await upsertCandidate({ ...c, last_updated: new Date().toISOString() }); setItems(await listCandidates()) }

  return (
    <div style={{minHeight:'100vh'}}>
      <header style={{position:'sticky',top:0,background:'white',borderBottom:'1px solid #e2e8f0',zIndex:10}}>
        <div style={{maxWidth:1120,margin:'0 auto',padding:'12px 16px',display:'flex',gap:12,alignItems:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{height:36,width:36,borderRadius:16,background:'#0284c7',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>TP</div>
            <div style={{fontWeight:600,fontSize:18}}>TalentPilot</div>
            <span style={{marginLeft:8,fontSize:12,background:'#f1f5f9',padding:'2px 8px',borderRadius:999}}>MVP</span>
          </div>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name, skill, role, country…" style={{marginLeft:'auto',border:'1px solid #e2e8f0',borderRadius:8,padding:'8px 10px',width:360}}/>
        </div>
      </header>
      <main style={{maxWidth:1120,margin:'0 auto',padding:'16px'}}>
        {loading ? <div style={{textAlign:'center',color:'#64748b',padding:'60px 0'}}>Loading…</div> :
        filtered.length===0 ? <div style={{background:'white',border:'1px solid #e2e8f0',borderRadius:16,padding:40,textAlign:'center'}}>No candidates. Seed your DB or import.</div> :
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:16}}>
          {filtered.map(c => (
            <div key={c.id} style={{background:'white',border:'1px solid #e2e8f0',borderRadius:16,padding:16}}>
              <div style={{display:'flex',gap:12}}>
                <div style={{height:40,width:40,borderRadius:16,background:'#e0f2fe',color:'#075985',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>{toInitials(c.full_name)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:600,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.full_name}</div>
                  <div style={{fontSize:13,color:'#475569',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.headline}</div>
                </div>
              </div>
              <div style={{marginTop:8,display:'flex',flexWrap:'wrap',gap:6}}>
                {(c.skills||[]).slice(0,5).map(s=> <span key={s} style={{fontSize:12,background:'#f1f5f9',padding:'2px 8px',borderRadius:999}}>{s}</span>)}
              </div>
              <div style={{marginTop:10,fontSize:12,color:'#475569',display:'flex',justifyContent:'space-between'}}>
                <div>{[c.city,c.country].filter(Boolean).join(', ')}</div>
                <div>{c.seniority} · {c.availability}{c.day_rate?` · €${c.day_rate}/day`:''}</div>
              </div>
              <div style={{marginTop:12,display:'flex',gap:8}}>
                <button onClick={()=>setSelected(c)} style={{border:'1px solid #e2e8f0',padding:'6px 10px',borderRadius:8}}>Open</button>
                <button onClick={()=>remove(c.id)} style={{border:'1px solid #ef4444',color:'#ef4444',padding:'6px 10px',borderRadius:8,background:'white'}}>Delete</button>
              </div>
            </div>
          ))}
        </div>}
      </main>
      <footer style={{borderTop:'1px solid #e2e8f0',background:'white'}}>
        <div style={{maxWidth:1120,margin:'0 auto',padding:'16px',fontSize:12,color:'#64748b',display:'flex',justifyContent:'space-between'}}>
          <div>© {new Date().getFullYear()} TalentPilot — Demo Talent Pool</div>
          <div>Inspired by Employment Hero & Cross Border Talents</div>
        </div>
      </footer>
    </div>
  )
}
