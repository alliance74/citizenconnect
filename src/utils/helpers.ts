
export function generateComplaintId(): string {
  return 'CMP' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export function getDepartmentForCategory(category: string): string {
  const departmentMap: Record<string, string> = {
    'Infrastructure': 'Public Works',
    'Sanitation': 'Sanitation Department',
    'Public Transport': 'Transportation Department',
    'Utilities': 'Utility Services',
    'Other': 'General Administration'
  };
  return departmentMap[category] || 'General Administration';
}

export function getExpectedResolutionDate(date: string): string {
  const resolutionDate = new Date(date);
  resolutionDate.setDate(resolutionDate.getDate() + 7);
  return resolutionDate.toISOString().split('T')[0];
}

export function getStatusColor(status: string): string {
  const statusLower = status.toLowerCase();
  
  if (statusLower === 'new') return 'bg-status-new';
  if (statusLower === 'in progress') return 'bg-status-progress';
  if (statusLower === 'resolved') return 'bg-status-resolved';
  if (statusLower === 'urgent') return 'bg-status-urgent';
  if (statusLower === 'under review') return 'bg-status-review';
  if (statusLower === 'pending') return 'bg-status-pending';
  
  return 'bg-status-new'; // Default color
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function getPriorityWeight(priority: string): number {
  const weights: Record<string, number> = { 'High': 3, 'Medium': 2, 'Low': 1 };
  return weights[priority] || 0;
}
