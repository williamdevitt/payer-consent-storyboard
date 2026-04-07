import { useState } from "react";
import {
  getCurrentConsent,
  getPriorPayers,
  getFhirEndpoints,
} from "../api/patientApi";
import {
  Container,
  Title,
  Select,
  Button,
  Group,
  Paper,
  Text,
  Loader,
  Stack,
  useMantineTheme,
  Space,
  Alert,
  Grid,
  Divider,
  rem,
  ThemeIcon,
  Tabs,
  Code,
  Textarea,
} from "@mantine/core";
import { IconHeartbeat, IconUsers } from "@tabler/icons-react";
import {
  IconFileText,
  IconHistory,
  IconApi,
  IconAlertCircle,
  IconCode,
} from "@tabler/icons-react";
//
const storyText = `
Welcome to the Payer Consent Dashboard!

This application demonstrates the SHIN-NY (New York State Health Information Network) Payer Consent API. The goal is to enable the sharing of patient consent values between payers, easing patient care barriers and improving care coordination.

The dashboard is powered by three registries:
- **Payer to Payer Consent Registry**: The source of truth for patient consent, accessible via API for payers to retrieve the latest consent value.
- **Prior Payers Registry**: Contains past care records and consent values, sourced from Managed Care Organizations (MCOs).
- **Payer FHIR Endpoint Registry**: Lists all known FHIR endpoints for payers, enabling programmatic data exchange.

Use the dashboard below to explore how consent data, prior payer history, and FHIR endpoints can be accessed and visualized for patients in New York State. This interface is designed to tell the story of how these registries work together to support seamless, secure, and patient-centered health information exchange.
`;

