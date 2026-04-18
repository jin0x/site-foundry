export type EvaluationCheck = {
  id: string;
  description: string;
  passed: boolean;
};

export function summarizeChecks(checks: EvaluationCheck[]): { passed: number; failed: number } {
  return {
    passed: checks.filter((check) => check.passed).length,
    failed: checks.filter((check) => !check.passed).length,
  };
}
