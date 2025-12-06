import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "..", "public", "data.yaml");
const schemaPath = path.join(__dirname, "..", "schema", "data-schema.json");

console.log("✅ Starting YAML schema validation…");

// Load YAML
const rawYaml = fs.readFileSync(dataPath, "utf8");
const data = yaml.load(rawYaml);

if (!Array.isArray(data)) {
  console.error("❌ data.yaml must be a top-level array of objects.");
  process.exit(1);
}

// Load schema
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

// Configure Ajv
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const validate = ajv.compile(schema);

let hasErrors = false;

data.forEach((item, index) => {
  const valid = validate(item);
  if (!valid) {
    hasErrors = true;
    console.error(`\n❌ Validation failed for item at index ${index}:`);
    console.error(JSON.stringify(validate.errors, null, 2));
  }
});

if (hasErrors) {
  console.error("\n❌ YAML schema validation failed. Aborting build.");
  process.exit(1);
}

console.log("✅ YAML schema validation passed.");