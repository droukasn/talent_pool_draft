import { supabase } from './supabase'

export type Candidate = {
  id?: string
  full_name: string
  headline?: string
  country: string
  city?: string
  email?: string
  phone?: string
  languages?: string[]
  skills?: string[]
  roles?: string[]
  seniority?: 'Junior'|'Mid'|'Senior'|'Lead'
  availability?: 'Immediate'|'<1 month'|'1-3 months'|'>3 months'
  work_type?: 'Contract'|'Full-time'|'Part-time'|'Freelance'
  years_experience?: number
  day_rate?: number
  remote?: boolean
  relocation?: boolean
  sdg_expertise?: string[]
  sectors?: string[]
  tools?: string[]
  summary?: string
  last_updated?: string
  cv_url?: string
  notes?: string
}

export async function listCandidates() {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
  if (error) throw error
  return data as Candidate[]
}

export async function upsertCandidate(c: Candidate) {
  const { data, error } = await supabase
    .from('candidates')
    .upsert(c)
    .select()
  if (error) throw error
  return (data?.[0] || null) as Candidate | null
}

export async function deleteCandidate(id: string) {
  const { error } = await supabase
    .from('candidates')
    .delete()
    .eq('id', id)
  if (error) throw error
}
