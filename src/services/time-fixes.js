export function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

export function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };
    return new Date(date).toLocaleTimeString(undefined, options);
}

export function formatTimeToLocalTime(dateString) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  }

export function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0 && remainingMinutes === 0) {
        return `${hours} h`;
    } else if (hours === 0) {
        return `${minutes} mins`;
    } else {
        return `${hours} h ${remainingMinutes} mins`;
    }
}