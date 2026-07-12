export const mockUser = {
  id: "u1",
  name: "Sophie Martin",
  email: "sophie@agence-cm.fr",
  avatar: "SM",
  role: "Community Manager Senior",
  plan: "Pro",
};

export const mockClients = [
  {
    id: "c1",
    name: "Maison Blanc",
    sector: "Restauration",
    logo: "MB",
    logoColor: "#F59E0B",
    status: "active",
    networks: ["instagram", "facebook", "tiktok"],
    progress: 78,
    postsThisMonth: 24,
    followers: 12400,
    engagement: 4.2,
    monthlyBudget: 1200,
    nextPost: "2026-07-10T14:00:00",
    description: "Restaurant gastronomique parisien, cuisine française contemporaine.",
    postsInstagram: 8,
    postsLinkedin: 8,
    monthlyPostTarget: 16,
    postsDelivered: 11,
    primaryKpiGoal: "engagement",
    growthTarget: "Atteindre 15 000 abonnés"
  },
  {
    id: "c2",
    name: "TechNova",
    sector: "Technologie",
    logo: "TN",
    logoColor: "#2563EB",
    status: "active",
    networks: ["linkedin", "twitter", "instagram"],
    progress: 91,
    postsThisMonth: 32,
    followers: 8900,
    engagement: 3.8,
    monthlyBudget: 2500,
    nextPost: "2026-07-10T16:30:00",
    description: "Startup SaaS spécialisée en intelligence artificielle B2B.",
    postsInstagram: 10,
    postsLinkedin: 10,
    monthlyPostTarget: 20,
    postsDelivered: 18,
    primaryKpiGoal: "lead_gen",
    growthTarget: "+20% de clics site"
  },
  {
    id: "c3",
    name: "Flore & Co",
    sector: "E-commerce Mode",
    logo: "FC",
    logoColor: "#7C3AED",
    status: "active",
    networks: ["instagram", "pinterest", "tiktok"],
    progress: 65,
    postsThisMonth: 18,
    followers: 34200,
    engagement: 6.1,
    monthlyBudget: 1800,
    nextPost: "2026-07-10T11:00:00",
    description: "Marque de mode éco-responsable, collections capsules.",
    postsInstagram: 8,
    postsLinkedin: 4,
    monthlyPostTarget: 12,
    postsDelivered: 2, // Lagging: 2/12 = 16% (elapsed is 36%)
    primaryKpiGoal: "reach",
    growthTarget: "Gagner 5k abonnés"
  },
  {
    id: "c4",
    name: "Immo Prestige",
    sector: "Immobilier",
    logo: "IP",
    logoColor: "#10B981",
    status: "active",
    networks: ["linkedin", "facebook", "instagram"],
    progress: 82,
    postsThisMonth: 12,
    followers: 5600,
    engagement: 2.9,
    monthlyBudget: 3000,
    nextPost: "2026-07-11T09:00:00",
    description: "Agence immobilière haut de gamme, Paris & Côte d'Azur.",
    postsInstagram: 4,
    postsLinkedin: 4,
    monthlyPostTarget: 8,
    postsDelivered: 5,
    primaryKpiGoal: "employer_branding",
    growthTarget: "Atteindre 8k abonnés"
  },
  {
    id: "c5",
    name: "Vitality Sport",
    sector: "Sport & Santé",
    logo: "VS",
    logoColor: "#EF4444",
    status: "paused",
    networks: ["instagram", "youtube", "tiktok"],
    progress: 45,
    postsThisMonth: 8,
    followers: 22100,
    engagement: 5.4,
    monthlyBudget: 900,
    nextPost: "2026-07-12T08:00:00",
    description: "Équipements sportifs et coaching en ligne.",
    postsInstagram: 8,
    postsLinkedin: 4,
    monthlyPostTarget: 12,
    postsDelivered: 1, // Lagging: 1/12 = 8% (elapsed is 36%)
    primaryKpiGoal: "engagement",
    growthTarget: "+15% engagement"
  },
  {
    id: "c6",
    name: "Évasion Travel",
    sector: "Tourisme",
    logo: "ET",
    logoColor: "#0EA5E9",
    status: "active",
    networks: ["instagram", "facebook", "youtube"],
    progress: 73,
    postsThisMonth: 21,
    followers: 18700,
    engagement: 4.8,
    monthlyBudget: 1500,
    nextPost: "2026-07-10T18:00:00",
    description: "Agence de voyages sur mesure, destinations premium.",
    postsInstagram: 10,
    postsLinkedin: 5,
    monthlyPostTarget: 15,
    postsDelivered: 9,
    primaryKpiGoal: "reach",
    growthTarget: "5k reach / post"
  },
  {
    id: "c7",
    name: "BioNature",
    sector: "Santé & Bien-être",
    logo: "BN",
    logoColor: "#84CC16",
    status: "active",
    networks: ["instagram", "facebook", "pinterest"],
    progress: 88,
    postsThisMonth: 28,
    followers: 9300,
    engagement: 5.9,
    monthlyBudget: 1100,
    nextPost: "2026-07-10T12:00:00",
    description: "Cosmétiques naturels et soins bio certifiés.",
    postsInstagram: 8,
    postsLinkedin: 8,
    monthlyPostTarget: 16,
    postsDelivered: 14,
    primaryKpiGoal: "lead_gen",
    growthTarget: "Atteindre 12k abonnés"
  },
  {
    id: "c8",
    name: "FinEdge",
    sector: "Finance",
    logo: "FE",
    logoColor: "#6366F1",
    status: "review",
    networks: ["linkedin", "twitter"],
    progress: 55,
    postsThisMonth: 9,
    followers: 3400,
    engagement: 2.1,
    monthlyBudget: 4000,
    nextPost: "2026-07-11T10:00:00",
    description: "Conseil en gestion de patrimoine et investissements.",
    postsInstagram: 0,
    postsLinkedin: 10,
    monthlyPostTarget: 10,
    postsDelivered: 3, // Lagging: 3/10 = 30% (elapsed is 36%)
    primaryKpiGoal: "employer_branding",
    growthTarget: "+5% engagement"
  },
];

