export type IssueType = 'Pothole' | 'Damaged Road' | 'Broken Streetlight' | 'Overflowing Drain' | 'Waterlogging' | 'Other';

export type IssueSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type IssueStatus = 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'VERIFICATION_PENDING';

export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface AIAnalysisResult {
  issueType: IssueType;
  confidence: number;
  severity: IssueSeverity;
  description: string;
  department: string;
  recommendedAction: string;
  riskFactors: string[];
  riskScore: number;
  isDemoMode?: boolean;
}

export interface IssueTimelineEvent {
  date: string;
  label: string;
  description: string;
  type?: 'report' | 'ai' | 'assignment' | 'repair' | 'verification';
}

export interface Issue {
  id: string;
  type: IssueType;
  latitude: number;
  longitude: number;
  locationName: string;
  severity: IssueSeverity;
  confidence: number;
  priorityScore: number;
  priorityLevel: PriorityLevel;
  priorityExplanation: string;
  status: IssueStatus;
  reports: number;
  ageInDays: number;
  department: string;
  description: string;
  recommendedAction: string;
  riskFactors: string[];
  image: string;
  afterImage?: string;
  verificationConfidence?: number;
  verificationStatus?: string;
  verificationNotes?: string;
  createdAt: string;
  timeline: IssueTimelineEvent[];
  zone: string;
}

export interface DashboardStats {
  totalIssues: number;
  criticalIssues: number;
  pendingIssues: number;
  resolvedIssues: number;
  inProgressIssues: number;
  avgResolutionDays: number;
  duplicateReportsClustered: number;
  duplicateIncidentsSaved: number;
  infrastructureHealth: {
    roads: number;
    streetlights: number;
    drainage: number;
    waterManagement: number;
    mostAffectedZone: {
      name: string;
      healthScore: number;
      criticalCount: number;
    };
  };
  analytics: {
    byCategory: { name: string; count: number }[];
    bySeverity: { name: string; count: number; color: string }[];
    resolutionTrend: { month: string; resolved: number; reported: number }[];
  };
}
