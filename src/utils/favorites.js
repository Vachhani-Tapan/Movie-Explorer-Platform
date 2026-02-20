const STORAGE_KEY = 'movieExplorerFavorites';

export const getFavorites = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

export const addFavorite = (id) => {
    const favs = getFavorites();
    if (!favs.includes(id)) {
        const updated = [...favs, id];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('favoritesUpdated'));
        return updated;
    }
    return favs;
};

export const removeFavorite = (id) => {
    const favs = getFavorites();
    const updated = favs.filter((fid) => fid !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('favoritesUpdated'));
    return updated;
};

export const isFavorite = (id) => {
    return getFavorites().includes(id);
};
