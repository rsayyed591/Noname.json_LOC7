export async function fetchAIAnalytics(): Promise<string> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulate API error sometimes
    if (Math.random() > 0.8) {
      throw new Error("Failed to fetch AI analytics")
    }
  
    return "Based on your donation patterns and food waste data, we recommend increasing donations during weekends by 25%. Your restaurant shows consistent food surplus in vegetarian items during weekdays. Consider optimizing portion sizes for dishes with highest waste rates: 1. Rice dishes (15% waste) 2. Bread items (12% waste) 3. Cooked vegetables (10% waste). Your food quality ratings are excellent, maintaining 95% positive feedback from NGOs."
  }
  