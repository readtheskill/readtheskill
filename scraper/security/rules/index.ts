import { commandInjectionRules } from "./command-injection";
import { networkExfilRules, ALLOWED_DOMAINS } from "./network-exfil";
import { filesystemAbuseRules } from "./filesystem-abuse";
import { obfuscationRules } from "./obfuscation";
import { credentialHarvestRules } from "./credential-harvest";
import { promptInjectionRules } from "./prompt-injection";
import { zeroWidthRules } from "./zero-width";
import { malwareDownloadRules } from "./malware-download";
import { dataExfilRules } from "./data-exfil";
import { privilegeEscalationRules } from "./privilege-escalation";
import { supplyChainRules } from "./supply-chain";
import { persistenceRules } from "./persistence";
import type { SecurityRule } from "../types";

export const ALL_RULES: SecurityRule[] = [
  ...commandInjectionRules,
  ...networkExfilRules,
  ...filesystemAbuseRules,
  ...obfuscationRules,
  ...credentialHarvestRules,
  ...promptInjectionRules,
  ...zeroWidthRules,
  ...malwareDownloadRules,
  ...dataExfilRules,
  ...privilegeEscalationRules,
  ...supplyChainRules,
  ...persistenceRules,
];

export const RULES_BY_CATEGORY: Record<string, SecurityRule[]> = {
  command_injection: commandInjectionRules,
  network_exfil: networkExfilRules,
  filesystem_abuse: filesystemAbuseRules,
  obfuscation: obfuscationRules,
  credential_harvesting: credentialHarvestRules,
  prompt_injection: promptInjectionRules,
  zero_width: zeroWidthRules,
  malware_download: malwareDownloadRules,
  data_exfil: dataExfilRules,
  privilege_escalation: privilegeEscalationRules,
  supply_chain: supplyChainRules,
  persistence: persistenceRules,
};

export { ALLOWED_DOMAINS };

export {
  commandInjectionRules,
  networkExfilRules,
  filesystemAbuseRules,
  obfuscationRules,
  credentialHarvestRules,
  promptInjectionRules,
  zeroWidthRules,
  malwareDownloadRules,
  dataExfilRules,
  privilegeEscalationRules,
  supplyChainRules,
  persistenceRules,
};
