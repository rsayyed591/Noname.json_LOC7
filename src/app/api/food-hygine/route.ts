import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("foodImage") as File;

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
                text: "I need you to analyze this image. This image is of a food vendor. We are an NGO and We want you to generate a single word response whether the food is hygienic or not. Say Hygienic or Un-Hygienic. Also Ensure you do not false classify indian food as unhygienic. If you are not sure, give a positive response.",
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
