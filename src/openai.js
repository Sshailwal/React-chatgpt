export async function fetchGeminiResponse(prompt) {
  const apiKey = 'AIzaSyBX3rraNIALD_SOpyVPqHx2p1Udb-l0aTY'; // Replace with your Gemini API key
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;

  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Gemini response');
  }

  const data = await response.json();
  // The response structure may vary; adjust as needed
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