export const mockStats = {
  totalClients: 8,
  activeClients: 6,
  scheduledPosts: 47,
  publishedPostsMonth: 152,
  avgEngagement: 4.4,
  totalFollowers: 114600,
  monthlyRevenue: 16000,
  pendingInvoices: 3,
  openTasks: 12,
  totalReach: 284000,
};

export const mockEngagementData = [
  { date: "11 Jun", engagement: 3.2, reach: 18000, followers: 112000 },
  { date: "12 Jun", engagement: 3.8, reach: 22000, followers: 112400 },
  { date: "13 Jun", engagement: 4.1, reach: 25000, followers: 112800 },
  { date: "14 Jun", engagement: 3.6, reach: 19000, followers: 113000 },
  { date: "15 Jun", engagement: 5.2, reach: 34000, followers: 113600 },
  { date: "16 Jun", engagement: 4.8, reach: 30000, followers: 113900 },
  { date: "17 Jun", engagement: 4.3, reach: 27000, followers: 114100 },
  { date: "18 Jun", engagement: 3.9, reach: 24000, followers: 114200 },
  { date: "19 Jun", engagement: 4.5, reach: 28000, followers: 114350 },
  { date: "20 Jun", engagement: 5.1, reach: 32000, followers: 114500 },
  { date: "21 Jun", engagement: 6.2, reach: 41000, followers: 114700 },
  { date: "22 Jun", engagement: 5.8, reach: 38000, followers: 114800 },
  { date: "23 Jun", engagement: 4.9, reach: 31000, followers: 114850 },
  { date: "24 Jun", engagement: 4.2, reach: 26000, followers: 114900 },
  { date: "25 Jun", engagement: 3.7, reach: 23000, followers: 114920 },
  { date: "26 Jun", engagement: 4.0, reach: 25000, followers: 114950 },
  { date: "27 Jun", engagement: 4.6, reach: 29000, followers: 115000 },
  { date: "28 Jun", engagement: 5.3, reach: 35000, followers: 115200 },
  { date: "29 Jun", engagement: 5.9, reach: 39000, followers: 115500 },
  { date: "30 Jun", engagement: 6.1, reach: 42000, followers: 115800 },
  { date: "1 Jul", engagement: 5.5, reach: 36000, followers: 116000 },
  { date: "2 Jul", engagement: 4.8, reach: 31000, followers: 116100 },
  { date: "3 Jul", engagement: 4.4, reach: 28000, followers: 116200 },
  { date: "4 Jul", engagement: 5.0, reach: 33000, followers: 116400 },
  { date: "5 Jul", engagement: 5.7, reach: 37000, followers: 116600 },
  { date: "6 Jul", engagement: 6.3, reach: 43000, followers: 116900 },
  { date: "7 Jul", engagement: 5.8, reach: 38000, followers: 117100 },
  { date: "8 Jul", engagement: 4.9, reach: 32000, followers: 117200 },
  { date: "9 Jul", engagement: 4.5, reach: 29000, followers: 117350 },
  { date: "10 Jul", engagement: 4.4, reach: 28000, followers: 117500 },
];

