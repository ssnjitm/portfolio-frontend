const normalizeApiBaseUrl = (value) => {
  if (!value) return "http://localhost:8000/api/v1";
  const cleaned = value.replace(/\/+$/, "");
  return cleaned.endsWith("/api/v1") ? cleaned : `${cleaned}/api/v1`;
};

const conf = {
  apiBaseUrl: normalizeApiBaseUrl(
    import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BACKEND_URL
  ),
};

export default conf;