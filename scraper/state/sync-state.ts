import fs from "fs";
import path from "path";

const STATE_FILE = path.join(__dirname, "last-sync.json");

export interface SyncState {
    last_run_at: string | null;
    known_slugs: Record<string, string>;
    total_synced: number;
}

export function loadSyncState(): SyncState {
    try {
        if (fs.existsSync(STATE_FILE)) {
            const raw = fs.readFileSync(STATE_FILE, "utf-8");
            return JSON.parse(raw) as SyncState;
        }
    } catch (err) {
        console.warn("Failed to load sync state, using empty state:", err);
    }
    return {
        last_run_at: null,
        known_slugs: {},
        total_synced: 0,
    };
}

export function saveSyncState(state: SyncState): void {
    const dir = path.dirname(STATE_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
    console.log(`Sync state saved: ${state.total_synced} known slugs`);
}

export function isNewOrChanged(
    state: SyncState,
    slug: string,
    contentHash: string
): boolean {
    const existing = state.known_slugs[slug];
    if (!existing) return true;
    return existing !== contentHash;
}

export function updateSlugHash(
    state: SyncState,
    slug: string,
    contentHash: string
): void {
    state.known_slugs[slug] = contentHash;
    state.total_synced = Object.keys(state.known_slugs).length;
}

export function markRunComplete(state: SyncState): void {
    state.last_run_at = new Date().toISOString();
}
