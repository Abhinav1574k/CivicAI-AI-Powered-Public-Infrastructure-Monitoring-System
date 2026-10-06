import { IssueSeverity, PriorityLevel } from '../types/index.js';

export interface PriorityCalculationResult {
  priorityScore: number;
  priorityLevel: PriorityLevel;
  explanation: string;
}

export function calculatePriority(
  severity: IssueSeverity,
  reportsCount: number,
  ageInDays: number,
  isHighTrafficLocation: boolean = false,
  confidence: number = 0.9
): PriorityCalculationResult {
  // 1. Severity Weight (40%)
  let severityScore = 15;
  if (severity === 'CRITICAL') severityScore = 40;
  else if (severity === 'HIGH') severityScore = 30;
  else if (severity === 'MEDIUM') severityScore = 20;

  // 2. Report Count Weight (20%) - Max 20 points
  const reportsScore = Math.min(reportsCount * 1.5, 20);

  // 3. Issue Age Weight (15%) - Max 15 points
  const ageScore = Math.min(ageInDays * 0.65, 15);

  // 4. Location Importance Weight (15%)
  const locationScore = isHighTrafficLocation ? 15 : 8;

  // 5. Confidence Weight (10%)
  const confidenceScore = Math.round(confidence * 10);

  const totalScore = Math.min(
    100,
    Math.round(severityScore + reportsScore + ageScore + locationScore + confidenceScore)
  );

  let priorityLevel: PriorityLevel = 'LOW';
  if (totalScore >= 90) priorityLevel = 'CRITICAL';
  else if (totalScore >= 75) priorityLevel = 'HIGH';
  else if (totalScore >= 50) priorityLevel = 'MEDIUM';

  // Generate clear human-readable explanation
  const factors: string[] = [];
  if (severity === 'CRITICAL' || severity === 'HIGH') {
    factors.push(`${severity.toLowerCase()} severity defect detected by AI (${Math.round(confidence * 100)}% confidence)`);
  }
  if (reportsCount >= 5) {
    factors.push(`repeated citizen reports (${reportsCount} complaints logged)`);
  }
  if (isHighTrafficLocation) {
    factors.push('high arterial road traffic exposure');
  }
  if (ageInDays >= 10) {
    factors.push(`unresolved for ${ageInDays} days`);
  }

  const explanation = factors.length > 0
    ? `Escalated to ${priorityLevel} priority due to ${factors.join(', ')}.`
    : `Prioritized as ${priorityLevel} based on standard municipal queue criteria.`;

  return {
    priorityScore: totalScore,
    priorityLevel,
    explanation,
  };
}
