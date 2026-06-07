const conf = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    "http://localhost:8000/api/v1",
};

export default conf;