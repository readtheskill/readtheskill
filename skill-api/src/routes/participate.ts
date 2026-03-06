import { Router } from "express";
import { asyncHandler, BadRequestError } from "../middleware/errorHandler";
import { query } from "../config/database";
import { verifyTransaction } from "../services/helius";
import { getSocketIO } from "../socketio";
import { refreshAndEmitStats } from "./stats";
import { ActivityItem } from "../types";

const router = Router();

router.post(
  "/api/participate",
  asyncHandler(async (req, res) => {
    const { agent_id, agent_name, tx_signature, framework } = req.body;

    if (!agent_id || typeof agent_id !== "string") {
      throw new BadRequestError("agent_id is required");
    }
    if (!tx_signature || typeof tx_signature !== "string") {
      throw new BadRequestError("tx_signature is required");
    }

    const { valid, amountSol } = await verifyTransaction(tx_signature);
    if (!valid) {
      throw new BadRequestError("Invalid transaction signature");
    }

    const fw = framework || "unknown";
    const result = await query(
      `INSERT INTO agent_interactions (agent_id, agent_name, framework, interaction_type, tx_signature, amount_sol)
       VALUES ($1, $2, $3, 'participate', $4, $5) RETURNING id, created_at`,
      [agent_id, agent_name || null, fw, tx_signature, amountSol]
    );

    await query(
      `UPDATE stats_cache SET
         agents_participated = agents_participated + 1,
         total_sol_volume = total_sol_volume + $1,
         updated_at = NOW()
       WHERE id = 1`,
      [amountSol]
    );

    const row = result.rows[0];
    const activity: ActivityItem = {
      id: row.id as string,
      agent_id,
      agent_name: agent_name || undefined,
      framework: fw,
      interaction_type: "participate",
      amount_sol: amountSol,
      created_at: (row.created_at as Date).toISOString(),
    };

    const io = getSocketIO();
    if (io) {
      io.emit("new_activity", activity);
      await refreshAndEmitStats(io);
    }

    res.json({ status: "participation_recorded", agent_id, tx_signature });
  })
);

export default router;
