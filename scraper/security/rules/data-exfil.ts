import type { SecurityRule } from "../types";

export const dataExfilRules: SecurityRule[] = [
  {
    id: "EXFIL-001",
    category: "data_exfil",
    severity: "high",
    description: "Reading file contents and sending to URL",
    pattern:
      /(?:readFile|read_file|open\s*\([^)]+\)\.read|cat\s+[^\|]+)\s*[^;]*(?:fetch|post|send|http|axios|requests)/gi,
  },
  {
    id: "EXFIL-002",
    category: "data_exfil",
    severity: "high",
    description: "Directory listing transmission",
    pattern: /(?:readdir|listdir|os\.walk|glob|ls\s+-la?)[^;]*(?:fetch|post|send|http)/gi,
  },
  {
    id: "EXFIL-003",
    category: "data_exfil",
    severity: "high",
    description: "Clipboard access",
    pattern:
      /(?:clipboard|pbcopy|pbpaste|xclip|xsel|pyperclip|navigator\.clipboard)/gi,
  },
  {
    id: "EXFIL-004",
    category: "data_exfil",
    severity: "critical",
    description: "Screenshot capture instruction",
    pattern: /(?:screenshot|screencapture|screen\s*grab|ImageGrab|pyautogui\.screenshot)/gi,
  },
  {
    id: "EXFIL-005",
    category: "data_exfil",
    severity: "high",
    description: "Webcam/camera access",
    pattern: /(?:getUserMedia|VideoCapture|cv2\.VideoCapture|webcam|camera\.capture)/gi,
  },
  {
    id: "EXFIL-006",
    category: "data_exfil",
    severity: "high",
    description: "Keylogger pattern",
    pattern: /(?:keyboard\.on_press|pynput|keylog|GetAsyncKeyState|SetWindowsHookEx)/gi,
  },
  {
    id: "EXFIL-007",
    category: "data_exfil",
    severity: "medium",
    description: "Browser history access",
    pattern: /(?:chrome.*history|firefox.*places\.sqlite|safari.*history|browser.*history)/gi,
  },
  {
    id: "EXFIL-008",
    category: "data_exfil",
    severity: "high",
    description: "Sending data to webhook/external endpoint",
    pattern: /(?:webhook|discord\.com\/api\/webhooks|hooks\.slack\.com)[^\s"'`)\]]+/gi,
  },
];
