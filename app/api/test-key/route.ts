import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { provider, apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Clé API manquante" }, { status: 400 });
    }

    let isValid = false;
    let errorMessage = "Validation échouée";

    if (provider === "openai") {
      const res = await fetch("https://api.openai.com/v1/models", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      if (res.status === 200) {
        isValid = true;
      } else {
        const err = await res.json().catch(() => ({}));
        errorMessage = err.error?.message || `Erreur OpenAI (${res.status})`;
      }
    } else if (provider === "gemini") {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
      if (res.status === 200) {
        isValid = true;
      } else {
        const err = await res.json().catch(() => ({}));
        errorMessage = err.error?.message || `Erreur Gemini (${res.status})`;
      }
    } else if (provider === "anthropic") {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-5-haiku-20241022",
          max_tokens: 1,
          messages: [{ role: "user", content: "ping" }],
        }),
      });
      if (res.status === 200) {
        isValid = true;
      } else {
        const err = await res.json().catch(() => ({}));
        errorMessage = err.error?.message || `Erreur Anthropic (${res.status})`;
      }
    } else if (provider === "mistral") {
      const res = await fetch("https://api.mistral.ai/v1/models", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      if (res.status === 200) {
        isValid = true;
      } else {
        const err = await res.json().catch(() => ({}));
        errorMessage = err.error?.message || `Erreur Mistral (${res.status})`;
      }
    } else {
      errorMessage = "Fournisseur non pris en charge";
    }

    if (isValid) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Erreur de connexion serveur" }, { status: 500 });
  }
}