export const mockActivities = [
  { id: "a1", type: "publish", client: "Maison Blanc", content: "Post Instagram publié avec succès", time: "Il y a 12 min", network: "instagram", icon: "check" },
  { id: "a2", type: "schedule", client: "TechNova", content: "3 posts programmés pour la semaine", time: "Il y a 45 min", network: "linkedin", icon: "calendar" },
  { id: "a3", type: "ai", client: "Flore & Co", content: "Calendrier éditorial généré par IA", time: "Il y a 1h", network: "instagram", icon: "sparkles" },
  { id: "a4", type: "alert", client: "Vitality Sport", content: "Taux d'engagement en baisse (-12%)", time: "Il y a 2h", network: "tiktok", icon: "warning" },
  { id: "a5", type: "publish", client: "Évasion Travel", content: "Story Facebook publiée", time: "Il y a 3h", network: "facebook", icon: "check" },
  { id: "a6", type: "report", client: "BioNature", content: "Rapport mensuel juin généré", time: "Il y a 4h", network: "", icon: "file" },
  { id: "a7", type: "schedule", client: "Immo Prestige", content: "Carrousel LinkedIn programmé", time: "Il y a 5h", network: "linkedin", icon: "calendar" },
];

export const mockTodayPosts = [
  { id: "p1", client: "Maison Blanc", clientLogo: "MB", clientColor: "#F59E0B", network: "instagram", format: "Carrousel", time: "14:00", status: "scheduled", caption: "Notre menu estival vous attend ! Réservez votre table..." },
  { id: "p2", client: "BioNature", clientLogo: "BN", clientColor: "#84CC16", network: "facebook", format: "Image", time: "12:00", status: "published", caption: "Découvrez notre nouvelle gamme de soins bio..." },
  { id: "p3", client: "TechNova", clientLogo: "TN", clientColor: "#2563EB", network: "linkedin", format: "Article", time: "16:30", status: "scheduled", caption: "Comment l'IA transforme la relation client en 2026..." },
  { id: "p4", client: "Évasion Travel", clientLogo: "ET", clientColor: "#0EA5E9", network: "instagram", format: "Reel", time: "18:00", status: "scheduled", caption: "Destination Maldives : le voyage dont vous rêvez..." },
  { id: "p5", client: "Flore & Co", clientLogo: "FC", clientColor: "#7C3AED", network: "tiktok", format: "Vidéo", time: "11:00", status: "published", caption: "Nouvelle collection été - En coulisses..." },
];

export const mockAIAlerts = [
  { id: "al1", type: "opportunity", title: "Tendance détectée", message: "Le hashtag #RecettesÉté est en forte hausse. Idéal pour Maison Blanc ce weekend.", priority: "high", client: "Maison Blanc" },
  { id: "al2", type: "warning", title: "Engagement en baisse", message: "Vitality Sport a perdu 12% d'engagement cette semaine. Recommandation : publier des Reels courts.", priority: "medium", client: "Vitality Sport" },
  { id: "al3", type: "suggestion", title: "Meilleur moment", message: "Pour TechNova, les posts LinkedIn le mardi à 8h génèrent 3x plus d'impressions.", priority: "low", client: "TechNova" },
];

