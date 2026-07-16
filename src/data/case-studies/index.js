import { diabetesPredictionCaseStudy } from "./diabetes-prediction";
import { distributedOperationsControlPlaneCaseStudy } from "./distributed-operations-control-plane";
import { enterpriseFinancePlatformCaseStudy } from "./enterprise-finance-platform";
import { knowledgeHubCaseStudy } from "./knowledge-hub";
import { ragAgentAuditCaseStudy } from "./rag-agent-audit";

// Keyed by project slug. Every project is migrated to this framework — see
// SystemDetail for the (now dead) legacy ProjectCaseStudy fallback.
export const caseStudies = {
  "rag-agent-audit": ragAgentAuditCaseStudy,
  "distributed-operations-control-plane": distributedOperationsControlPlaneCaseStudy,
  "knowledge-hub": knowledgeHubCaseStudy,
  "enterprise-finance-platform": enterpriseFinancePlatformCaseStudy,
  "diabetes-prediction": diabetesPredictionCaseStudy,
};
