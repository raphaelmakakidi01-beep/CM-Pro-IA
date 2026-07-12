export const mockUser = {
  id: "u1",
  name: "Administrateur",
  email: "admin@agence-cm.fr",
  avatar: "AD",
  role: "Community Manager Principal",
  plan: "Pro",
};

export const mockClients = [
  {
    id: "c1",
    name: "Client Restauration",
    sector: "Restauration",
    logo: "CR",
    logoColor: "#F59E0B",
    status: "active",
    networks: ["instagram", "facebook", "tiktok"],
    progress: 78,
    postsThisMonth: 24,
    followers: 12400,
    engagement: 4.2,
    monthlyBudget: 1200,
    nextPost: "2026-07-10T14:00:00",
    description: "Fiche client - Espace de restauration gastronomique.",
    postsInstagram: 8,
    postsLinkedin: 8,
    monthlyPostTarget: 16,
    postsDelivered: 11,
    primaryKpiGoal: "engagement",
    growthTarget: "Atteindre 15 000 abonnés"
  },
  {
    id: "c2",
    name: "Client Technologie",
    sector: "Technologie",
    logo: "CT",
    logoColor: "#2563EB",
    status: "active",
    networks: ["linkedin", "twitter", "instagram"],
    progress: 91,
    postsThisMonth: 32,
    followers: 8900,
    engagement: 3.8,
    monthlyBudget: 2500,
    nextPost: "2026-07-10T16:30:00",
    description: "Fiche client - Société de développement de logiciels et services B2B.",
    postsInstagram: 10,
    postsLinkedin: 10,
    monthlyPostTarget: 20,
    postsDelivered: 18,
    primaryKpiGoal: "lead_gen",
    growthTarget: "+20% de clics site"
  },
  {
    id: "c3",
    name: "Client E-commerce",
    sector: "E-commerce Mode",
    logo: "CE",
    logoColor: "#7C3AED",
    status: "active",
    networks: ["instagram", "pinterest", "tiktok"],
    progress: 65,
    postsThisMonth: 18,
    followers: 34200,
    engagement: 6.1,
    monthlyBudget: 1800,
    nextPost: "2026-07-10T11:00:00",
    description: "Fiche client - Boutique e-commerce d'habillement et accessoires.",
    postsInstagram: 8,
    postsLinkedin: 4,
    monthlyPostTarget: 12,
    postsDelivered: 2,
    primaryKpiGoal: "reach",
    growthTarget: "Gagner 5k abonnés"
  },
  {
    id: "c4",
    name: "Client Immobilier",
    sector: "Immobilier",
    logo: "CI",
    logoColor: "#10B981",
    status: "active",
    networks: ["linkedin", "facebook", "instagram"],
    progress: 82,
    postsThisMonth: 12,
    followers: 5600,
    engagement: 2.9,
    monthlyBudget: 3000,
    nextPost: "2026-07-11T09:00:00",
    description: "Fiche client - Agence de conseil et courtage en immobilier.",
    postsInstagram: 4,
    postsLinkedin: 4,
    monthlyPostTarget: 8,
    postsDelivered: 5,
    primaryKpiGoal: "employer_branding",
    growthTarget: "Atteindre 8k abonnés"
  },
  {
    id: "c5",
    name: "Client Sport & Santé",
    sector: "Sport & Santé",
    logo: "CS",
    logoColor: "#EF4444",
    status: "paused",
    networks: ["instagram", "youtube", "tiktok"],
    progress: 45,
    postsThisMonth: 8,
    followers: 22100,
    engagement: 5.4,
    monthlyBudget: 900,
    nextPost: "2026-07-12T08:00:00",
    description: "Fiche client - Organisme de coaching sportif et bien-être.",
    postsInstagram: 8,
    postsLinkedin: 4,
    monthlyPostTarget: 12,
    postsDelivered: 1,
    primaryKpiGoal: "engagement",
    growthTarget: "+15% engagement"
  },
  {
    id: "c6",
    name: "Client Tourisme",
    sector: "Tourisme",
    logo: "CT",
    logoColor: "#0EA5E9",
    status: "active",
    networks: ["instagram", "facebook", "youtube"],
    progress: 73,
    postsThisMonth: 21,
    followers: 18700,
    engagement: 4.8,
    monthlyBudget: 1500,
    nextPost: "2026-07-10T18:00:00",
    description: "Fiche client - Agence de voyages et séjours de loisirs.",
    postsInstagram: 10,
    postsLinkedin: 5,
    monthlyPostTarget: 15,
    postsDelivered: 9,
    primaryKpiGoal: "reach",
    growthTarget: "5k reach / post"
  },
  {
    id: "c7",
    name: "Client Cosmétiques",
    sector: "Santé & Bien-être",
    logo: "CC",
    logoColor: "#84CC16",
    status: "active",
    networks: ["instagram", "facebook", "pinterest"],
    progress: 88,
    postsThisMonth: 28,
    followers: 9300,
    engagement: 5.9,
    monthlyBudget: 1100,
    nextPost: "2026-07-10T12:00:00",
    description: "Fiche client - Marque de produits cosmétiques naturels.",
    postsInstagram: 8,
    postsLinkedin: 8,
    monthlyPostTarget: 16,
    postsDelivered: 14,
    primaryKpiGoal: "lead_gen",
    growthTarget: "Atteindre 12k abonnés"
  },
  {
    id: "c8",
    name: "Client Finance",
    sector: "Finance",
    logo: "CF",
    logoColor: "#6366F1",
    status: "review",
    networks: ["linkedin", "twitter"],
    progress: 55,
    postsThisMonth: 9,
    followers: 3400,
    engagement: 2.1,
    monthlyBudget: 4000,
    nextPost: "2026-07-11T10:00:00",
    description: "Fiche client - Société de conseil en gestion et investissements.",
    postsInstagram: 0,
    postsLinkedin: 10,
    monthlyPostTarget: 10,
    postsDelivered: 3,
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
  { id: "a1", type: "publish", client: "Client Restauration", content: "Post Instagram publié avec succès", time: "Il y a 12 min", network: "instagram", icon: "check" },
  { id: "a2", type: "schedule", client: "Client Technologie", content: "3 posts programmés pour la semaine", time: "Il y a 45 min", network: "linkedin", icon: "calendar" },
  { id: "a3", type: "ai", client: "Client E-commerce", content: "Calendrier éditorial généré par IA", time: "Il y a 1h", network: "instagram", icon: "sparkles" },
  { id: "a4", type: "alert", client: "Client Sport & Santé", content: "Taux d'engagement en baisse (-12%)", time: "Il y a 2h", network: "tiktok", icon: "warning" },
  { id: "a5", type: "publish", client: "Client Tourisme", content: "Story Facebook publiée", time: "Il y a 3h", network: "facebook", icon: "check" },
  { id: "a6", type: "report", client: "Client Cosmétiques", content: "Rapport mensuel juin généré", time: "Il y a 4h", network: "", icon: "file" },
  { id: "a7", type: "schedule", client: "Client Immobilier", content: "Carrousel LinkedIn programmé", time: "Il y a 5h", network: "linkedin", icon: "calendar" },
];

export const mockTodayPosts = [
  { id: "p1", client: "Client Restauration", clientLogo: "CR", clientColor: "#F59E0B", network: "instagram", format: "Carrousel", time: "14:00", status: "scheduled", caption: "Notre menu estival vous attend ! Réservez votre table..." },
  { id: "p2", client: "Client Cosmétiques", clientLogo: "CC", clientColor: "#84CC16", network: "facebook", format: "Image", time: "12:00", status: "published", caption: "Découvrez notre nouvelle gamme de soins bio..." },
  { id: "p3", client: "Client Technologie", clientLogo: "CT", clientColor: "#2563EB", network: "linkedin", format: "Article", time: "16:30", status: "scheduled", caption: "Comment l'IA transforme la relation client en 2026..." },
  { id: "p4", client: "Client Tourisme", clientLogo: "CT", clientColor: "#0EA5E9", network: "instagram", format: "Reel", time: "18:00", status: "scheduled", caption: "Destination voyages : le voyage dont vous rêvez..." },
  { id: "p5", client: "Client E-commerce", clientLogo: "CE", clientColor: "#7C3AED", network: "tiktok", format: "Vidéo", time: "11:00", status: "published", caption: "Nouvelle collection été - En coulisses..." },
];

export const mockAIAlerts = [
  { id: "al1", type: "opportunity", title: "Tendance détectée", message: "Le hashtag #RecettesÉté est en forte hausse. Idéal pour Client Restauration ce weekend.", priority: "high", client: "Client Restauration" },
  { id: "al2", type: "warning", title: "Engagement en baisse", message: "Client Sport & Santé a perdu 12% d'engagement cette semaine. Recommandation : publier des Reels courts.", priority: "medium", client: "Client Sport & Santé" },
  { id: "al3", type: "suggestion", title: "Meilleur moment", message: "Pour Client Technologie, les posts LinkedIn le mardi à 8h génèrent 3x plus d'impressions.", priority: "low", client: "Client Technologie" },
];

export const mockTeamMembers = [
  { id: "t1", name: "Administrateur", role: "Community Manager Principal", avatar: "AD", email: "admin@agence-cm.fr", clients: 4, status: "online" },
  { id: "t2", name: "Créateur de contenu", role: "Content Creator", avatar: "CC", email: "contenu@agence-cm.fr", clients: 3, status: "online" },
  { id: "t3", name: "Responsable Social Media", role: "Social Media Manager", avatar: "RS", email: "social@agence-cm.fr", clients: 2, status: "away" },
  { id: "t4", name: "Graphiste", role: "Graphic Designer", avatar: "GR", email: "design@agence-cm.fr", clients: 0, status: "offline" },
  { id: "t5", name: "Analyste", role: "Analytics Specialist", avatar: "AN", email: "analytics@agence-cm.fr", clients: 1, status: "online" },
];

export const mockInvoices = [
  { id: "inv1", client: "Client Technologie", amount: 2500, status: "paid", date: "2026-07-01", dueDate: "2026-07-15" },
  { id: "inv2", client: "Client Immobilier", amount: 3000, status: "pending", date: "2026-07-05", dueDate: "2026-07-20" },
  { id: "inv3", client: "Client Restauration", amount: 1200, status: "pending", date: "2026-07-05", dueDate: "2026-07-20" },
  { id: "inv4", client: "Client E-commerce", amount: 1800, status: "overdue", date: "2026-06-01", dueDate: "2026-06-15" },
  { id: "inv5", client: "Client Tourisme", amount: 1500, status: "paid", date: "2026-06-01", dueDate: "2026-06-15" },
  { id: "inv6", client: "Client Cosmétiques", amount: 1100, status: "paid", date: "2026-06-01", dueDate: "2026-06-15" },
];

export const mockCalendarEvents = [
  { id: "e1", clientId: "c1", client: "Client Restauration", network: "instagram", format: "Carrousel", title: "Menu été", date: "2026-07-10", time: "14:00", status: "scheduled", color: "#F59E0B" },
  { id: "e2", clientId: "c7", client: "Client Cosmétiques", network: "facebook", format: "Image", title: "Gamme soins", date: "2026-07-10", time: "12:00", status: "published", color: "#84CC16" },
  { id: "e3", clientId: "c2", client: "Client Technologie", network: "linkedin", format: "Article", title: "IA & relation client", date: "2026-07-10", time: "16:30", status: "scheduled", color: "#2563EB" },
  { id: "e4", clientId: "c6", client: "Client Tourisme", network: "instagram", format: "Reel", title: "Routine voyages", date: "2026-07-10", time: "18:00", status: "scheduled", color: "#0EA5E9" },
  { id: "e5", clientId: "c3", client: "Client E-commerce", network: "tiktok", format: "Vidéo", title: "Coulisses collection", date: "2026-07-10", time: "11:00", status: "published", color: "#7C3AED" },
  { id: "e6", clientId: "c1", client: "Client Restauration", network: "instagram", format: "Story", title: "Ambiance restaurant", date: "2026-07-11", time: "12:00", status: "scheduled", color: "#F59E0B" },
  { id: "e7", clientId: "c4", client: "Client Immobilier", network: "linkedin", format: "Carrousel", title: "Bien du mois", date: "2026-07-11", time: "09:00", status: "draft", color: "#10B981" },
  { id: "e8", clientId: "c2", client: "Client Technologie", network: "twitter", format: "Thread", title: "Veille tech", date: "2026-07-11", time: "08:00", status: "scheduled", color: "#2563EB" },
  { id: "e9", clientId: "c3", client: "Client E-commerce", network: "instagram", format: "Carrousel", title: "Lookbook été", date: "2026-07-12", time: "10:00", status: "scheduled", color: "#7C3AED" },
  { id: "e10", clientId: "c6", client: "Client Tourisme", network: "facebook", format: "Image", title: "Promo été -15%", date: "2026-07-12", time: "11:00", status: "draft", color: "#0EA5E9" },
  { id: "e11", clientId: "c7", client: "Client Cosmétiques", network: "instagram", format: "Reel", title: "Routine soin matinal", date: "2026-07-12", time: "09:00", status: "scheduled", color: "#84CC16" },
  { id: "e12", clientId: "c1", client: "Client Restauration", network: "tiktok", format: "Vidéo", title: "Chef en cuisine", date: "2026-07-13", time: "18:00", status: "scheduled", color: "#F59E0B" },
  { id: "e13", clientId: "c2", client: "Client Technologie", network: "linkedin", format: "Article", title: "Cas client réussi", date: "2026-07-14", time: "09:00", status: "draft", color: "#2563EB" },
  { id: "e14", clientId: "c4", client: "Client Immobilier", network: "facebook", format: "Image", title: "Présentation de biens", date: "2026-07-14", time: "14:00", status: "scheduled", color: "#10B981" },
  { id: "e15", clientId: "c3", client: "Client E-commerce", network: "pinterest", format: "Image", title: "Moodboard automne", date: "2026-07-15", time: "10:00", status: "draft", color: "#7C3AED" },
];

export const mockMessages = [
  { id: "m1", from: "Créateur de contenu", fromAvatar: "CC", content: "J'ai terminé les visuels pour le Client Restauration, ils sont dans la bibliothèque.", time: "10:32", unread: true },
  { id: "m2", from: "Responsable Social Media", fromAvatar: "RS", content: "Le rapport mensuel du Client E-commerce est prêt à valider.", time: "09:15", unread: true },
  { id: "m3", from: "Graphiste", fromAvatar: "GR", content: "Besoin de la charte graphique du Client Technologie en HD.", time: "Hier", unread: false },
  { id: "m4", from: "Analyste", fromAvatar: "AN", content: "Les stats du mois de juin sont excellentes pour le Client Cosmétiques !", time: "Hier", unread: false },
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
    avatar: "AL",
    avatarGradient: "linear-gradient(135deg, #2563EB, #3B82F6)",
    status: "active",
    provider: "openai",
    model: "gpt-4o",
    systemPrompt: "Tu es un expert LinkedIn. Rédige des accroches percutantes et des posts optimisés pour le réseau.",
    temperature: 0.7,
    hasCustomKey: false,
    keyStatus: "untested",
    tasksCompleted: 34,
    knowledgeDocs: ["Ligne_Editoriale_Generale.pdf"]
  },
  {
    id: "ai2",
    name: "Iris",
    role: "Visual Designer",
    specialty: "Création de Prompts Image (Midjourney/DALL-E), Direction Artistique",
    avatar: "IR",
    avatarGradient: "linear-gradient(135deg, #EC4899, #F472B6)",
    status: "standby",
    provider: "openai",
    model: "gpt-4o",
    systemPrompt: "Tu es un directeur artistique. Rédige des prompts de génération d'images ultra-précis.",
    temperature: 0.8,
    hasCustomKey: false,
    keyStatus: "untested",
    tasksCompleted: 48,
    knowledgeDocs: ["Styles_Visuels_De_Marque.pdf"]
  },
  {
    id: "ai3",
    name: "Sam",
    role: "SEO Specialist",
    specialty: "Recherche de Hashtags, SEO Local, Optimisation de Profils",
    avatar: "SA",
    avatarGradient: "linear-gradient(135deg, #10B981, #34D399)",
    status: "active",
    provider: "gemini",
    model: "gemini-1.5-pro",
    systemPrompt: "Tu es un spécialiste SEO et réseaux sociaux. Analyse et sélectionne les meilleurs hashtags.",
    temperature: 0.5,
    hasCustomKey: false,
    keyStatus: "untested",
    tasksCompleted: 21,
    knowledgeDocs: ["Guide_SEO_Mots_Cles.pdf"]
  },
  {
    id: "ai4",
    name: "Maya",
    role: "Instagram Specialist",
    specialty: "Scripts de Reels, Rédaction de Légendes Fun & Engageantes",
    avatar: "MA",
    avatarGradient: "linear-gradient(135deg, #7C3AED, #A78BFA)",
    status: "working",
    provider: "anthropic",
    model: "claude-3-5-sonnet",
    systemPrompt: "Tu es experte de l'algorithme Instagram. Conçois des scripts de Reels hautement engageants.",
    temperature: 0.75,
    hasCustomKey: false,
    keyStatus: "untested",
    tasksCompleted: 15,
    knowledgeDocs: ["Instagram_Best_Practices_2026.pdf"]
  }
];

export const networkLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  twitter: "Twitter",
  youtube: "YouTube",
  pinterest: "Pinterest",
  threads: "Threads",
};

export interface MeetingMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderGradient?: string;
  avatarGradient?: string;
  content: string;
  time: string;
  isAI?: boolean;
  role?: string;
  type?: string;
}