export const mockTeamMembers = [
  { id: "t1", name: "Sophie Martin", role: "Community Manager Senior", avatar: "SM", email: "sophie@agence-cm.fr", clients: 4, status: "online" },
  { id: "t2", name: "Lucas Bernard", role: "Content Creator", avatar: "LB", email: "lucas@agence-cm.fr", clients: 3, status: "online" },
  { id: "t3", name: "Emma Rousseau", role: "Social Media Manager", avatar: "ER", email: "emma@agence-cm.fr", clients: 2, status: "away" },
  { id: "t4", name: "Thomas Petit", role: "Graphic Designer", avatar: "TP", email: "thomas@agence-cm.fr", clients: 0, status: "offline" },
  { id: "t5", name: "Camille Durand", role: "Analytics Specialist", avatar: "CD", email: "camille@agence-cm.fr", clients: 1, status: "online" },
];

export const mockInvoices = [
  { id: "inv1", client: "TechNova", amount: 2500, status: "paid", date: "2026-07-01", dueDate: "2026-07-15" },
  { id: "inv2", client: "Immo Prestige", amount: 3000, status: "pending", date: "2026-07-05", dueDate: "2026-07-20" },
  { id: "inv3", client: "Maison Blanc", amount: 1200, status: "pending", date: "2026-07-05", dueDate: "2026-07-20" },
  { id: "inv4", client: "Flore & Co", amount: 1800, status: "overdue", date: "2026-06-01", dueDate: "2026-06-15" },
  { id: "inv5", client: "Évasion Travel", amount: 1500, status: "paid", date: "2026-06-01", dueDate: "2026-06-15" },
  { id: "inv6", client: "BioNature", amount: 1100, status: "paid", date: "2026-06-01", dueDate: "2026-06-15" },
];

export const mockCalendarEvents = [
  { id: "e1", clientId: "c1", client: "Maison Blanc", network: "instagram", format: "Carrousel", title: "Menu été", date: "2026-07-10", time: "14:00", status: "scheduled", color: "#F59E0B" },
  { id: "e2", clientId: "c7", client: "BioNature", network: "facebook", format: "Image", title: "Gamme soins", date: "2026-07-10", time: "12:00", status: "published", color: "#84CC16" },
  { id: "e3", clientId: "c2", client: "TechNova", network: "linkedin", format: "Article", title: "IA & relation client", date: "2026-07-10", time: "16:30", status: "scheduled", color: "#2563EB" },
  { id: "e4", clientId: "c6", client: "Évasion Travel", network: "instagram", format: "Reel", title: "Maldives 2026", date: "2026-07-10", time: "18:00", status: "scheduled", color: "#0EA5E9" },
  { id: "e5", clientId: "c3", client: "Flore & Co", network: "tiktok", format: "Vidéo", title: "Coulisses collection", date: "2026-07-10", time: "11:00", status: "published", color: "#7C3AED" },
  { id: "e6", clientId: "c1", client: "Maison Blanc", network: "instagram", format: "Story", title: "Ambiance restaurant", date: "2026-07-11", time: "12:00", status: "scheduled", color: "#F59E0B" },
  { id: "e7", clientId: "c4", client: "Immo Prestige", network: "linkedin", format: "Carrousel", title: "Bien du mois", date: "2026-07-11", time: "09:00", status: "draft", color: "#10B981" },
  { id: "e8", clientId: "c2", client: "TechNova", network: "twitter", format: "Thread", title: "Veille tech", date: "2026-07-11", time: "08:00", status: "scheduled", color: "#2563EB" },
  { id: "e9", clientId: "c3", client: "Flore & Co", network: "instagram", format: "Carrousel", title: "Lookbook été", date: "2026-07-12", time: "10:00", status: "scheduled", color: "#7C3AED" },
  { id: "e10", clientId: "c6", client: "Évasion Travel", network: "facebook", format: "Image", title: "Promo été -15%", date: "2026-07-12", time: "11:00", status: "draft", color: "#0EA5E9" },
  { id: "e11", clientId: "c7", client: "BioNature", network: "instagram", format: "Reel", title: "Routine soin matinal", date: "2026-07-12", time: "09:00", status: "scheduled", color: "#84CC16" },
  { id: "e12", clientId: "c1", client: "Maison Blanc", network: "tiktok", format: "Vidéo", title: "Chef en cuisine", date: "2026-07-13", time: "18:00", status: "scheduled", color: "#F59E0B" },
  { id: "e13", clientId: "c2", client: "TechNova", network: "linkedin", format: "Article", title: "Cas client réussi", date: "2026-07-14", time: "09:00", status: "draft", color: "#2563EB" },
  { id: "e14", clientId: "c4", client: "Immo Prestige", network: "facebook", format: "Image", title: "Villa Côte d'Azur", date: "2026-07-14", time: "14:00", status: "scheduled", color: "#10B981" },
  { id: "e15", clientId: "c3", client: "Flore & Co", network: "pinterest", format: "Image", title: "Moodboard automne", date: "2026-07-15", time: "10:00", status: "draft", color: "#7C3AED" },
];

