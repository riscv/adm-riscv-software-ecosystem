# Contributing to RISC-V Software Ecosystem

Thank you for your interest in contributing to the RISC-V Software Ecosystem Dashboard! We welcome contributions to keep the data accurate and up-to-date.

## How to Add or Update a Package

All data is stored in a YAML file located at `public/data.yaml`.

To add a new package or update an existing one:

1.  **Fork the repository** and clone it locally.
2.  **Open** `public/data.yaml` in your favorite text editor.
3.  **Add a new entry** to the list (or modify an existing one).

### Data Format

Each entry in `public/data.yaml` must follow this structure:

```yaml
- id: <unique_id>
  category: <Category Name>
  software: "<Software Name>"
  status: <Status>
  type: <Type>
  riscvEnablement: "<URL>"
```

#### Fields Description

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | string/number | A unique identifier for the entry. |
| `category` | string | The category of the software (e.g., "AI", "Toolchain"). |
| `software` | string | The name of the software package. |
| `status` | string | The current RISC-V enablement status. Must be one of the allowed values. |
| `type` | string | The license type or distribution model (e.g., "Open Source", "Commercial"). |
| `riscvEnablement` | string (URL) | A link to evidence of RISC-V support (GitHub repo, documentation, issue tracker, etc.). |

#### Allowed Status Values

The `status` field must be one of the following:

- **Enabled**: Full support, production ready.
- **In Progress**: Enablement is currently underway.
- **Optimized**: Software is not only enabled but also tuned/enhanced for RISC-V.
- **TBD**: Status is pending verification or unknown.

### Example Entry

```yaml
- id: 9999
  category: Web Browser
  software: "Chromium"
  status: Enabled
  type: Open Source
  riscvEnablement: "https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/linux/riscv.md"
```

## Validation

Before submitting your changes, please run the validation script to ensure your data conforms to the schema.

1.  **Install dependencies** (if you haven't already):
    ```bash
    npm install
    ```

2.  **Run the validator**:
    ```bash
    npm run validate:data
    ```

If the validation fails, the script will output error messages indicating which field or item is incorrect. Please fix these errors before committing.

## Submitting Changes

1.  **Commit your changes** with a clear message (e.g., "Add Chromium to data.yaml").
2.  **Push** to your forked repository.
3.  **Open a Pull Request** against the `main` branch of this repository.

The CI workflow will automatically run the validation script on your Pull Request.
