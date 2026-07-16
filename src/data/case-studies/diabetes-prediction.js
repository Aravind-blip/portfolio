// Rich, structured documentation content for the Diabetes Prediction App
// deep-dive page. Every fact here is restructured from what was already
// verified by direct repository inspection (see src/data/projects.js's entry
// for the same project) — nothing new is introduced, only reorganized into
// the documentation-style schema this page renders. The source is private,
// so implementation details beyond what's listed here are intentionally not
// disclosed.
export const diabetesPredictionCaseStudy = {
  slug: "diabetes-prediction",
  title: "Diabetes Prediction App",
  subtitle: "An educational decision-support prototype, not a diagnostic tool",
  status: "Prototype",
  category: "Applied Machine Learning",

  overview:
    "A logistic regression classifier trained on a public-style diabetes risk dataset (age, BMI, HbA1c level, blood glucose level, hypertension, heart disease, gender, and smoking history), served behind a small FastAPI backend and a Streamlit front end where a user enters those values and receives a binary risk indicator. This project is explicitly educational — it demonstrates taking a trained model past a notebook and into a working client-server interface, not a clinical result.",

  problem: {
    statement:
      "Understanding how routine health measurements relate to diabetes risk is a well-known applied machine learning exercise, useful for practicing the full loop from features to a usable prediction interface.",
    context:
      "This project is explicitly educational: it demonstrates taking a trained model past a notebook and into a working client-server interface, not a clinical result.",
  },

  solution: {
    summary:
      "A single interpretable logistic regression model, trained on encoded health-measurement features, served through a FastAPI backend and a Streamlit client so a user can enter values and receive a binary risk indicator.",
    approach: [
      "Encode categorical and numeric health-measurement features (age, BMI, HbA1c, blood glucose, hypertension, heart disease, gender, smoking history) for a logistic regression model.",
      "Serve the trained, serialized model behind a small FastAPI endpoint.",
      "Collect user input and display the prediction through a separate Streamlit client, rather than embedding the model directly in the UI process.",
    ],
  },

  architecture: {
    type: "client-server",
    nodes: [
      { label: "Client", detail: "Streamlit form collects health measurement inputs" },
      { label: "API", detail: "FastAPI endpoint loads the serialized model and returns a prediction" },
      { label: "Model", detail: "Logistic regression trained on encoded categorical and numeric features" },
    ],
  },

  engineeringDecisions: [
    {
      decision: "Keep the model as a single, interpretable logistic regression rather than a black-box ensemble.",
      reason:
        "A decision-support demo benefits more from transparency — being able to see how each input contributes to the prediction — than from marginal accuracy gains an ensemble might offer.",
      alternatives: "A tree-based ensemble (e.g. random forest or gradient boosting) or a small neural network.",
      tradeoffs:
        "A single logistic regression model likely trades away some predictive accuracy an ensemble could reach, in exchange for a model whose behavior is straightforward to explain.",
      futureImprovement:
        "Adding a proper train/evaluation script with tracked metrics is the identified next step before comparing this choice against alternatives with real numbers (see Roadmap).",
    },
    {
      decision: "Split the client and API into separate services (Streamlit and FastAPI).",
      reason:
        "Practicing a realistic serving pattern — a client that calls an API rather than a model embedded directly in the UI process — was part of the point of the exercise.",
      alternatives: "Loading and running the model directly inside the Streamlit process.",
      tradeoffs:
        "Running two services instead of one adds a network hop and a second process to deploy, in exchange for a serving pattern that more closely resembles how a model would actually be deployed in production.",
      futureImprovement: "None planned; this remains the intended serving pattern for the project.",
    },
  ],

  technology: [
    { group: "Language & ML", items: ["Python", "scikit-learn"] },
    { group: "API", items: ["FastAPI"] },
    { group: "Client", items: ["Streamlit"] },
  ],

  implementation: [
    {
      title: "Feature encoding handles both categorical and numeric inputs",
      detail:
        "Age, BMI, HbA1c level, and blood glucose level are numeric; hypertension, heart disease, gender, and smoking history are encoded categorical features feeding the same logistic regression model.",
    },
    {
      title: "The API loads a serialized model rather than retraining on request",
      detail:
        "The FastAPI endpoint loads an already-trained, serialized model and returns a prediction, keeping inference fast and separate from training.",
    },
  ],

  testing: {
    summary:
      "No automated test suite currently exists — this is an area planned for improvement rather than something already in place.",
    points: [
      "TODO: add a train/evaluation script with tracked metrics (accuracy, precision, recall, ROC-AUC).",
      "TODO: add a basic automated test suite covering the API and model-loading path.",
    ],
  },

  challenges: [
    {
      title: "Choosing transparency over marginal accuracy for a decision-support demo",
      detail:
        "Keeping the model as a single interpretable logistic regression, rather than reaching for an ensemble, was a deliberate tradeoff made without a formal metrics comparison to lean on yet.",
    },
  ],

  limitations: [
    "This is an educational and decision-support exercise, not a medical diagnostic system, and should never be used to make real health decisions.",
    "Only a single model was trained; there is no multi-model comparison.",
    "The source is private, so implementation details are intentionally not published here.",
    "This is the most prototype-stage project in the portfolio: it has not been re-verified end-to-end recently, and should be read as a learning project, not a production or clinical system.",
  ],

  results: {
    summary:
      "A working end-to-end client-server prediction interface exists, taking a trained logistic regression model past a notebook and into a usable form — the project's stated goal — though it has not been re-verified end-to-end recently and has no tracked evaluation metrics yet.",
    points: [
      "A trained logistic regression model is served behind a working FastAPI endpoint.",
      "A Streamlit client collects input and displays predictions end to end.",
    ],
  },

  lessons: [
    "Choosing a single interpretable model over an ensemble is easiest to defend when it's an explicit tradeoff made up front, rather than a default reached by not trying anything else — this project intentionally named the tradeoff rather than treating it as a given.",
    "Splitting the client and API into separate services, even for a small prototype, made the serving pattern closer to a real deployment than embedding the model in the UI process would have — a lesson worth carrying into future prototypes regardless of scale.",
    "Shipping a working end-to-end interface without a tracked evaluation script left this project unable to say precisely how good its predictions are — a gap that's more visible in hindsight than it was during initial development.",
  ],

  roadmap: [
    {
      label: "Train/evaluation script with tracked metrics",
      status: "Planned",
      detail: "Accuracy, precision, recall, and ROC-AUC tracking, identified as the clear next step before this graduates past prototype status.",
    },
    {
      label: "Basic automated test suite",
      status: "Planned",
      detail: "Currently no automated tests exist; this is planned alongside the evaluation script.",
    },
  ],

  repository: {
    githubUrl: null,
    demoUrl: null,
    status: "Prototype",
  },

  relatedProjects: ["rag-agent-audit"],
};