// Technical Details component
function TechnicalDetails() {
  const endpoints = [
    {
      name: "Retrieve Payer Consent",
      url: "https://trnt3moht1.execute-api.us-east-1.amazonaws.com/dev/retrieve-payer-consent",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer <JWT_TOKEN>",
      },
      bodies: [
        {
          label: "By Demographics",
          body: {
            first_name: "Danny",
            last_name: "Hanson",
            dob: "20081122",
            address: {
              line1: "",
              line2: "",
              city: "Hamburg",
              state: "NY",
              postal_code: "14075",
            },
          },
        },
        {
          label: "By QE + Source + MRN",
          body: {
            qe: "GRRHIO",
            source: "UMMC",
            mrn: "5146901",
          },
        },
      ],
    },
    {
      name: "Get Prior Payers",
      url: "https://trnt3moht1.execute-api.us-east-1.amazonaws.com/dev/get-prior-payers",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer <JWT_TOKEN>",
      },
      bodies: [
        {
          label: "By Demographics",
          body: {
            first_name: "Danny",
            last_name: "Hanson",
            dob: "20081122",
            address: {
              line1: "",
              line2: "",
              city: "Hamburg",
              state: "NY",
              postal_code: "14075",
            },
          },
        },
        {
          label: "By QE + Source + MRN",
          body: {
            qe: "GRRHIO",
            source: "UMMC",
            mrn: "5146901",
          },
        },
      ],
    },
    {
      name: "Get FHIR Endpoints",
      url: "https://trnt3moht1.execute-api.us-east-1.amazonaws.com/dev/get-fhir-endpoints",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer <JWT_TOKEN>",
      },
      bodies: [
        {
          label: "By Payer ID",
          body: { payerId: "example_payer_id" },
        },
      ],
      connectionRequest: {
        field: "connectionMessage",
        label: "Connection Request Message",
        hint: "Required: Include your connection request message when requesting access to FHIR endpoints",
        defaultMessage:
          "As a payer (Your Insurance Company Name), we are interested in connecting to your FHIR endpoints for payer-to-payer exchange of claims and clinical data. Please contact us at interop@yourpayer.com or +1-555-123-4567 to initiate the connection process. Visit our interoperability portal at TicketingPortal.YourPayer.com to track the request status.",
      },
    },
  ];

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="lg" ta="center">
        Technical Details
      </Title>
      <Group justify="center" mb="lg">
        <Button
          component="a"
          href="http://payer-consent-swagger-bucket-development.s3-website-us-east-1.amazonaws.com/#/default/get_retrieve_payer_consent"
          target="_blank"
          rel="noopener noreferrer"
          leftSection={<IconApi size={16} />}
          variant="outline"
          color="blue"
        >
          View API Documentation (Swagger)
        </Button>
      </Group>
      <Stack gap="lg">
        {endpoints.map((endpoint, idx) => (
          <Paper key={idx} shadow="md" p="lg" radius="md" withBorder>
            <Group gap="xs" mb="sm">
              <ThemeIcon color="blue" size={32} radius="xl" variant="light">
                <IconCode size={20} />
              </ThemeIcon>
              <Title order={4}>{endpoint.name}</Title>
            </Group>
            <Grid gap={4}>
              <Grid.Col span={6}>
                <Text fw={500}>URL:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Code>{endpoint.url}</Code>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={500}>Method:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>{endpoint.method}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={500}>Headers:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Code block>{JSON.stringify(endpoint.headers, null, 2)}</Code>
              </Grid.Col>
              {endpoint.bodies.map((bodyItem, bodyIdx) => (
                <>
                  <Grid.Col span={6}>
                    <Text fw={500}>Body ({bodyItem.label}):</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Code block>{JSON.stringify(bodyItem.body, null, 2)}</Code>
                  </Grid.Col>
                </>
              ))}
              {endpoint.connectionRequest && (
                <>
                  <Grid.Col span={12}>
                    <Divider
                      my="sm"
                      label={endpoint.connectionRequest.label}
                      labelPosition="left"
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Text fw={500} mb="xs">
                      {endpoint.connectionRequest.label} *
                    </Text>
                    <Text fw={400} size="sm" c="gray.6" mb="sm">
                      {endpoint.connectionRequest.hint}
                    </Text>
                    <Textarea
                      placeholder="Enter your connection request message here..."
                      defaultValue={endpoint.connectionRequest.defaultMessage}
                      minRows={6}
                      maxRows={12}
                      required
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                      }}
                    />
                  </Grid.Col>
                </>
              )}
            </Grid>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

// Patient demographics card component (top-level only)
function PatientDemographicsCard({ patient }: { patient: any }) {
  if (!patient) return null;
  const d = patient.demographics;
  return (
    <Paper shadow="xs" p="md" radius="md" withBorder>
      <Title order={5} mb="xs">
        Patient Demographics
      </Title>
      <Grid gap={4}>
        <Grid.Col span={6}>
          <Text fw={500}>Name:</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text>
            {d.first_name} {d.last_name}
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text fw={500}>DOB:</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text>{d.dob}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text fw={500}>Address:</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text>
            {d.address.line1}
            {d.address.line2 ? ", " + d.address.line2 : ""}, {d.address.city},{" "}
            {d.address.state} {d.address.postal_code}
          </Text>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

const patients = [
  {
    label: "Danny Hanson",
    value: "danny",
    demographics: {
      first_name: "Danny",
      last_name: "Hanson",
      dob: "20081122",
      address: {
        line1: "6144 Jeffrey Station",
        line2: "",
        city: "Hamburg",
        state: "NY",
        postal_code: "14075",
      },
    },
    story:
      "Danny is a 16-year-old high school student who has been managing Type 1 diabetes for the past 8 years. His condition is well-controlled through consistent insulin therapy and regular monitoring. Danny's parents recognize the importance of seamless care coordination, especially as he transitions between school and his pediatric endocrinologist. They have actively consented to share his medical records across all his healthcare providers to ensure continuity of care and prevent any gaps in his treatment. Danny's health records are accessible across his insurance plan and participating providers, enabling timely clinical decision-making and support for his active lifestyle.",
  },
  {
    label: "Maria Lopez",
    value: "maria",
    demographics: {
      first_name: "Maria",
      last_name: "Lopez",
      dob: "19950514",
      address: {
        line1: "123 Main St",
        line2: "Apt 2B",
        city: "Buffalo",
        state: "NY",
        postal_code: "14201",
      },
    },
    story:
      "Maria is a 31-year-old teacher and mother of one child. Approximately one year ago, she was diagnosed with stage 3 metastatic breast cancer and is currently undergoing chemotherapy, with radiation therapy planned to follow. Due to her illness, Maria took a leave of absence from her teaching position, resulting in a transition from employer-sponsored insurance to Medicaid coverage. As part of this transition, she now has care managers associated with both her former payer and her current Medicaid plan. Maria has significant concerns about privacy and prefers to limit the sharing of her sensitive cancer treatment records. She has not consented to share her medical records across plans, wanting to maintain greater control over who has access to her diagnosis and treatment details. However, this decision creates coordination challenges for her care team.",
  },
  {
    label: "James Smith",
    value: "james",
    demographics: {
      first_name: "James",
      last_name: "Smith",
      dob: "19781230",
      address: {
        line1: "456 Oak Ave",
        line2: "",
        city: "Rochester",
        state: "NY",
        postal_code: "14620",
      },
    },
    story:
      "James is a 45-year-old entrepreneur managing multiple chronic conditions including hypertension and Type 2 diabetes. His health care situation is complex, with frequent changes in insurance coverage as his business navigates different healthcare plans. Notably, James frequently changes his mind about sharing his medical records. At times, he strongly advocates for comprehensive data sharing to ensure his cardiologist and endocrinologist have complete information. Other times, concerns about data privacy lead him to restrict access. This inconsistent consent status creates ongoing challenges for care coordination and requires his healthcare providers to continuously verify his latest preferences before accessing or sharing his records.",
  },
];

// Patient background story component
function PatientStoryCard({ patient }: { patient: any }) {
  if (!patient || !patient.story) return null;
  return (
    <Paper
      shadow="sm"
      p="md"
      mt="md"
      radius="md"
      withBorder
      style={{
        background: "linear-gradient(135deg, #faf9f7 0%, #f3f0eb 100%)",
        borderColor: "#d4af37",
        borderWidth: 2,
      }}
    >
      <Group gap="xs" mb="md">
        <ThemeIcon color="amber" size={32} radius="xl" variant="light">
          <IconHeartbeat size={20} />
        </ThemeIcon>
        <Title order={5} style={{ color: "#92400e" }}>
          About {patient.demographics.first_name}
        </Title>
      </Group>
      <Text
        style={{
          color: "#44403c",
          lineHeight: 1.7,
          fontSize: 14,
          fontStyle: "italic",
        }}
      >
        {patient.story}
      </Text>
    </Paper>
  );
}

function PatientDashboard() {
  const theme = useMantineTheme();
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [resultType, setResultType] = useState<string | null>(null);

  // Helper functions
  function formatConsent(consent: any) {
    if (!consent) return null;
    const c = consent.latest_consent || consent;
    return (
      <Paper shadow="xs" p="md" mt="md" radius="md" withBorder>
        <Title order={4} mb="xs">
          Current Consent
        </Title>
        <Grid gap={4}>
          <Grid.Col span={6}>
            <Text fw={500}>Consent Value:</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text
              c={
                c.consent_value === "YES"
                  ? "green.7"
                  : c.consent_value === "NO"
                    ? "red.7"
                    : "orange.7"
              }
              fw={600}
            >
              {c.consent_value}
              {c.consent_value === "VARIES" && (
                <Text size="xs" fw={400} c="gray.6" mt="xs">
                  (Consent status changes frequently)
                </Text>
              )}
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fw={500}>Recorded By:</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>{c.recorded_by}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fw={500}>Payer ID:</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>{c.payer_id}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fw={500}>Submitter:</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>{c.submitter_long_name}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fw={500}>Updated:</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>{c.updated_timestamp}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fw={500}>Patient:</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>
              {c.first_name} {c.last_name} (DOB: {c.dob})
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fw={500}>Address:</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>
              {c.address?.line1}, {c.address?.city}, {c.address?.state}{" "}
              {c.address?.zip}
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fw={500}>MRN:</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>{c.mrn}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fw={500}>Source:</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>{c.source}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fw={500}>Consent Source:</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>{c.consent_source}</Text>
          </Grid.Col>
        </Grid>
        <Space h="sm" />
        <Text fw={500} mt="sm">
          Prior Payers:
        </Text>
        <ul>
          {(c.prior_payers || []).map((p: any, idx: number) => (
            <li key={idx}>
              {p.payer} ({p.coverage_start} - {p.coverage_end})
            </li>
          ))}
        </ul>
      </Paper>
    );
  }

  function formatPriorPayers(data: any) {
    if (!data || !data.priorPayers) return null;
    return (
      <Paper shadow="xs" p="md" mt="md" radius="md" withBorder>
        <Title order={4} mb="xs">
          Prior Payers
        </Title>
        <Stack gap={4}>
          {data.priorPayers.map((p: any, idx: number) => (
            <Paper key={idx} shadow="xs" p="sm" mb="xs" withBorder>
              <Grid gap={4}>
                <Grid.Col span={6}>
                  <Text fw={500}>Member ID:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>{p.memberId}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fw={500}>Payer:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>
                    {p.payerName} ({p.payerId || "Unknown"})
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fw={500}>Group Number:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>{p.groupNumber}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fw={500}>FHIR Endpoints:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>{(p.fhirEndpoints || []).join(", ") || "None"}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fw={500}>Coverage:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>
                    {p.coverageStart} - {p.coverageEnd}
                  </Text>
                </Grid.Col>
              </Grid>
            </Paper>
          ))}
        </Stack>
      </Paper>
    );
  }

  function formatFhirEndpoints(data: any) {
    if (!data || !data.fhirEndpoints) return null;
    return (
      <Paper shadow="xs" p="md" mt="md" radius="md" withBorder>
        <Title order={4} mb="xs">
          FHIR Endpoints
        </Title>
        <Stack gap={4}>
          {data.fhirEndpoints.map((ep: any, idx: number) => {
            // Separate consent endpoint from the rest
            const consentEndpoint = (ep.endpoints || []).find((url: string) =>
              url.toLowerCase().includes("consent"),
            );
            const otherEndpoints = (ep.endpoints || []).filter(
              (url: string) => !url.toLowerCase().includes("consent"),
            );
            return (
              <Paper key={idx} shadow="xs" p="sm" mb="xs" withBorder>
                <Grid gap={4}>
                  <Grid.Col span={6}>
                    <Text fw={500}>Payer:</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text>
                      {ep.payerName} ({ep.payerId || "Unknown"})
                    </Text>
                  </Grid.Col>
                  {consentEndpoint && (
                    <>
                      <Grid.Col span={6}>
                        <Text fw={500} c="teal.7">
                          Consent Endpoint:
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Text c="teal.7">{consentEndpoint}</Text>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Divider
                          my="xs"
                          label="Other FHIR Resources"
                          labelPosition="center"
                        />
                      </Grid.Col>
                    </>
                  )}
                  <Grid.Col span={6}>
                    <Text fw={500}>Other Endpoints:</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text>
                      {otherEndpoints.length > 0
                        ? otherEndpoints.join(", ")
                        : "None"}
                    </Text>
                  </Grid.Col>
                </Grid>
              </Paper>
            );
          })}
        </Stack>
      </Paper>
    );
  }

  // Action handler

  const handleAction = async (action: string) => {
    setLoading(true);
    setResult(null);
    setResultType(action);
    const patient = patients.find((p) => p.value === selectedPatient);
    try {
      if (action === "get-consent") {
        try {
          const apiResult = await getCurrentConsent(patient?.value || "");
          let consentData = apiResult;
          if (apiResult.body && typeof apiResult.body === "string") {
            try {
              consentData = JSON.parse(apiResult.body);
            } catch {}
          }
          setResult(consentData);
        } catch (err) {
          // Fallback: mock consent data based on patient
          let consentValue = "YES";
          if (patient?.value === "maria") {
            consentValue = "NO";
          } else if (patient?.value === "james") {
            // James changes his mind - show mixed/indeterminate status
            consentValue = "YES";
          }

          setResult({
            latest_consent: {
              consent_value: consentValue,
              recorded_by: "MOCK PAYER",
              payer_id: "MOCK123",
              submitter_long_name: "Mock Submitter",
              updated_timestamp: "2026-04-06T12:00:00Z",
              first_name: patient?.demographics.first_name,
              last_name: patient?.demographics.last_name,
              dob: patient?.demographics.dob,
              address: patient?.demographics.address,
              mrn: "MOCKMRN123",
              source: "Mock Source",
              consent_source: "Mock",
              prior_payers: [
                {
                  payer: "MOCK PRIOR 1",
                  coverage_start: "20240101",
                  coverage_end: "20250101",
                },
                {
                  payer: "MOCK PRIOR 2",
                  coverage_start: "20230101",
                  coverage_end: "20240101",
                },
              ],
            },
          });
        }
      } else if (action === "get-prior-payers") {
        const apiResult = await getPriorPayers(patient?.value || "");
        setResult(apiResult);
      } else if (action === "get-fhir-endpoints") {
        const apiResult = await getFhirEndpoints(patient?.value || "");
        setResult(apiResult);
      }
    } catch (e) {
      setResult({ error: "Failed to fetch data" });
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 60%, #f0fdfa 100%)",
      }}
    >
      <Container size="md" py="xl">
        <Paper
          radius="lg"
          shadow="xl"
          p="lg"
          mb="xl"
          style={{
            background: "linear-gradient(90deg, #2563eb 0%, #06b6d4 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Group justify="center" align="center" gap="xs">
            <ThemeIcon
              size={rem(48)}
              radius="xl"
              variant="light"
              color="teal"
              style={{ boxShadow: "0 2px 12px 0 #06b6d4aa" }}
            >
              <IconHeartbeat size={32} />
            </ThemeIcon>
            <Title order={1} style={{ color: "white", letterSpacing: 1 }}>
              Payer Consent API - Storyboard
            </Title>
          </Group>
          <Text ta="center" mt="sm" size="lg" style={{ opacity: 0.9 }}>
            Seamless, secure, and patient-centered health information exchange
            for New York State
          </Text>
        </Paper>

        <Tabs defaultValue="dashboard">
          <Tabs.List mb="lg" justify="center">
            <Tabs.Tab value="dashboard" leftSection={<IconApi size={16} />}>
              Dashboard
            </Tabs.Tab>
            <Tabs.Tab value="technical" leftSection={<IconCode size={16} />}>
              Technical Details
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="dashboard">
            <Paper
              shadow="md"
              p="xl"
              mb="md"
              radius="lg"
              withBorder
              style={{
                background:
                  "linear-gradient(120deg, #f8fafc 60%, #e0e7ff 100%)",
                border: "1.5px solid #dbeafe",
                boxShadow: "0 2px 16px 0 #e0e7ff44",
              }}
            >
              <Text
                size="xl"
                fw={600}
                mb={8}
                style={{
                  color: "#2563eb",
                  letterSpacing: 0.2,
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                Welcome to the Payer Consent Story Dashboard!
              </Text>
              <Text
                size="md"
                mb={16}
                style={{
                  color: "#334155",
                  textAlign: "center",
                  fontStyle: "italic",
                  opacity: 0.85,
                }}
              >
                This application demonstrates the SHIN-NY (New York State Health
                Information Network) Payer Consent API. The goal is to enable
                the sharing of patient consent values between payers, easing
                patient care barriers and improving care coordination.
              </Text>
              <Text
                size="md"
                mb={8}
                style={{
                  color: "#0f172a",
                  textAlign: "left",
                  lineHeight: 1.7,
                  background: "rgba(236, 245, 255, 0.5)",
                  borderRadius: 8,
                  padding: "12px 18px",
                  marginBottom: 12,
                }}
              >
                The dashboard is powered by three registries:
                <br />
                <span style={{ color: "#0ea5e9", fontWeight: 600 }}>
                  • Payer to Payer Consent Registry:
                </span>{" "}
                <span style={{ color: "#334155" }}>
                  The source of truth for patient consent, accessible via API
                  for payers to retrieve the latest consent value.
                </span>
                <br />
                <span style={{ color: "#0ea5e9", fontWeight: 600 }}>
                  • Prior Payers Registry:
                </span>{" "}
                <span style={{ color: "#334155" }}>
                  Contains past care records and consent values, sourced from
                  Managed Care Organizations (MCOs).
                </span>
                <br />
                <span style={{ color: "#0ea5e9", fontWeight: 600 }}>
                  • Payer FHIR Endpoint Registry:
                </span>{" "}
                <span style={{ color: "#334155" }}>
                  Lists all known FHIR endpoints for payers, enabling
                  programmatic data exchange.
                </span>
              </Text>
              <Text
                size="md"
                style={{
                  color: "#334155",
                  textAlign: "left",
                  lineHeight: 1.7,
                  marginTop: 8,
                }}
              >
                Use the dashboard below to explore how consent data, prior payer
                history, and FHIR endpoints can be accessed and visualized for
                patients in New York State. This interface is designed to tell
                the story of how these registries work together to support
                seamless, secure, and patient-centered health information
                exchange.
              </Text>
            </Paper>

            <Paper
              shadow="md"
              p="md"
              mb="md"
              radius="md"
              withBorder
              style={{ background: "#f1f5f9" }}
            >
              <Group gap="xs" align="center" mb="sm">
                <ThemeIcon color="indigo" size={32} radius="xl" variant="light">
                  <IconUsers size={20} />
                </ThemeIcon>
                <Text fw={700} size="lg" c="indigo.8">
                  Select a patient to begin:
                </Text>
              </Group>
              <Select
                data={patients}
                value={selectedPatient}
                onChange={setSelectedPatient}
                placeholder="Choose patient"
                aria-label="Patient selector"
                size="md"
                searchable
                styles={{ dropdown: { zIndex: 9999 } }}
              />
              {selectedPatient && (
                <>
                  <PatientDemographicsCard
                    patient={patients.find((p) => p.value === selectedPatient)}
                  />
                  <PatientStoryCard
                    patient={patients.find((p) => p.value === selectedPatient)}
                  />
                  <Space h="md" />
                  <Group mt="md" gap="md" justify="center">
                    <Button
                      leftSection={<IconFileText size={18} />}
                      onClick={() => handleAction("get-consent")}
                      color="blue"
                      variant="gradient"
                      gradient={{ from: "blue", to: "teal", deg: 90 }}
                      radius="xl"
                      size="md"
                      style={{ minWidth: 180 }}
                    >
                      Get Current Consent
                    </Button>
                    <Button
                      leftSection={<IconHistory size={18} />}
                      onClick={() => handleAction("get-prior-payers")}
                      color="grape"
                      variant="gradient"
                      gradient={{ from: "grape", to: "indigo", deg: 90 }}
                      radius="xl"
                      size="md"
                      style={{ minWidth: 180 }}
                    >
                      Get Prior Payers
                    </Button>
                    <Button
                      leftSection={<IconApi size={18} />}
                      onClick={() => handleAction("get-fhir-endpoints")}
                      color="teal"
                      variant="gradient"
                      gradient={{ from: "teal", to: "cyan", deg: 90 }}
                      radius="xl"
                      size="md"
                      style={{ minWidth: 180 }}
                    >
                      Get FHIR Endpoints
                    </Button>
                  </Group>
                </>
              )}
            </Paper>

            {loading && <Loader size="lg" />}
            {!loading &&
              result &&
              resultType === "get-consent" &&
              formatConsent(result)}
            {!loading &&
              result &&
              resultType === "get-prior-payers" &&
              formatPriorPayers(result)}
            {!loading &&
              result &&
              resultType === "get-fhir-endpoints" &&
              formatFhirEndpoints(result)}
            {!loading && result && result.error && (
              <Alert
                icon={<IconAlertCircle size={18} />}
                title="Error"
                color="red"
                mt="md"
              >
                {result.error}
              </Alert>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="technical">
            <TechnicalDetails />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  );
}

export default PatientDashboard;
