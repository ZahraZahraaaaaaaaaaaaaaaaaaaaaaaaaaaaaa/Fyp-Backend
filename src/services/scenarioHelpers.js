function getStepByNumber(scenario, stepNumber) {
  return scenario.steps.find((s) => s.stepNumber === stepNumber) || null;
}

function sanitizeScenarioForPlayer(scenarioDoc) {
  const o = scenarioDoc.toObject ? scenarioDoc.toObject() : scenarioDoc;
  const steps = (o.steps || []).map((step) => ({
    stepNumber: step.stepNumber,
    content: step.content,
    contextLabel: step.contextLabel,
    isFinalStep: step.isFinalStep,
    options: (step.options || []).map((opt) => ({
      optionText: opt.optionText,
    })),
  }));
  return {
    _id: o._id,
    title: o.title,
    type: o.type,
    difficulty: o.difficulty,
    description: o.description,
    estimatedTime: o.estimatedTime,
    steps,
  };
}

module.exports = { getStepByNumber, sanitizeScenarioForPlayer };