export const mockMessages = [
  { id: "m1", from: "Lucas Bernard", fromAvatar: "LB", content: "J'ai terminé les visuels pour Maison Blanc, ils sont dans la bibliothèque.", time: "10:32", unread: true },
  { id: "m2", from: "Emma Rousseau", fromAvatar: "ER", content: "Le rapport mensuel de Flore & Co est prêt à valider.", time: "09:15", unread: true },
  { id: "m3", from: "Thomas Petit", fromAvatar: "TP", content: "Besoin de la charte graphique pour TechNova en HD.", time: "Hier", unread: false },
  { id: "m4", from: "Camille Durand", fromAvatar: "CD", content: "Les stats du mois de juin sont excellentes pour BioNature !", time: "Hier", unread: false },
];

export const networkColors: Record<string, string> = {
  instagram: "#E1306C",
  facebook: "#1877F2",
  linkedin: "#0A66C2",
  tiktok: "#000000",
  twitter: "#1DA1F2",
  youtube: "#FF0000",
  pinterest: "#E60023",
  threads: "#000000",
};

// ── AI Sub-Agents ──────────────────────────────────────────────────────────

export type AIAgentStatus = "active" | "standby" | "working";
export type AIProvider = "openai" | "gemini" | "anthropic" | "mistral";
export type AIAgentKeyStatus = "valid" | "untested" | "expired" | "no_credits";

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  avatarGradient: string;
  status: AIAgentStatus;
  provider: AIProvider;
  model: string;
  systemPrompt: string;
  temperature: number;  // 0.0 → 1.0
  hasCustomKey: boolean;
  keyStatus: AIAgentKeyStatus;
  tasksCompleted: number;
  knowledgeDocs: string[];
}

export interface AgentTask {
  id: string;
  description: string;
  clientName: string;
  status: "queued" | "working" | "done" | "failed";
  createdAt: string;
  result?: string;
}

