import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
<<<<<<< Updated upstream
    const file = formData.get("foodImage") as File;
=======
    const file = formData.get('food_image') as File;
>>>>>>> Stashed changes

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: "You are an AI food quality assessor. Your task is to evaluate the quality of food based on the provided input. You must categorize the food strictly using the following predefined terms: Hygienic, Unhygienic, Fresh, Stale, Hot and Fresh, Cold but Fresh, Spoiled. Guidelines: Do not misclassify Indian food as unhygienic based on appearance alone. Many Indian dishes have a rich, textured, and complex presentation that may appear different but are perfectly hygienic. Only classify food as ‘Unhygienic’ if there are clear indicators like visible dirt, contamination, or improper handling. If the food appears rotten, moldy, or visibly spoiled, classify it as ‘Spoiled’. If the input lacks enough details to determine quality, respond with ‘Insufficient Information’. Your goal is to provide fair, unbiased, and accurate food assessments.",
              },
              {
                inline_data: {
                  mime_type: file.type,
                  data: base64Image,
                },
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000, // Adding a timeout of 30 seconds
      }
    );

    const qualityAnalysis = response.data.candidates[0].content.parts[0].text;
    return NextResponse.json({ analysis: qualityAnalysis });
  } catch (error) {
    console.error("Error:", error);
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);

      // If the error is due to model not found or invalid model
      if (error.response?.data?.error?.message?.includes("model")) {
        return NextResponse.json(
          {
            error:
              "Invalid model or model not available. Please check the model name and try again.",
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          error:
            error.response?.data?.error?.message ||
            "An error occurred during analysis",
        },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "An error occurred during analysis" },
      { status: 500 }
    );
  }
}

