import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, duration, format, style, apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Clé API Gemini manquante. Veuillez la renseigner ou l'activer dans la page Paramètres." },
        { status: 400 }
      );
    }

    const fullPrompt = `Tu es un assistant IA expert en création vidéo et community management.
Génère un scénario de vidéo court (Reel/TikTok/Short) basé sur la description et les critères de l'utilisateur.
Renvoie UNIQUEMENT un objet JSON brut valide, sans balises de code Markdown (\`\`\`json), sans texte avant ou après.

Le JSON doit contenir exactement 4 variations de vidéos adaptées au format "${format}", au style général "${style}" et à la durée "${duration}".

Structure JSON attendue :
{
  "videos": [
    {
      "title": "Nom de la variation",
      "duration": "durée de la vidéo (ex: 0:05)",
      "style": "Description courte du style rythmique et musical",
      "color": "code couleur hexadécimal moderne et élégant (ex: #7C3AED)",
      "voiceover": "Script complet de la voix-off rédigé en français",
      "caption": "Légende de publication suggérée optimisée avec hashtags",
      "scenes": [
        {
          "time": "Plage de temps (ex: 0:00 - 0:02)",
          "visual": "Description précise du plan visuel à l'écran",
          "audio": "Ambiance sonore ou voix-off pour ce plan précis"
        }
      ]
    }
  ]
}

Brief utilisateur : "${prompt}"
Durée demandée : ${duration}
Format demandé : ${format}
Style demandé : ${style}

Réponds avec le JSON brut uniquement.`;

    let apiRes;
    let modelUsed = "gemini-omni-flash-preview";

    // 1. Try with Gemini Omni (Preview v1beta)
    try {
      apiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-omni-flash-preview:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: fullPrompt }],
              },
            ],
          }),
        }
      );
    } catch (e) {
      console.error("Fetch to Gemini Omni failed:", e);
    }

    // Parse response code and errors if any
    let errorData = null;
    let fallbackNeeded = !apiRes || apiRes.status !== 200;

    if (apiRes && apiRes.status !== 200) {
      errorData = await apiRes.json().catch(() => ({}));
      const errMsg = errorData?.error?.message || "";
      const isQuotaOrLimitError = apiRes.status === 429 || apiRes.status === 403 || 
                                  errMsg.toLowerCase().includes("quota") || 
                                  errMsg.toLowerCase().includes("limit");
      const isModelNotFoundError = apiRes.status === 404;

      if (isQuotaOrLimitError || isModelNotFoundError) {
        fallbackNeeded = true;
      }
    }

    // 2. Fallback to stable Gemini 1.5 Flash (v1 stable) if free-tier quota limits Omni to 0
    if (fallbackNeeded) {
      console.warn("Gemini Omni quota exceeded or model restricted. Falling back to stable gemini-1.5-flash...");
      modelUsed = "gemini-1.5-flash";
      
      apiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: fullPrompt }],
              },
            ],
          }),
        }
      );
    }

    if (!apiRes || apiRes.status !== 200) {
      const finalErrData = apiRes ? await apiRes.json().catch(() => ({})) : {};
      return NextResponse.json(
        { success: false, error: finalErrData.error?.message || "Erreur de connexion aux API Gemini." },
        { status: apiRes ? apiRes.status : 500 }
      );
    }

    const result = await apiRes.json();
    const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      return NextResponse.json({ success: false, error: "L'API Gemini a renvoyé une réponse vide." }, { status: 500 });
    }

    const cleaned = textResponse
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const parsedData = JSON.parse(cleaned);
    return NextResponse.json({ success: true, videos: parsedData.videos, model: modelUsed });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Erreur serveur de génération" }, { status: 500 });
  }
}
