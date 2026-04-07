// API integration module for patient-related endpoints

export async function getCurrentConsent(patientId: string) {
  // TODO: Replace with real API call
  return fetch(
    "https://trnt3moht1.execute-api.us-east-1.amazonaws.com/dev/retrieve-payer-consent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId }),
    },
  ).then((res) => res.json());
}

// Mock API for prior payers
export async function getPriorPayers(patientId: string) {
  // Mock data based on patientId
  const data = {
    priorPayers: [
      {
        memberId: "MEM789",
        payerName: "MEDICAID",
        payerId: "MC",
        fhirEndpoints: ["https://medicaid.fhir.ny.gov/Patient"],
        coverageStart: "20180101",
        coverageEnd: "20190101",
        groupNumber: "GRP3",
      },
      {
        memberId: "MEM789",
        payerName: "BLUE CROSS BLUE SHIELD",
        payerId: "BCBSNY",
        fhirEndpoints: ["https://bcbsny.fhir.ny.gov/Patient"],
        coverageStart: "20170101",
        coverageEnd: "20180101",
        groupNumber: "GRP2",
      },
      {
        memberId: "MEM456",
        payerName: "UNITEDHEALTHCARE",
        payerId: "UHCNY",
        fhirEndpoints: [
          "https://uhc.fhir.ny.gov/Patient",
          "https://uhc.fhir.ny.gov/Claim",
        ],
        coverageStart: "20160101",
        coverageEnd: "20170101",
        groupNumber: "GRP1",
      },
      {
        memberId: "MEM123",
        payerName: "AETNA",
        payerId: "AETNA",
        fhirEndpoints: [
          "https://aetna.fhir.ny.gov/Patient",
          "https://aetna.fhir.ny.gov/Observation",
        ],
        coverageStart: "20150101",
        coverageEnd: "20160101",
        groupNumber: "GRP4",
      },
      {
        memberId: "MEM321",
        payerName: "CIGNA",
        payerId: "CIGNA",
        fhirEndpoints: [
          "https://cigna.fhir.ny.gov/Patient",
          "https://cigna.fhir.ny.gov/Observation",
        ],
        coverageStart: "20140101",
        coverageEnd: "20150101",
        groupNumber: "GRP5",
      },
    ],
  };
  return Promise.resolve(data);
}

// Mock API for FHIR endpoints
export async function getFhirEndpoints(patientId: string) {
  // Mock data based on patientId
  const data = {
    fhirEndpoints: [
      {
        payerName: "MEDICAID",
        payerId: "MEDICAID",
        endpoints: [
          "https://medicaid.fhir.ny.gov/Patient",
          "https://medicaid.fhir.ny.gov/Observation",
          "https://medicaid.fhir.ny.gov/Claim",
          "https://medicaid.fhir.ny.gov/AllergyIntolerance",
          "https://medicaid.fhir.ny.gov/MedicationRequest",
          "https://medicaid.fhir.ny.gov/Encounter",
          "https://medicaid.fhir.ny.gov/Condition",
          "https://medicaid.fhir.ny.gov/Consent",
        ],
      },
      {
        payerName: "BLUE CROSS BLUE SHIELD",
        payerId: "BCBSNY",
        endpoints: [
          "https://bcbsny.fhir.ny.gov/Patient",
          "https://bcbsny.fhir.ny.gov/Claim",
          "https://bcbsny.fhir.ny.gov/Observation",
          "https://bcbsny.fhir.ny.gov/AllergyIntolerance",
          "https://bcbsny.fhir.ny.gov/MedicationRequest",
          "https://bcbsny.fhir.ny.gov/Encounter",
          "https://bcbsny.fhir.ny.gov/Condition",
          "https://bcbsny.fhir.ny.gov/Consent",
        ],
      },
      {
        payerName: "UNITEDHEALTHCARE",
        payerId: "UHCNY",
        endpoints: [
          "https://uhc.fhir.ny.gov/Patient",
          "https://uhc.fhir.ny.gov/Claim",
          "https://uhc.fhir.ny.gov/Observation",
          "https://uhc.fhir.ny.gov/AllergyIntolerance",
          "https://uhc.fhir.ny.gov/MedicationRequest",
          "https://uhc.fhir.ny.gov/Encounter",
          "https://uhc.fhir.ny.gov/Condition",
          "https://uhc.fhir.ny.gov/Consent",
        ],
      },
      {
        payerName: "AETNA",
        payerId: "AETNA",
        endpoints: [
          "https://aetna.fhir.ny.gov/Patient",
          "https://aetna.fhir.ny.gov/Observation",
          "https://aetna.fhir.ny.gov/Claim",
          "https://aetna.fhir.ny.gov/AllergyIntolerance",
          "https://aetna.fhir.ny.gov/MedicationRequest",
          "https://aetna.fhir.ny.gov/Encounter",
          "https://aetna.fhir.ny.gov/Condition",
          "https://aetna.fhir.ny.gov/Consent",
        ],
      },
      {
        payerName: "CIGNA",
        payerId: "CIGNA",
        endpoints: [
          "https://cigna.fhir.ny.gov/Patient",
          "https://cigna.fhir.ny.gov/Observation",
          "https://cigna.fhir.ny.gov/Claim",
          "https://cigna.fhir.ny.gov/AllergyIntolerance",
          "https://cigna.fhir.ny.gov/MedicationRequest",
          "https://cigna.fhir.ny.gov/Encounter",
          "https://cigna.fhir.ny.gov/Condition",
          "https://cigna.fhir.ny.gov/Consent",
        ],
      },
    ],
  };
  return Promise.resolve(data);
}
