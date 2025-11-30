import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const recommendPhones = (req, res) => {
  // correct absolute path to recommend.py
  const scriptPath = path.resolve(__dirname, "../recommend.py");

  console.log("Running python script:", scriptPath);

  const python = spawn("python", [scriptPath]);

  python.stdin.write(JSON.stringify(req.body));
  python.stdin.end();

  let result = "";

  python.stdout.on("data", (data) => {
    console.log("PYTHON OUTPUT:", data.toString());  // debug
    result += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error("Python Error:", data.toString());
  });

  python.on("close", () => {
    try {
      const recommendations = JSON.parse(result);
      res.json({ success: true, data: recommendations });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "Invalid Python output",
        raw: result,
      });
    }
  });
};
