export async function fetchServices() {
    try {
        const response = await fetch('data/services.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.services || [];
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}