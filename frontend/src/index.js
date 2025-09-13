const frontendBuildPath = path.join(__dirname, "frontend-build");
app.use(express.static(frontendBuildPath));
app.get("/admin", (req, res) => res.sendFile(path.join(frontendBuildPath, "index.html")));
app.get("/overlay", (req, res) => res.sendFile(path.join(frontendBuildPath, "index.html")));
