const VIEW_MODE_KEY = 'dcElectricViewMode';

export function saveViewMode(mode) {
    try {
        localStorage.setItem(VIEW_MODE_KEY, mode);
    } catch (error) {
        console.error('Error saving view mode:', error);
    }
}

export function loadViewMode() {
    try {
        const value = localStorage.getItem(VIEW_MODE_KEY);
        return value || 'grid';
    } catch (error) {
        console.error('Error loading view mode:', error);
        return 'grid';
    }
}