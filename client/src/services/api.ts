import { Issue, AIAnalysisResult, DashboardStats } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function fetchIssues(params?: { type?: string; severity?: string; status?: string }): Promise<Issue[]> {
  try {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const res = await fetch(`${API_BASE}/issues${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch issues');
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching issues:', error);
    throw error;
  }
}

export async function fetchIssueById(id: string): Promise<Issue> {
  try {
    const res = await fetch(`${API_BASE}/issues/${id}`);
    if (!res.ok) throw new Error(`Issue ${id} not found`);
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(`Error fetching issue ${id}:`, error);
    throw error;
  }
}

export async function analyzeImageFile(file?: File): Promise<AIAnalysisResult> {
  try {
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    const res = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('AI Analysis failed');
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.warn('API error, returning local AI fallback mode response:', error);
    return {
      issueType: 'Pothole',
      confidence: 0.94,
      severity: 'HIGH',
      description: 'Asphalt surface disintegration with sub-base depression (~80cm width) on primary traffic corridor.',
      department: 'Public Works Department (PWD)',
      recommendedAction: 'Immediate hot-mix asphalt patching and structural compaction.',
      riskFactors: [
        'High collision risk for two-wheelers',
        'Accelerated moisture penetration and sub-base weakening'
      ],
      riskScore: 87,
      isDemoMode: true,
    };
  }
}

export async function submitIssueReport(issueData: Partial<Issue>): Promise<Issue> {
  try {
    const res = await fetch(`${API_BASE}/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(issueData),
    });
    if (!res.ok) throw new Error('Failed to submit report');
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error submitting report:', error);
    throw error;
  }
}

export async function updateIssueStatus(id: string, status: string, afterImage?: string): Promise<Issue> {
  try {
    const res = await fetch(`${API_BASE}/issues/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, afterImage }),
    });
    if (!res.ok) throw new Error('Failed to update status');
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const res = await fetch(`${API_BASE}/dashboard/stats`);
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}
