import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import styled from 'styled-components';

const LogoHeader = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #6C63FF 0%, #8A83FF 50%, #A594F9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow:
    0 2px 8px rgba(108, 99, 255, 0.15),
    0 0 16px #8A83FF,
    0 0 32px #6C63FF;
  text-align: center;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  user-select: none;
`;

const formStyle = {
  maxWidth: 350,
  margin: "3rem auto",
  background: "#2B2B4A",
  borderRadius: 16,
  padding: "2.5rem 2rem 2rem 2rem",
  boxShadow: "0 8px 32px rgba(108,99,255,0.18)",
  color: "#E0E0FF",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem"
};

const inputStyle = {
  padding: "0.9rem 1rem",
  borderRadius: 10,
  border: "1.5px solid #6C63FF",
  background: "#3D3D60",
  color: "#E0E0FF",
  fontSize: "1rem",
  marginBottom: "0.5rem"
};

const buttonStyle = {
  padding: "1rem",
  borderRadius: 12,
  background: "linear-gradient(135deg, #6C63FF 0%, #8A83FF 100%)",
  color: "#fff",
  fontWeight: 700,
  fontSize: "1.1rem",
  border: "none",
  cursor: "pointer",
  marginTop: "0.5rem"
};

const linkStyle = {
  color: "#8A83FF",
  textDecoration: "underline",
  cursor: "pointer",
  fontSize: "0.95rem"
};

export default function LoginPage() {
  const { login, signup, user, loading } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignup) {
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
      // Redirect handled by useEffect
    } catch (err) {
      setError(err.message.replace("Firebase:", "").replace("auth/", "").replace(/-/g, " "));
    }
  };

  return (
    <>
      <LogoHeader>Improve365</LogoHeader>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: 8 }}>{isSignup ? "Sign Up" : "Log In"}</h2>
        {error && <div style={{ background: "#FF6B6B", color: "#fff", borderRadius: 8, padding: "0.7rem", marginBottom: 8, textAlign: "center" }}>{error}</div>}
        {isSignup && (
          <input
            style={inputStyle}
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={loading}
          />
        )}
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoFocus
          disabled={loading}
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button style={buttonStyle} type="submit" disabled={loading}>
          {loading ? (isSignup ? "Signing up..." : "Logging in...") : (isSignup ? "Sign Up" : "Log In")}
        </button>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          {isSignup ? (
            <>
              Already have an account?{' '}
              <span style={linkStyle} onClick={() => { setIsSignup(false); setError(""); }}>Log In</span>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <span style={linkStyle} onClick={() => { setIsSignup(true); setError(""); }}>Sign Up</span>
            </>
          )}
        </div>
      </form>
      <Footer />
    </>
  );
} 