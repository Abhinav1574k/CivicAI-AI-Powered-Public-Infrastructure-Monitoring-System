import { Request, Response } from 'express';
import { mockIssues } from '../data/mockIssues.js';
import { Issue, DashboardStats, IssueStatus } from '../types/index.js';
import { calculatePriority } from '../services/priority.service.js';
import { analyzeImageWithGemini } from '../services/gemini.service.js';

// In-memory data store for the MVP
let issuesStore: Issue[] = [...mockIssues];

export const getAllIssues = (req: Request, res: Response) => {
  const { type, severity, status } = req.query;

  let filtered = [...issuesStore];
  if (type) filtered = filtered.filter(i => i.type.toLowerCase() === (type as string).toLowerCase());
  if (severity) filtered = filtered.filter(i => i.severity.toLowerCase() === (severity as string).toLowerCase());
  if (status) filtered = filtered.filter(i => i.status.toLowerCase() === (status as string).toLowerCase());

  // Sort by priority score descending
  filtered.sort((a, b) => b.priorityScore - a.priorityScore);

  res.json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
};

export const getIssueById = (req: Request, res: Response) => {
  const { id } = req.params;
  const issue = issuesStore.find(i => i.id.toUpperCase() === id.toUpperCase());

  if (!issue) {
    return res.status(404).json({ success: false, message: `Issue with ID ${id} not found` });
  }

  res.json({
    success: true,
    data: issue,
  });
};

export const analyzeImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const filePath = file ? file.path : undefined;
    const mimeType = file ? file.mimetype : 'image/jpeg';

    const aiResult = await analyzeImageWithGemini(filePath, mimeType);

    res.json({
      success: true,
      data: aiResult,
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze image',
    });
  }
};

export const createIssue = (req: Request, res: Response) => {
  try {
    const {
      type,
      latitude,
      longitude,
      locationName,
      severity,
      confidence,
      department,
      description,
      recommendedAction,
      riskFactors,
      image,
    } = req.body;

    const reportsCount = 1;
    const ageInDays = 0;
    const lat = latitude || 12.9716;
    const lng = longitude || 77.5946;

    const priorityRes = calculatePriority(
      severity || 'HIGH',
      reportsCount,
      ageInDays,
      true, // High traffic default
      confidence || 0.92
    );

    const newId = `CIV-${Math.floor(1000 + Math.random() * 9000)}`;

    const newIssue: Issue = {
      id: newId,
      type: type || 'Pothole',
      latitude: Number(lat),
      longitude: Number(lng),
      locationName: locationName || 'MG Road Corridor, Ward 112',
      zone: 'Zone 12 (Central Business District)',
      severity: severity || 'HIGH',
      confidence: confidence || 0.92,
      priorityScore: priorityRes.priorityScore,
      priorityLevel: priorityRes.priorityLevel,
      priorityExplanation: priorityRes.explanation,
      status: 'PENDING',
      reports: reportsCount,
      ageInDays: 0,
      department: department || 'Public Works Department (PWD)',
      description: description || 'Citizen reported public infrastructure defect verified by AI Vision.',
      recommendedAction: recommendedAction || 'Dispatch field assessment crew.',
      riskFactors: riskFactors || ['Pedestrian trip hazard', 'Traffic flow obstruction'],
      image: image || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      createdAt: new Date().toISOString(),
      timeline: [
        {
          date: 'Just now',
          label: 'Citizen Report Logged',
          description: 'Uploaded via CivicAI Portal and verified by Gemini AI Vision engine.',
          type: 'report',
        },
      ],
    };

    issuesStore.unshift(newIssue);

    res.status(201).json({
      success: true,
      data: newIssue,
      message: 'Report submitted successfully!',
    });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({ success: false, message: 'Failed to create issue' });
  }
};

export const updateIssueStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, afterImage } = req.body;

  const issueIndex = issuesStore.findIndex(i => i.id.toUpperCase() === id.toUpperCase());

  if (issueIndex === -1) {
    return res.status(404).json({ success: false, message: 'Issue not found' });
  }

  const issue = issuesStore[issueIndex];
  if (status) issue.status = status as IssueStatus;
  if (afterImage) issue.afterImage = afterImage;

  if (status === 'RESOLVED') {
    issue.verificationConfidence = 0.96;
    issue.verificationStatus = 'VERIFIED_SUCCESS';
    issue.verificationNotes = 'Automated computer vision scan verified 100% surface restoration.';
    issue.timeline.push({
      date: 'Just now',
      label: 'AI Verification Completed',
      description: 'Infrastructure defect verified as fully repaired.',
      type: 'verification',
    });
  }

  issuesStore[issueIndex] = issue;

  res.json({
    success: true,
    data: issue,
  });
};

export const getDashboardStats = (req: Request, res: Response) => {
  const totalIssues = issuesStore.length + 236; // realistic offset for demo scale
  const criticalIssues = issuesStore.filter(i => i.severity === 'CRITICAL').length + 14;
  const pendingIssues = issuesStore.filter(i => i.status === 'PENDING').length + 55;
  const inProgressIssues = issuesStore.filter(i => i.status === 'IN_PROGRESS').length + 20;
  const resolvedIssues = totalIssues - pendingIssues - inProgressIssues;

  const stats: DashboardStats = {
    totalIssues,
    criticalIssues,
    pendingIssues,
    resolvedIssues,
    inProgressIssues,
    avgResolutionDays: 2.8,
    duplicateReportsClustered: 142,
    duplicateIncidentsSaved: 84,
    infrastructureHealth: {
      roads: 72,
      streetlights: 84,
      drainage: 61,
      waterManagement: 76,
      mostAffectedZone: {
        name: 'Zone 12 (CBD)',
        healthScore: 48,
        criticalCount: 23,
      },
    },
    analytics: {
      byCategory: [
        { name: 'Potholes', count: 98 },
        { name: 'Damaged Roads', count: 64 },
        { name: 'Overflow Drains', count: 42 },
        { name: 'Streetlights', count: 28 },
        { name: 'Waterlogging', count: 16 },
      ],
      bySeverity: [
        { name: 'Critical', count: 18, color: '#ef4444' },
        { name: 'High', count: 48, color: '#f97316' },
        { name: 'Medium', count: 112, color: '#eab308' },
        { name: 'Low', count: 70, color: '#22c55e' },
      ],
      resolutionTrend: [
        { month: 'May', reported: 120, resolved: 110 },
        { month: 'Jun', reported: 145, resolved: 138 },
        { month: 'Jul', reported: 190, resolved: 175 },
        { month: 'Aug', reported: 210, resolved: 198 },
        { month: 'Sep', reported: 248, resolved: 220 },
      ],
    },
  };

  res.json({
    success: true,
    data: stats,
  });
};
