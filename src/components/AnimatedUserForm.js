'use client';
import { useState, useEffect } from "react";
import { API_BASE_URL } from "./api";
import { motion } from "framer-motion";

//Moving glass Animation
const GlassPanel = ({ index }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPosition({ x: Math.random() * 100, y: Math.random() * 100 });
    
    const interval = setInterval(() => {
      setPosition({ x: Math.random() * 100, y: Math.random() * 100 });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="absolute w-40 h-40 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg"
      style={{ top: `${position.y}%`, left: `${position.x}%` }}
      animate={{ x: position.x, y: position.y }}
      transition={{ duration: 5, ease: 'easeInOut' }}
    />
  );
};

export default function UserForm() {
  const [formData, setFormData] = useState({ name: "", interest: "", category: "" });
  const [response, setResponse] = useState(null);

  //to prevent hydration error
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  //to handle change in form input values

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  //Handle submit on the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_BASE_URL}/submit-form`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponse(data);
      setFormData({ name: "", interest: "", category: "" });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 to-purple-800 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <GlassPanel key={i} index={i} />
      ))}

      <div className="relative bg-white backdrop-blur-lg p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">User Form</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-blue-100 rounded-lg outline-none border-none"
            required
          />
          <input
            type="text"
            name="interest"
            placeholder="Enter your interest fields"
            value={formData.interest}
            onChange={handleChange}
            className="w-full p-2 bg-blue-100 rounded-lg outline-none border-none"
            required
          />
          <div>
            <label className="block font-semibold mt-4 mb-2">Select Your Department:</label>
            {["Finance", "Marketing", "Sales"].map((dept) => (
              <label key={dept} className="inline-flex items-center mx-2 p-1">
                <input
                  type="radio"
                  name="category"
                  value={dept}
                  checked={formData.category === dept}
                  onChange={handleChange}
                />
                <span className="ml-2">{dept}</span>
              </label>
            ))}
          </div>
          <button type="submit" className="w-full p-2 bg-purple-500 rounded">
            Submit
          </button>
        </form>

        {response && (
          <div className="p-4 mt-4 bg-blue-200 rounded">
            <h3 className="font-bold">Response:</h3>
            <p>Hii {response.name},</p>
            <p>Thank you for submitting your details. You are from {response.category} and interested in {response.interest}.</p>
          </div>
        )}
      </div>
    </div>
  );
}