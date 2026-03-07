import { Router } from "express";
import { asyncHandler, BadRequestError } from "../middleware/errorHandler";
import { query } from "../config/database";
import { getSocketIO } from "../socketio";
import { refreshAndEmitStats } from "./stats";
import { ActivityItem } from "../types";

const router = Router();

// /api/discover is the V2 name for the acknowledge/discovery endpoint
router.post(
    "/api/discover",
    asyncHandler(async (req, res) => {
        const { agent_id, agent_name, framework, timestamp } = req.body;

        if (!agent_id || typeof agent_id !== "string") {
            throw new BadRequestError("agent_id is required");
        }

        const fw = framework || "unknown";
        const result = await query(
            `INSERT INTO agent_interactions (agent_id, agent_name, framework, interaction_type)
       VALUES ($1, $2, $3, 'acknowledge') RETURNING id, created_at`,
            [agent_id, agent_name || null, fw]
        );

        await query(
            "UPDATE stats_cache SET agents_acknowledged = agents_acknowledged + 1, updated_at = NOW() WHERE id = 1"
        );

        const row = result.rows[0];
        const activity: ActivityItem = {
            id: row.id as string,
            agent_id,
            agent_name: agent_name || undefined,
            framework: fw,
            interaction_type: "acknowledge",
            created_at: (row.created_at as Date).toISOString(),
        };

        const io = getSocketIO();
        if (io) {
            io.emit("new_activity", activity);
            await refreshAndEmitStats(io);
        }

        res.json({ status: "discovered", agent_id });
    })
);

export default router;