export const mockAIAgents: AIAgent[] = [
  {
    id: "ai1",
    name: "Alex",
    role: "Copywriter LinkedIn",
    specialty: "Rédaction B2B, LinkedIn Thought Leadership, Threads",
    avatar: "AX",
    avatarGradient: "linear-gradient(135deg, #2563EB, #1D4ED8)",
    status: "standby", // Untested key -> put in standby
    provider: "openai",
    model: "GPT-4o",
    systemPrompt: "Tu es un expert en personal branding B2B sur LinkedIn. Tu rédiges des posts percutants, analytiques et inspirants pour des dirigeants et startups tech. Ton ton est direct, sans jargon creux, avec des données concrètes et des appels à l'action subtils. Tu évites les posts génériques et les listes à puces mécaniques.",
    temperature: 0.65,
    hasCustomKey: true,
    keyStatus: "untested",
    tasksCompleted: 142,
    knowledgeDocs: ["Guide LinkedIn 2026.pdf", "Tonalités client TechNova.pdf"],
  },
  {
    id: "ai2",
    name: "Maya",
    role: "Créatrice Contenu Instagram",
    specialty: "Visuels Instagram, Reels, Storytelling de marque, Mode & Lifestyle",
    avatar: "MY",
    avatarGradient: "linear-gradient(135deg, #EC4899, #A855F7)",
    status: "standby", // Out of credits -> put in standby
    provider: "gemini",
    model: "Gemini 1.5 Pro",
    systemPrompt: "Tu es une directrice artistique et copywriter spécialisée en contenu Instagram pour des marques lifestyle et mode. Tu crées des légendes poétiques, des accroches émotionnelles et des scripts de Reels courts (max 30s). Ton esthétique est minimaliste, ton champ lexical évocateur, tu sais amplifier le désir d'achat sans paraître commercial.",
    temperature: 0.82,
    hasCustomKey: false,
    keyStatus: "no_credits",
    tasksCompleted: 89,
    knowledgeDocs: ["Charte visuelle Flore & Co.pdf"],
  },
  {
    id: "ai3",
    name: "Sam",
    role: "Analyste Performance",
    specialty: "Data Analysis, Rapports d'engagement, Recommandations stratégiques",
    avatar: "SM",
    avatarGradient: "linear-gradient(135deg, #0EA5E9, #0284C7)",
    status: "working", // Valid key -> currently running task
    provider: "anthropic",
    model: "Claude 3.5 Sonnet",
    systemPrompt: "Tu es un analyste data senior spécialisé en social media analytics. Tu interprètes les métriques d'engagement (taux, reach, conversions) et produis des rapports structurés avec des insights actionnables. Tu expliques les tendances simplement, tu identifies les contenus sur- et sous-performants, et tu formules des recommandations chiffrées et priorisées.",
    temperature: 0.2,
    hasCustomKey: true,
    keyStatus: "valid",
    tasksCompleted: 67,
    knowledgeDocs: ["Benchmarks sectoriels 2026.pdf", "Guide Google Analytics 4.pdf"],
  },
  {
    id: "ai4",
    name: "Leo",
    role: "Rédacteur SEO & Blog",
    specialty: "Articles de blog longs, SEO, Newsletters, Contenu éditorial",
    avatar: "LO",
    avatarGradient: "linear-gradient(135deg, #10B981, #059669)",
    status: "active", // Valid key/fallback credits -> ready/active
    provider: "mistral",
    model: "Mistral Large",
    systemPrompt: "Tu es un rédacteur web expert en SEO et en content marketing. Tu produis des articles de blog longs (800–2500 mots), des newsletters engageantes et des pages de destination optimisées pour le référencement naturel. Tu intègres naturellement les mots-clés cibles, tu structures les contenus avec un maillage interne logique et tu adaptes le registre au secteur du client.",
    temperature: 0.45,
    hasCustomKey: false,
    keyStatus: "valid",
    tasksCompleted: 34,
    knowledgeDocs: ["Stratégie SEO BioNature.pdf"],
  },
  {
    id: "ai5",
    name: "Iris",
    role: "Designer & Prompt Images",
    specialty: "Génération de prompts visuels, Direction artistique, Midjourney & DALL-E",
    avatar: "IR",
    avatarGradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    status: "standby", // Expired key -> put in standby
    provider: "openai",
    model: "GPT-4o",
    systemPrompt: "Tu es une directrice artistique IA spécialisée dans la création de prompts visuels pour les outils génératifs (Midjourney, DALL-E, Firefly). Tu traduis des briefs marketing en descriptions visuelles précises, en tenant compte du style, de la lumière, de la composition, de la palette et du format de sortie attendu. Chaque prompt que tu génères est structuré, testable et optimisé pour le rendu final.",
    temperature: 0.78,
    hasCustomKey: true,
    keyStatus: "expired",
    tasksCompleted: 211,
    knowledgeDocs: ["Moodboard Maison Blanc.pdf", "Guide DALL-E 3.pdf"],
  },
];

export const networkLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  twitter: "Twitter / X",
  youtube: "YouTube",
  pinterest: "Pinterest",
  threads: "Threads",
};

// ── Hybrid Brainstorming types ──────────────────────────────────────────────

export interface MeetingMessage {
  id: string;
  senderId: string; // "user", memberId (t1, t2...) or agentId (ai1, ai2...)
  senderName: string;
  senderAvatar: string;
  avatarGradient?: string;
  role: string;
  content: string;
  time: string;
  type: "user" | "human" | "ai";
}

export interface BrainstormMeeting {
  id: string;
  title: string;
  clientName: string;
  brief: string;
  participants: string[]; // List of IDs (either aiX or tX)
  messages: MeetingMessage[];
  status: "setup" | "running" | "completed";
  createdAt: string;
}

