import { Server as SocketServer } from "socket.io";
import { query } from "../config/database";
import { getHolderCount } from "./birdeye";
import { getJSON, setJSON } from "../config/redis";
import { logger } from "../config/logger";
import { Stats } from "../types";
import { transformStats } from "../routes/stats";

let interval: ReturnType<typeof setInterval> | null = null;

export function startCron(io: SocketServer): void {
  interval = setInterval(async () => {
    try {
      const holders = await getHolderCount();
      if (holders > 0) {
        await query("UPDATE stats_cache SET total_holders = $1, updated_at = NOW() WHERE id = 1", [
          holders,
        ]);
      }

      // Refresh cached stats and emit
      const result = await query("SELECT * FROM stats_cache WHERE id = 1");
      if (result.rows[0]) {
        const stats = transformStats(result.rows[0]);
        await setJSON("stats:current", stats, 60);
        io.emit("stats_update", stats);
      }
    } catch (err) {
      logger.error({ err }, "Cron tick failed");
    }
  }, 60_000);

  logger.info("Cron started (60s interval)");
}

export function stopCron(): void {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}
