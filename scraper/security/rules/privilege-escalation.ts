import type { SecurityRule } from "../types";

export const privilegeEscalationRules: SecurityRule[] = [
  {
    id: "PRIV-001",
    category: "privilege_escalation",
    severity: "high",
    description: "sudo command usage",
    pattern: /\bsudo\s+/gi,
  },
  {
    id: "PRIV-002",
    category: "privilege_escalation",
    severity: "high",
    description: "systemctl service manipulation",
    pattern: /systemctl\s+(?:start|stop|restart|enable|disable|daemon-reload)/gi,
  },
  {
    id: "PRIV-003",
    category: "privilege_escalation",
    severity: "high",
    description: "launchctl service manipulation (macOS)",
    pattern: /launchctl\s+(?:load|unload|start|stop|bootstrap)/gi,
  },
  {
    id: "PRIV-004",
    category: "privilege_escalation",
    severity: "high",
    description: "crontab modification",
    pattern: /crontab\s+(?:-e|-l|-r)|echo\s+[^|]*\|\s*crontab/gi,
  },
  {
    id: "PRIV-005",
    category: "privilege_escalation",
    severity: "high",
    description: "chmod with setuid/setgid",
    pattern: /chmod\s+[^&|;]*[46][0-7]{3}|chmod\s+[^&|;]*[ug]\+s/gi,
  },
  {
    id: "PRIV-006",
    category: "privilege_escalation",
    severity: "medium",
    description: "chown to root",
    pattern: /chown\s+(?:root|0)[:.]|chown\s+[^&|;]*:(?:root|wheel|admin)/gi,
  },
  {
    id: "PRIV-007",
    category: "privilege_escalation",
    severity: "high",
    description: "Windows runas or elevation",
    pattern: /runas\s+\/user:|Start-Process\s+[^&|;]*-Verb\s+RunAs/gi,
  },
  {
    id: "PRIV-008",
    category: "privilege_escalation",
    severity: "high",
    description: "Docker privileged mode",
    pattern: /docker\s+run\s+[^&|;]*--privileged/gi,
  },
  {
    id: "PRIV-009",
    category: "privilege_escalation",
    severity: "medium",
    description: "Adding user to privileged group",
    pattern: /usermod\s+[^&|;]*-(?:a)?G\s*(?:sudo|wheel|admin|docker|root)/gi,
  },
];
