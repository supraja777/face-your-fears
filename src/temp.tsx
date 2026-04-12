import React, { useState } from 'react';

const App = () => {
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<{ name: string; date: string; base64: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<{ verified: boolean; reason: string } | null>(null);

  // Helper to compress and convert to Base64 to avoid 400 errors from large payloads
  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; 
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); 
        setSelectedImage(compressedBase64);
        setMetadata({
          name: file.name,
          date: new Date(file.lastModified).toLocaleString(),
          base64: compressedBase64.split(',')[1]
        });
        setAuditResult(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processImage(file);
  };

  const runAIAudit = async () => {
    if (!metadata || !description) return alert("Please provide a description and an image.");

    setLoading(true);
    // Replace with your actual Groq API Key
    const GROQ_API_KEY = "GROQ_API_KEY"; 

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // Fixed: Using the supported Llama 3.2 Vision model
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `You are a mission auditor. Analyze the provided image. 
                         Does it prove completion of the task: "${description}"? 
                         Return ONLY a JSON object with "verified" (boolean) and "reason" (string).`
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${metadata.base64}`
                  }
                }
              ]
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0]?.message?.content) {
        const content = JSON.parse(data.choices[0].message.content);
        setAuditResult(content);
      } else {
        throw new Error("Invalid response structure from API");
      }
    } catch (error: any) {
      console.error("Audit Error:", error);
      // Parsing the decommissioned error or any other 400 error message
      let errorMessage = "Verification failed. Check your API key or model availability.";
      if (error.message.includes("model_decommissioned")) {
        errorMessage = "The selected model is decommissioned. Please check Groq's model list.";
      }
      
      setAuditResult({ 
        verified: false, 
        reason: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', fontFamily: "'Plus Jakarta Sans', sans-serif", padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', width: '100%', maxWidth: '500px' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>Mission Auditor</h2>
          <p style={{ color: '#64748b', margin: 0 }}>Smart AI verification powered by Groq</p>
        </header>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>Objective</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the task (e.g., A post on LinkedIn...)"
            style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '2px solid #f1f5f9', backgroundColor: '#f8fafc', boxSizing: 'border-box', outline: 'none', minHeight: '100px', resize: 'none', fontFamily: 'inherit' }}
          />
        </div>

        <label style={{ display: 'block', width: '100%', padding: '16px', backgroundColor: '#6366f1', color: 'white', borderRadius: '16px', fontWeight: '700', cursor: 'pointer', textAlign: 'center', boxSizing: 'border-box' }}>
          {selectedImage ? "Change Image" : "📷 Select Evidence"}
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
        </label>

        {selectedImage && (
          <div style={{ marginTop: '32px', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #f1f5f9', marginBottom: '20px' }}>
              <img src={selectedImage} alt="Preview" style={{ width: '100%', display: 'block' }} />
            </div>

            <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}><strong>File:</strong> {metadata?.name}</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}><strong>Date Taken:</strong> {metadata?.date}</p>
            </div>

            {!auditResult && (
              <button 
                onClick={runAIAudit} 
                disabled={loading}
                style={{ width: '100%', padding: '18px', backgroundColor: '#0f172a', color: 'white', borderRadius: '16px', border: 'none', fontWeight: '800', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "🔍 Auditing Evidence..." : "Verify Proof"}
              </button>
            )}

            {auditResult && (
              <div style={{ 
                marginTop: '20px', 
                padding: '24px', 
                borderRadius: '24px', 
                border: '2px solid', 
                borderColor: auditResult.verified ? '#10b981' : '#ef4444', 
                backgroundColor: auditResult.verified ? '#f0fdf4' : '#fef2f2' 
              }}>
                <h4 style={{ margin: '0 0 8px 0', color: auditResult.verified ? '#15803d' : '#991b1b', fontWeight: '800' }}>
                  {auditResult.verified ? "✅ Evidence Verified" : "❌ Evidence Rejected"}
                </h4>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5', color: auditResult.verified ? '#166534' : '#b91c1c' }}>
                  {auditResult.reason}
                </p>
                <button 
                  onClick={() => setAuditResult(null)}
                  style={{ marginTop: '16px', background: 'none', border: 'none', color: '#64748b', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Clear and Retry
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;