// Basic LocalStorage Wrapper for persistence without backend
const STORAGE_KEY_DOCS = 'codeorbit_docs';
const STORAGE_KEY_HISTORY = 'codeorbit_history';

export const documentService = {
    // Documents
    getAllDocuments: () => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(STORAGE_KEY_DOCS);
        return data ? JSON.parse(data) : [];
    },

    saveDocument: (doc) => {
        const docs = documentService.getAllDocuments();
        const newDoc = {
            id: doc.id || Date.now().toString(),
            title: doc.title || 'Untitled Document',
            content: doc.content || '',
            type: doc.type || 'grammar', // grammar, rewrite, plagiarism
            createdAt: doc.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const existingIndex = docs.findIndex(d => d.id === newDoc.id);
        if (existingIndex >= 0) {
            docs[existingIndex] = newDoc;
        } else {
            docs.unshift(newDoc);
        }

        localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(docs));
        return newDoc;
    },

    deleteDocument: (id) => {
        const docs = documentService.getAllDocuments();
        const filtered = docs.filter(d => d.id !== id);
        localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(filtered));
        return filtered;
    },

    // History
    addToHistory: (activity) => {
        if (typeof window === 'undefined') return;
        const history = documentService.getHistory();
        const newEntry = {
            id: Date.now().toString(),
            action: activity.action, // e.g. "Checked Grammar", "Rewrote Text"
            preview: activity.preview || '',
            timestamp: new Date().toISOString(),
            tool: activity.tool // grammar, rewrite, plagiarism
        };
        history.unshift(newEntry);
        // Limit history to last 50 items
        const limited = history.slice(0, 50);
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(limited));
    },

    getHistory: () => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(STORAGE_KEY_HISTORY);
        return data ? JSON.parse(data) : [];
    },

    clearHistory: () => {
        localStorage.removeItem(STORAGE_KEY_HISTORY);
    }
};
