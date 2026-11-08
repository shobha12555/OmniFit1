# 📊 BhumiCheck — Architecture Diagrams

All diagrams use [Mermaid](https://mermaid.js.org) syntax and render natively on GitHub.
Export to PNG/SVG at [mermaid.live](https://mermaid.live).

---

## 1. 🏗️ Master System Architecture

```mermaid
flowchart TD
    classDef client fill:#10b981,color:#fff,stroke:#059669
    classDef gateway fill:#3b82f6,color:#fff,stroke:#2563eb
    classDef service fill:#8b5cf6,color:#fff,stroke:#7c3aed
    classDef data fill:#f59e0b,color:#fff,stroke:#d97706
    classDef external fill:#ef4444,color:#fff,stroke:#dc2626

    subgraph CLIENT["🖥️ Client Tier"]
        PWA["📱 PWA / React App"]
        MOBILE["📲 Android / iOS App"]
        KIOSK["🖥️ Panchayat Kiosk"]
    end

    subgraph GATEWAY["🔀 API Gateway & CDN"]
        CDN["☁️ Cloudflare CDN"]
        APIGW["🔀 API Gateway\n(Kong / AWS API GW)"]
        AUTH["🔐 Auth Service\n(JWT + OTP)"]
        RATELIMIT["🚦 Rate Limiter"]
    end

    subgraph SERVICES["⚙️ Microservices"]
        LAND_SVC["📋 Land Record Service"]
        AI_SVC["🤖 Hybrid AI Service"]
        GPS_SVC["📐 GPS Demarcation Service"]
        RISK_SVC["⚠️ Risk Assessment Service"]
        BATWARA_SVC["🤝 Batwara Division Service"]
        I18N_SVC["🌐 i18n / Translation Service"]
        NOTIFY_SVC["🔔 Notification Service"]
        REPORT_SVC["📄 Report Generation Service"]
    end

    subgraph DATA["🗄️ Data Tier"]
        POSTGRES["🐘 PostgreSQL\n(Primary)"]
        REDIS["⚡ Redis Cache"]
        VECTOR_DB["🔍 Vector DB\n(pgvector / Pinecone)"]
        TIMESCALE["📈 TimescaleDB\n(GPS / audit)"]
        S3["📦 Object Store\n(Reports / KML)"]
    end

    subgraph EXTERNAL["🌐 External Sources"]
        BHULEKH["🏛️ UP Bhulekh Portal"]
        ECOURTS["⚖️ eCourts API"]
        CERSAI["🏦 CERSAI (Lien DB)"]
        ISRO["🛰️ ISRO Bhuvan / Cadastral"]
        BHASHINI["🗣️ Bhashini API"]
        GEMINI["🤖 Google Gemini"]
        CLAUDE["🤖 Anthropic Claude"]
    end

    CLIENT --> CDN
    CDN --> APIGW
    APIGW --> AUTH
    APIGW --> RATELIMIT
    APIGW --> SERVICES

    LAND_SVC --> POSTGRES
    LAND_SVC --> REDIS
    LAND_SVC --> BHULEKH

    AI_SVC --> VECTOR_DB
    AI_SVC --> GEMINI
    AI_SVC --> CLAUDE

    GPS_SVC --> ISRO
    GPS_SVC --> TIMESCALE

    RISK_SVC --> ECOURTS
    RISK_SVC --> CERSAI
    RISK_SVC --> POSTGRES

    I18N_SVC --> BHASHINI
    REPORT_SVC --> S3

    NOTIFY_SVC --> EXTERNAL

    class PWA,MOBILE,KIOSK client
    class CDN,APIGW,AUTH,RATELIMIT gateway
    class LAND_SVC,AI_SVC,GPS_SVC,RISK_SVC,BATWARA_SVC,I18N_SVC,NOTIFY_SVC,REPORT_SVC service
    class POSTGRES,REDIS,VECTOR_DB,TIMESCALE,S3 data
    class BHULEKH,ECOURTS,CERSAI,ISRO,BHASHINI,GEMINI,CLAUDE external
```

---

## 2. 🤖 Hybrid AI Engine Flow

```mermaid
flowchart LR
    classDef input fill:#10b981,color:#fff,stroke:#059669
    classDef process fill:#3b82f6,color:#fff,stroke:#2563eb
    classDef decision fill:#f59e0b,color:#fff,stroke:#d97706
    classDef ai fill:#8b5cf6,color:#fff,stroke:#7c3aed
    classDef output fill:#ef4444,color:#fff,stroke:#dc2626

    Q["❓ User Query\n(Text / Voice)"]
    PRE["🔄 Preprocessor\n(Language detect,\nentity extraction)"]
    RAG["📚 RAG Pipeline\n(Vector similarity\nsearch)"]
    CONF{"🎯 Confidence\nScore ≥ 0.8?"}
    GEMINI["⚡ Gemini Flash\n(Fast response)"]
    GEMINI_OUT{"✅ Gemini\nConfident?"}
    CLAUDE["🧠 Claude Opus\n(Deep reasoning)"]
    CROSS{"🔀 Cross-validate\n(Both agree?)"}
    FALLBACK["📖 Static KB\n(Revenue Code 2006)"]
    ANSWER["✅ Verified Answer\n+ Source citations"]
    DISCLAIMER["⚠️ Uncertainty\nDisclaimer added"]

    Q --> PRE
    PRE --> RAG
    RAG --> CONF

    CONF -->|"Yes"| GEMINI
    CONF -->|"No"| CLAUDE

    GEMINI --> GEMINI_OUT
    GEMINI_OUT -->|"Yes"| CROSS
    GEMINI_OUT -->|"No"| CLAUDE

    CLAUDE --> CROSS
    CROSS -->|"Agree"| ANSWER
    CROSS -->|"Disagree"| FALLBACK
    FALLBACK --> DISCLAIMER
    DISCLAIMER --> ANSWER

    class Q input
    class PRE,RAG process
    class CONF,GEMINI_OUT,CROSS decision
    class GEMINI,CLAUDE ai
    class ANSWER,DISCLAIMER output
```

---

## 3. 🗺️ User Journey Flowchart

```mermaid
flowchart TD
    classDef start fill:#10b981,color:#fff,stroke:#059669
    classDef action fill:#3b82f6,color:#fff,stroke:#2563eb
    classDef decision fill:#f59e0b,color:#fff,stroke:#d97706
    classDef result fill:#8b5cf6,color:#fff,stroke:#7c3aed
    classDef end fill:#ef4444,color:#fff,stroke:#dc2626

    OPEN["📱 Open BhumiCheck App"]
    LANG{"🌐 First Visit?"}
    SELECT_LANG["🗣️ Select Language\n(Hindi / Regional)"]
    ONBOARD["👋 Quick Onboarding\n(3 icon-steps)"]
    HOME["🏠 Home Screen"]
    VOICE{"🎤 Voice or\nText Input?"}
    VOICE_IN["🎙️ Speak: 'भूमि जांचो'"]
    TEXT_IN["⌨️ Enter District →\nTehsil → Village → Khata"]
    SEARCH["🔍 Search Initiated"]
    FOUND{"📋 Record\nFound?"}
    SHOW_RECORD["📄 Display Record\n(Owner, Area, Type)"]
    RISK["⚠️ Risk Assessment\n(Lien / Dispute / Encumbrance)"]
    RISK_HIGH{"🔴 High Risk?"}
    WARN["🚨 Warning Screen\n+ AI explanation"]
    MAP["🗺️ View on Map\n(Cadastral overlay)"]
    GPS_ASK{"📐 Want GPS\nDemarcation?"}
    GPS["🛰️ Start GPS Survey"]
    COMPARE["📏 Compare Record\nvs Physical Boundary"]
    MISMATCH{"⚡ Boundary\nMismatch?"}
    ALERT["🚨 Mismatch Alert\n+ Report generation"]
    BATWARA_ASK{"🤝 Family\nDivision?"}
    BATWARA["✂️ Batwara Planning\nTool"]
    AI_ASK{"🤖 Legal\nQuestion?"}
    AI["💬 Bhu-Guru AI\nAssistant"]
    DOWNLOAD["📥 Download PDF\nReport"]
    SHARE["📤 Share via\nWhatsApp"]
    NOT_FOUND["❌ Not Found Screen\n+ Helpline number"]

    OPEN --> LANG
    LANG -->|"Yes"| SELECT_LANG
    LANG -->|"No"| HOME
    SELECT_LANG --> ONBOARD
    ONBOARD --> HOME
    HOME --> VOICE
    VOICE -->|"Voice"| VOICE_IN
    VOICE -->|"Text"| TEXT_IN
    VOICE_IN --> SEARCH
    TEXT_IN --> SEARCH
    SEARCH --> FOUND
    FOUND -->|"Yes"| SHOW_RECORD
    FOUND -->|"No"| NOT_FOUND
    SHOW_RECORD --> RISK
    RISK --> RISK_HIGH
    RISK_HIGH -->|"Yes"| WARN
    RISK_HIGH -->|"No"| MAP
    WARN --> MAP
    MAP --> GPS_ASK
    GPS_ASK -->|"Yes"| GPS
    GPS_ASK -->|"No"| BATWARA_ASK
    GPS --> COMPARE
    COMPARE --> MISMATCH
    MISMATCH -->|"Yes"| ALERT
    MISMATCH -->|"No"| BATWARA_ASK
    ALERT --> BATWARA_ASK
    BATWARA_ASK -->|"Yes"| BATWARA
    BATWARA_ASK -->|"No"| AI_ASK
    BATWARA --> AI_ASK
    AI_ASK -->|"Yes"| AI
    AI_ASK -->|"No"| DOWNLOAD
    AI --> DOWNLOAD
    DOWNLOAD --> SHARE

    class OPEN start
    class SELECT_LANG,ONBOARD,TEXT_IN,VOICE_IN,SEARCH,SHOW_RECORD,MAP,GPS,COMPARE,BATWARA,AI,DOWNLOAD,SHARE action
    class LANG,VOICE,FOUND,RISK_HIGH,GPS_ASK,MISMATCH,BATWARA_ASK,AI_ASK decision
    class RISK,WARN,ALERT result
    class NOT_FOUND end
```

---

## 4. 🌐 Multi-Language System

```mermaid
flowchart LR
    classDef detect fill:#10b981,color:#fff,stroke:#059669
    classDef store fill:#3b82f6,color:#fff,stroke:#2563eb
    classDef process fill:#8b5cf6,color:#fff,stroke:#7c3aed
    classDef output fill:#f59e0b,color:#fff,stroke:#d97706

    subgraph DETECT["🔍 Language Detection"]
        GPS_LOC["📍 GPS Location\n→ State detection"]
        DEVICE["📱 Device Locale\n(navigator.language)"]
        MANUAL["🖐️ Manual Selector\n(22 languages)"]
        HISTORY["📋 User History\n(localStorage)"]
    end

    subgraph STORE["🗄️ i18n Storage"]
        EN["🇬🇧 en.json"]
        HI["🇮🇳 hi.json"]
        TA["🌊 ta.json (Tamil)"]
        BN["🐯 bn.json (Bengali)"]
        TE["📜 te.json (Telugu)"]
        MORE["... 18 more languages"]
    end

    subgraph PROCESS["⚙️ Processing Engine"]
        I18N_ENGINE["🔧 i18n Engine\n(react-i18next)"]
        BHASHINI["🗣️ Bhashini API\n(real-time translation)"]
        TTS["🔊 Text-to-Speech\n(Google TTS)"]
        STT["🎙️ Speech-to-Text\n(Google STT)"]
        FALLBACK_LANG["⚠️ Fallback Chain\n(Regional → Hindi → English)"]
    end

    subgraph OUTPUT["📤 Output"]
        UI_TEXT["📝 UI Text"]
        VOICE_OUT["🔊 Voice Output"]
        RTL["↩️ RTL Layout\n(Urdu / Arabic)"]
        DEVANAGARI["🕉️ Devanagari\nRendering"]
    end

    DETECT --> I18N_ENGINE
    GPS_LOC --> I18N_ENGINE
    DEVICE --> I18N_ENGINE
    MANUAL --> I18N_ENGINE
    HISTORY --> I18N_ENGINE

    STORE --> I18N_ENGINE
    I18N_ENGINE --> PROCESS
    I18N_ENGINE --> BHASHINI
    BHASHINI --> TTS
    TTS --> VOICE_OUT

    STT --> I18N_ENGINE

    I18N_ENGINE --> FALLBACK_LANG
    FALLBACK_LANG --> OUTPUT

    I18N_ENGINE --> UI_TEXT
    I18N_ENGINE --> RTL
    I18N_ENGINE --> DEVANAGARI

    class GPS_LOC,DEVICE,MANUAL,HISTORY detect
    class EN,HI,TA,BN,TE,MORE store
    class I18N_ENGINE,BHASHINI,TTS,STT,FALLBACK_LANG process
    class UI_TEXT,VOICE_OUT,RTL,DEVANAGARI output
```

---

## 5. 📐 GPS Demarcation Flow

```mermaid
flowchart TD
    classDef start fill:#10b981,color:#fff,stroke:#059669
    classDef sensor fill:#3b82f6,color:#fff,stroke:#2563eb
    classDef process fill:#8b5cf6,color:#fff,stroke:#7c3aed
    classDef decision fill:#f59e0b,color:#fff,stroke:#d97706
    classDef output fill:#ef4444,color:#fff,stroke:#dc2626

    START["📐 Start GPS Demarcation"]
    MULTI_GNSS["🛰️ Multi-GNSS Receiver\n(GPS + GLONASS + NavIC)"]
    RAW["📡 Raw NMEA Data\n(Lat, Lon, Alt, HDOP)"]
    KALMAN["🔄 Kalman Filter\n(Noise reduction)"]
    ACCURACY{"🎯 Accuracy\n< 1 meter?"}
    WAIT["⏳ Acquire More\nSatellites"]
    POINT["📍 Record Boundary\nPoint"]
    MORE{"🔄 More\nBoundary Points?"}
    POLYGON["🔷 Generate\nBoundary Polygon"]
    RECORD_FETCH["📋 Fetch Cadastral\nRecord Polygon"]
    OVERLAY["🗺️ Overlay\non Map"]
    DIFF["📏 Compute Area\nDifference"]
    THRESHOLD{"⚠️ Difference\n> 5%?"}
    MISMATCH_ALERT["🚨 Mismatch Alert\n+ Discrepancy area"]
    MATCH_OK["✅ Boundary Verified\n(Matches record)"]
    REPORT["📄 Generate PDF\nDemarcation Report"]
    KML["📁 Export KML\n(for GIS tools)"]
    SHARE_REPORT["📤 Share / Download\nReport"]

    START --> MULTI_GNSS
    MULTI_GNSS --> RAW
    RAW --> KALMAN
    KALMAN --> ACCURACY
    ACCURACY -->|"No"| WAIT
    WAIT --> KALMAN
    ACCURACY -->|"Yes"| POINT
    POINT --> MORE
    MORE -->|"Yes"| MULTI_GNSS
    MORE -->|"No"| POLYGON
    POLYGON --> RECORD_FETCH
    RECORD_FETCH --> OVERLAY
    OVERLAY --> DIFF
    DIFF --> THRESHOLD
    THRESHOLD -->|"Yes"| MISMATCH_ALERT
    THRESHOLD -->|"No"| MATCH_OK
    MISMATCH_ALERT --> REPORT
    MATCH_OK --> REPORT
    REPORT --> KML
    REPORT --> SHARE_REPORT

    class START start
    class MULTI_GNSS,RAW sensor
    class KALMAN,POLYGON,RECORD_FETCH,OVERLAY,DIFF process
    class ACCURACY,MORE,THRESHOLD decision
    class MISMATCH_ALERT,MATCH_OK,REPORT,KML,SHARE_REPORT output
```

---

## 6. 🔄 Data Flow Diagram

```mermaid
flowchart LR
    classDef source fill:#10b981,color:#fff,stroke:#059669
    classDef scraper fill:#3b82f6,color:#fff,stroke:#2563eb
    classDef transform fill:#8b5cf6,color:#fff,stroke:#7c3aed
    classDef store fill:#f59e0b,color:#fff,stroke:#d97706
    classDef serve fill:#ef4444,color:#fff,stroke:#dc2626

    subgraph SOURCES["🌐 Government Data Sources"]
        BHULEKH_SRC["🏛️ UP Bhulekh\n(upbhulekh.gov.in)"]
        CERSAI_SRC["🏦 CERSAI\n(Mortgage registry)"]
        ECOURTS_SRC["⚖️ eCourts\n(Case database)"]
        BHUVAN_SRC["🛰️ ISRO Bhuvan\n(Cadastral maps)"]
        DILRMP_SRC["🗂️ DILRMP API\n(Central registry)"]
    end

    subgraph SCRAPER["🤖 Data Acquisition"]
        SCRAPER_ENGINE["🕷️ Scraper Orchestrator\n(Playwright + Puppeteer)"]
        API_ADAPTER["🔌 API Adapters\n(REST / SOAP / GraphQL)"]
        QUEUE["📋 Job Queue\n(Bull / Redis)"]
    end

    subgraph TRANSFORM["⚙️ ETL Pipeline"]
        VALIDATOR["✅ Data Validator\n(Schema checks)"]
        NORMALIZER["🔄 Normalizer\n(Devanagari → Unicode)"]
        GEOCODER["🗺️ Geocoder\n(Address → Lat/Lon)"]
        EMBEDDER["🧬 Embedder\n(Text → Vectors)"]
    end

    subgraph STORE["🗄️ Data Storage"]
        PRIMARY_DB["🐘 PostgreSQL\n(Structured records)"]
        VECTOR_STORE["🔍 Vector Store\n(AI knowledge base)"]
        CACHE["⚡ Redis Cache\n(Hot data)"]
        OBJECT_STORE["📦 S3\n(Maps, reports)"]
    end

    subgraph SERVE["📤 Serving Layer"]
        REST_API["🔌 REST API\n(Land records)"]
        AI_API["🤖 AI Inference API\n(Gemini + Claude)"]
        STREAM_API["⚡ WebSocket\n(GPS live stream)"]
    end

    SOURCES --> SCRAPER_ENGINE
    SCRAPER_ENGINE --> API_ADAPTER
    API_ADAPTER --> QUEUE
    QUEUE --> VALIDATOR
    VALIDATOR --> NORMALIZER
    NORMALIZER --> GEOCODER
    GEOCODER --> EMBEDDER
    EMBEDDER --> PRIMARY_DB
    EMBEDDER --> VECTOR_STORE
    PRIMARY_DB --> CACHE
    CACHE --> REST_API
    VECTOR_STORE --> AI_API
    PRIMARY_DB --> STREAM_API

    class BHULEKH_SRC,CERSAI_SRC,ECOURTS_SRC,BHUVAN_SRC,DILRMP_SRC source
    class SCRAPER_ENGINE,API_ADAPTER,QUEUE scraper
    class VALIDATOR,NORMALIZER,GEOCODER,EMBEDDER transform
    class PRIMARY_DB,VECTOR_STORE,CACHE,OBJECT_STORE store
    class REST_API,AI_API,STREAM_API serve
```

---

## 7. 🔒 Security Architecture

```mermaid
flowchart TD
    classDef perimeter fill:#ef4444,color:#fff,stroke:#dc2626
    classDef auth fill:#f59e0b,color:#fff,stroke:#d97706
    classDef data fill:#10b981,color:#fff,stroke:#059669
    classDef audit fill:#3b82f6,color:#fff,stroke:#2563eb
    classDef compliance fill:#8b5cf6,color:#fff,stroke:#7c3aed

    subgraph PERIMETER["🛡️ Perimeter Security"]
        WAF["🔥 WAF\n(Web Application Firewall)"]
        DDOS["🚦 DDoS Protection\n(Cloudflare)"]
        TLS["🔐 TLS 1.3\n(End-to-end encryption)"]
    end

    subgraph AUTH_LAYER["🔑 Authentication & Authorization"]
        OTP["📱 OTP / Aadhaar eKYC\n(Login)"]
        JWT["🎫 JWT Tokens\n(15-min expiry)"]
        RBAC["👥 RBAC\n(Citizen / Surveyor / Officer)"]
        MFA["🔐 MFA\n(OTP + Biometric)"]
    end

    subgraph DATA_SEC["🔒 Data Security"]
        AES["🔑 AES-256 at Rest\n(Database encryption)"]
        FIELD_ENC["🏷️ Field-level Encryption\n(Aadhaar / Mobile)"]
        MASKING["🎭 Data Masking\n(PII in logs)"]
        ANON["🕵️ Anonymization\n(Analytics data)"]
    end

    subgraph AUDIT_LAYER["📋 Audit & Monitoring"]
        AUDIT_LOG["📜 Immutable Audit Log\n(Every data access)"]
        SIEM["👁️ SIEM\n(Splunk / ELK)"]
        INTRUSION["🚨 IDS / IPS\n(Intrusion detection)"]
        ALERTS["🔔 Real-time Alerts\n(PagerDuty)"]
    end

    subgraph COMPLIANCE["📋 Compliance"]
        DPDP["🇮🇳 DPDP Act 2023\n(Data Principal rights)"]
        IT_ACT["⚖️ IT Act 2000\n(Sec 43A)"]
        MEITY["🏛️ MeitY Guidelines\n(Cloud policy)"]
        ISO["🌐 ISO 27001\n(ISMS)"]
    end

    PERIMETER --> AUTH_LAYER
    AUTH_LAYER --> DATA_SEC
    DATA_SEC --> AUDIT_LAYER
    AUDIT_LAYER --> COMPLIANCE

    WAF --> OTP
    DDOS --> JWT
    TLS --> RBAC

    class WAF,DDOS,TLS perimeter
    class OTP,JWT,RBAC,MFA auth
    class AES,FIELD_ENC,MASKING,ANON data
    class AUDIT_LOG,SIEM,INTRUSION,ALERTS audit
    class DPDP,IT_ACT,MEITY,ISO compliance
```

---

## 8. 🚀 Deployment Topology

```mermaid
flowchart TD
    classDef user fill:#10b981,color:#fff,stroke:#059669
    classDef cdn fill:#3b82f6,color:#fff,stroke:#2563eb
    classDef k8s fill:#8b5cf6,color:#fff,stroke:#7c3aed
    classDef data fill:#f59e0b,color:#fff,stroke:#d97706
    classDef infra fill:#ef4444,color:#fff,stroke:#dc2626

    USER["👤 User\n(Mobile / Desktop)"]

    subgraph CDN_LAYER["☁️ CDN Layer"]
        CF["☁️ Cloudflare\n(Global CDN + DDoS)"]
        STATIC["📦 Static Assets\n(S3 + CloudFront)"]
    end

    subgraph K8S["⚙️ Kubernetes Cluster\n(AWS Mumbai / GCP Mumbai)"]
        INGRESS["🔀 Nginx Ingress\n(Load balancer)"]

        subgraph PODS["🟢 Application Pods"]
            API_POD["🔌 API Pods (x3)"]
            AI_POD["🤖 AI Pods (x2)"]
            GPS_POD["📐 GPS Pods (x2)"]
            WORKER_POD["⚙️ Worker Pods (x5)"]
        end

        HPA["📈 HPA\n(Horizontal Pod Autoscaler)"]
    end

    subgraph DATA_LAYER["🗄️ Data Layer\n(Multi-AZ)"]
        PG_PRIMARY["🐘 PostgreSQL\nPrimary (Mumbai)"]
        PG_REPLICA["🐘 PostgreSQL\nReplica (Chennai)"]
        REDIS_CLUSTER["⚡ Redis Cluster\n(3-node)"]
        VECTOR["🔍 Pinecone / pgvector"]
    end

    subgraph INFRA["🛠️ Infrastructure"]
        TERRAFORM["🏗️ Terraform\n(IaC)"]
        GITHUB_ACTIONS["⚡ GitHub Actions\n(CI/CD)"]
        DATADOG["📊 Datadog\n(Monitoring)"]
        SENTRY["🐛 Sentry\n(Error tracking)"]
    end

    USER --> CF
    CF --> STATIC
    CF --> INGRESS
    INGRESS --> PODS
    HPA --> PODS
    PODS --> DATA_LAYER
    INFRA --> K8S

    PG_PRIMARY --> PG_REPLICA

    class USER user
    class CF,STATIC cdn
    class INGRESS,API_POD,AI_POD,GPS_POD,WORKER_POD,HPA k8s
    class PG_PRIMARY,PG_REPLICA,REDIS_CLUSTER,VECTOR data
    class TERRAFORM,GITHUB_ACTIONS,DATADOG,SENTRY infra
```

---

## 9. 🔗 Microservice Dependency Graph

```mermaid
flowchart LR
    classDef core fill:#10b981,color:#fff,stroke:#059669
    classDef support fill:#3b82f6,color:#fff,stroke:#2563eb
    classDef external fill:#8b5cf6,color:#fff,stroke:#7c3aed
    classDef infra fill:#f59e0b,color:#fff,stroke:#d97706

    GATEWAY["🔀 API Gateway"]

    LAND["📋 Land Record\nService"]
    AI["🤖 AI Service"]
    GPS["📐 GPS Service"]
    RISK["⚠️ Risk Service"]
    BATWARA["🤝 Batwara Service"]
    REPORT["📄 Report Service"]
    NOTIFY["🔔 Notify Service"]
    I18N["🌐 i18n Service"]
    AUTH["🔐 Auth Service"]

    POSTGRES["🐘 PostgreSQL"]
    REDIS["⚡ Redis"]
    VECTOR_DB["🔍 Vector DB"]
    OBJECT_S3["📦 S3"]
    EVENT_BUS["📨 Event Bus\n(Kafka)"]

    GATEWAY --> AUTH
    GATEWAY --> LAND
    GATEWAY --> AI
    GATEWAY --> GPS
    GATEWAY --> RISK
    GATEWAY --> BATWARA
    GATEWAY --> I18N

    LAND --> POSTGRES
    LAND --> REDIS
    LAND --> EVENT_BUS

    RISK --> LAND
    RISK --> POSTGRES

    AI --> VECTOR_DB
    AI --> LAND

    GPS --> POSTGRES
    GPS --> OBJECT_S3

    BATWARA --> LAND
    BATWARA --> GPS

    REPORT --> LAND
    REPORT --> RISK
    REPORT --> GPS
    REPORT --> OBJECT_S3

    NOTIFY --> EVENT_BUS

    EVENT_BUS --> NOTIFY
    EVENT_BUS --> REPORT

    class LAND,AI,GPS,RISK,BATWARA core
    class REPORT,NOTIFY,I18N,AUTH support
    class POSTGRES,REDIS,VECTOR_DB,OBJECT_S3,EVENT_BUS infra
```

---

## 10. 💳 Monetization & Subscription Flow

```mermaid
flowchart TD
    classDef free fill:#10b981,color:#fff,stroke:#059669
    classDef pro fill:#3b82f6,color:#fff,stroke:#2563eb
    classDef surveyor fill:#8b5cf6,color:#fff,stroke:#7c3aed
    classDef enterprise fill:#f59e0b,color:#fff,stroke:#d97706
    classDef payment fill:#ef4444,color:#fff,stroke:#dc2626

    USER["👤 New User"]

    subgraph FREE_TIER["🌾 Free Tier (₹0)"]
        F1["📋 5 searches/day"]
        F2["📖 Basic land record"]
        F3["🗣️ Hindi + English only"]
        F4["💬 Basic AI chat (10/day)"]
    end

    subgraph PRO_TIER["⭐ Pro Tier (₹99/month)"]
        P1["🔍 Unlimited search"]
        P2["🏦 Bank lien check"]
        P3["⚖️ Court dispute"]
        P4["🤖 Full AI assistant"]
        P5["📄 PDF reports"]
        P6["🤝 Batwara tool"]
        P7["🗺️ 3 states"]
    end

    subgraph SURVEYOR_TIER["🔭 Surveyor (₹499/month)"]
        S1["⬆️ Everything in Pro"]
        S2["📐 GPS demarcation"]
        S3["📁 KML export"]
        S4["📊 10 reports/day"]
        S5["🗺️ All states"]
        S6["🤝 Priority support"]
    end

    subgraph ENTERPRISE["🏢 Enterprise (Custom)"]
        E1["🔌 White-label API"]
        E2["📊 Bulk processing"]
        E3["⚙️ Custom SLA"]
        E4["🏠 On-premise option"]
        E5["👤 RBAC & audit"]
        E6["🤝 Dedicated manager"]
    end

    RAZORPAY["💳 Razorpay\n(Payment gateway)"]
    UPI["📱 UPI / QR"]
    INVOICE["📋 GST Invoice\n(Auto-generated)"]
    WEBHOOK["🔔 Webhook\n(Subscription events)"]

    USER --> FREE_TIER
    FREE_TIER -->|"Upgrade"| RAZORPAY
    RAZORPAY --> UPI
    RAZORPAY --> PRO_TIER
    RAZORPAY --> SURVEYOR_TIER
    RAZORPAY --> ENTERPRISE
    RAZORPAY --> INVOICE
    RAZORPAY --> WEBHOOK

    class F1,F2,F3,F4 free
    class P1,P2,P3,P4,P5,P6,P7 pro
    class S1,S2,S3,S4,S5,S6 surveyor
    class E1,E2,E3,E4,E5,E6 enterprise
    class RAZORPAY,UPI,INVOICE,WEBHOOK payment
```

---

## 11. 🕷️ Scraper Orchestration Flow

```mermaid
flowchart TD
    classDef trigger fill:#10b981,color:#fff,stroke:#059669
    classDef orchestrator fill:#3b82f6,color:#fff,stroke:#2563eb
    classDef worker fill:#8b5cf6,color:#fff,stroke:#7c3aed
    classDef store fill:#f59e0b,color:#fff,stroke:#d97706
    classDef monitor fill:#ef4444,color:#fff,stroke:#dc2626

    CRON["⏰ Cron Scheduler\n(Daily / Weekly)"]
    WEBHOOK_TRIGGER["🔔 Webhook Trigger\n(On demand)"]

    ORCHESTRATOR["🎯 Scraper Orchestrator\n(Bull Queue + Redis)"]

    subgraph WORKERS["⚙️ Worker Pods"]
        W_BHULEKH["🏛️ UP Bhulekh\nWorker"]
        W_CERSAI["🏦 CERSAI\nWorker"]
        W_ECOURTS["⚖️ eCourts\nWorker"]
        W_BHUVAN["🛰️ Bhuvan\nWorker"]
        W_STATE["🗺️ State Portal\nWorkers (28+)"]
    end

    VALIDATOR["✅ Data Validator"]
    DEDUP["🔄 Deduplication\nEngine"]
    ETL["⚙️ ETL Transform"]

    DB["🐘 PostgreSQL"]
    VECTOR["🔍 Vector Store"]
    CACHE_INVALIDATE["♻️ Cache Invalidation\n(Redis)"]

    MONITOR["📊 Monitoring\n(Datadog)"]
    ALERT["🚨 Alert\n(PagerDuty)"]
    RETRY["🔄 Retry Logic\n(Exponential backoff)"]

    CRON --> ORCHESTRATOR
    WEBHOOK_TRIGGER --> ORCHESTRATOR
    ORCHESTRATOR --> WORKERS
    WORKERS --> VALIDATOR
    VALIDATOR --> DEDUP
    DEDUP --> ETL
    ETL --> DB
    ETL --> VECTOR
    DB --> CACHE_INVALIDATE
    WORKERS --> MONITOR
    MONITOR --> ALERT
    WORKERS --> RETRY

    class CRON,WEBHOOK_TRIGGER trigger
    class ORCHESTRATOR orchestrator
    class W_BHULEKH,W_CERSAI,W_ECOURTS,W_BHUVAN,W_STATE worker
    class DB,VECTOR,CACHE_INVALIDATE store
    class MONITOR,ALERT,RETRY monitor
```

---

## 12. 🧠 RAG Pipeline Detail

```mermaid
flowchart LR
    classDef input fill:#10b981,color:#fff,stroke:#059669
    classDef embed fill:#3b82f6,color:#fff,stroke:#2563eb
    classDef retrieve fill:#8b5cf6,color:#fff,stroke:#7c3aed
    classDef generate fill:#f59e0b,color:#fff,stroke:#d97706
    classDef output fill:#ef4444,color:#fff,stroke:#dc2626

    subgraph INDEXING["📚 Indexing (Offline)"]
        DOCS["📄 Source Documents\n(Revenue Code, Acts,\nCourt Judgments)"]
        CHUNKER["✂️ Text Chunker\n(512 token chunks)"]
        EMBED_MODEL["🧬 Embedding Model\n(text-embedding-004)"]
        VECTOR_INDEX["🔍 Vector Index\n(pgvector / Pinecone)"]
    end

    subgraph RETRIEVAL["🔍 Retrieval (Online)"]
        QUERY["❓ User Query"]
        QUERY_EMBED["🧬 Query Embedding\n(same model)"]
        SIMILARITY["📏 Similarity Search\n(cosine distance, top-5)"]
        RERANK["🏆 Cross-encoder\nReranker"]
        CONTEXT["📋 Relevant Context\n(top-3 chunks)"]
    end

    subgraph GENERATION["✍️ Generation"]
        PROMPT["📝 Prompt Builder\n(Context + Query + System)"]
        LLM["🤖 LLM\n(Gemini / Claude)"]
        POSTPROCESS["🔄 Post-processor\n(Citation extraction,\nLanguage formatting)"]
    end

    RESPONSE["✅ Grounded Response\n+ Source citations"]

    DOCS --> CHUNKER
    CHUNKER --> EMBED_MODEL
    EMBED_MODEL --> VECTOR_INDEX

    QUERY --> QUERY_EMBED
    QUERY_EMBED --> SIMILARITY
    SIMILARITY --> VECTOR_INDEX
    VECTOR_INDEX --> RERANK
    RERANK --> CONTEXT

    CONTEXT --> PROMPT
    QUERY --> PROMPT
    PROMPT --> LLM
    LLM --> POSTPROCESS
    POSTPROCESS --> RESPONSE

    class DOCS,CHUNKER,EMBED_MODEL,VECTOR_INDEX input
    class QUERY,QUERY_EMBED,SIMILARITY,RERANK,CONTEXT retrieve
    class PROMPT,LLM,POSTPROCESS generate
    class RESPONSE output
```

---

## 13. ⚡ CI/CD Pipeline

```mermaid
flowchart LR
    classDef dev fill:#10b981,color:#fff,stroke:#059669
    classDef ci fill:#3b82f6,color:#fff,stroke:#2563eb
    classDef test fill:#8b5cf6,color:#fff,stroke:#7c3aed
    classDef deploy fill:#f59e0b,color:#fff,stroke:#d97706
    classDef monitor fill:#ef4444,color:#fff,stroke:#dc2626

    DEV["👨‍💻 Developer\nPush to branch"]
    PR["🔀 Pull Request\nOpened"]

    subgraph CI["⚙️ CI Pipeline (GitHub Actions)"]
        LINT["🔍 Lint\n(ESLint + Prettier)"]
        TYPE["📝 Type Check\n(tsc --noEmit)"]
        TEST["🧪 Unit Tests\n(Vitest)"]
        BUILD["🏗️ Build\n(Vite)"]
        SECURITY["🔒 Security Scan\n(Snyk + CodeQL)"]
        DOCKER["🐳 Docker Build\n+ Push to ECR"]
    end

    subgraph STAGING["🔬 Staging Deployment"]
        HELM_STAGING["⛵ Helm Deploy\n(staging namespace)"]
        SMOKE["💨 Smoke Tests\n(Playwright)"]
        PERF["📊 Performance\n(Lighthouse CI)"]
    end

    subgraph PROD["🚀 Production Deployment"]
        APPROVAL["👍 Manual Approval\n(Senior Engineer)"]
        HELM_PROD["⛵ Helm Deploy\n(Blue-Green)"]
        HEALTH["❤️ Health Check\n(3-minute window)"]
        ROLLBACK["↩️ Auto-rollback\n(on failure)"]
    end

    subgraph MONITOR_LAYER["📊 Post-Deploy Monitoring"]
        DATADOG["📈 Datadog\n(Metrics)"]
        SENTRY["🐛 Sentry\n(Errors)"]
        PAGER["🔔 PagerDuty\n(Alerts)"]
    end

    DEV --> PR
    PR --> LINT
    LINT --> TYPE
    TYPE --> TEST
    TEST --> BUILD
    BUILD --> SECURITY
    SECURITY --> DOCKER
    DOCKER --> HELM_STAGING
    HELM_STAGING --> SMOKE
    SMOKE --> PERF
    PERF --> APPROVAL
    APPROVAL --> HELM_PROD
    HELM_PROD --> HEALTH
    HEALTH -->|"Healthy"| MONITOR_LAYER
    HEALTH -->|"Unhealthy"| ROLLBACK

    class DEV,PR dev
    class LINT,TYPE,TEST,BUILD,SECURITY,DOCKER ci
    class HELM_STAGING,SMOKE,PERF test
    class APPROVAL,HELM_PROD,HEALTH,ROLLBACK deploy
    class DATADOG,SENTRY,PAGER monitor
```

---

## 14. 🗃️ Database ER Diagram

```mermaid
erDiagram
    DISTRICT {
        uuid id PK
        string name_en
        string name_hi
        string state_code
        float lat
        float lon
        timestamp created_at
    }

    TEHSIL {
        uuid id PK
        uuid district_id FK
        string name_en
        string name_hi
    }

    VILLAGE {
        uuid id PK
        uuid tehsil_id FK
        string name_en
        string name_hi
        string revenue_circle
    }

    LAND_RECORD {
        uuid id PK
        uuid village_id FK
        string khata_number
        string gata_number
        string owner_name_hi
        float area_hectare
        string land_type
        string land_use
        int risk_score
        jsonb raw_data
        timestamp last_mutation_date
        timestamp fetched_at
        timestamp updated_at
    }

    OWNER {
        uuid id PK
        string name_hi
        string name_en
        string aadhaar_hash
        string mobile_hash
        timestamp created_at
    }

    LAND_OWNER {
        uuid land_id FK
        uuid owner_id FK
        float share_percent
        string patta_type
    }

    LIEN {
        uuid id PK
        uuid land_id FK
        string bank_name
        float amount
        date lien_date
        date expiry_date
        string cersai_id
    }

    COURT_CASE {
        uuid id PK
        uuid land_id FK
        string case_number
        string court_name
        string case_type
        string status
        date filing_date
        date last_hearing
    }

    GPS_SURVEY {
        uuid id PK
        uuid land_id FK
        uuid user_id FK
        geometry boundary_polygon
        float area_computed
        float mismatch_percent
        string accuracy_meters
        timestamp surveyed_at
    }

    USER {
        uuid id PK
        string mobile_hash
        string tier
        string preferred_lang
        string state_code
        timestamp created_at
        timestamp last_login
    }

    AUDIT_LOG {
        uuid id PK
        uuid user_id FK
        uuid land_id FK
        string action
        string ip_address
        timestamp accessed_at
    }

    DISTRICT ||--o{ TEHSIL : has
    TEHSIL ||--o{ VILLAGE : has
    VILLAGE ||--o{ LAND_RECORD : contains
    LAND_RECORD ||--o{ LAND_OWNER : has
    OWNER ||--o{ LAND_OWNER : owns
    LAND_RECORD ||--o{ LIEN : has
    LAND_RECORD ||--o{ COURT_CASE : has
    LAND_RECORD ||--o{ GPS_SURVEY : surveyed_by
    USER ||--o{ GPS_SURVEY : performs
    USER ||--o{ AUDIT_LOG : generates
    LAND_RECORD ||--o{ AUDIT_LOG : accessed_in
```

---

## 15. 🔄 State Machine: Land Record Lifecycle

```mermaid
stateDiagram-v2
    [*] --> RAW_DATA : Scraper fetches from portal

    RAW_DATA --> VALIDATING : ETL pipeline starts
    VALIDATING --> INVALID : Validation fails
    VALIDATING --> NORMALIZED : Validation passes

    INVALID --> RAW_DATA : Retry after fix

    NORMALIZED --> INDEXED : Embedded in vector store
    INDEXED --> ACTIVE : Published to API

    ACTIVE --> MUTATION_PENDING : Owner files mutation request
    MUTATION_PENDING --> UNDER_REVIEW : Revenue officer reviews
    UNDER_REVIEW --> MUTATION_REJECTED : Rejected
    UNDER_REVIEW --> MUTATED : Approved and recorded

    MUTATION_REJECTED --> MUTATION_PENDING : Resubmitted

    MUTATED --> ACTIVE : Updated record published

    ACTIVE --> DISPUTED : Court case filed
    DISPUTED --> STAY_ORDER : Court issues stay
    STAY_ORDER --> DISPUTED : Stay vacated
    DISPUTED --> ACTIVE : Case resolved (no change)
    DISPUTED --> MUTATED : Court orders mutation

    ACTIVE --> LIENED : Bank registers mortgage
    LIENED --> ACTIVE : Lien released

    ACTIVE --> GOVERNMENT_ACQUIRED : Land acquired by government
    GOVERNMENT_ACQUIRED --> [*]

    ACTIVE --> ARCHIVED : Record superseded
    ARCHIVED --> [*]
```

---

*All diagrams render natively on GitHub. Export individual diagrams at [mermaid.live](https://mermaid.live)*

*BhumiCheck — India's Land Intelligence Platform*
