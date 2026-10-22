export function formatPriority(priority: 'low' | 'medium' | 'high'): string {
    switch (priority) {
        case 'high':
            return 'Hög'
        case 'medium':
            return 'Medel'
        case 'low':
            return 'Låg'
        default:
            return priority;
    }
}