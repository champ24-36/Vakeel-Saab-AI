# Hindu Marriage Act RAG System - VS Code Setup

A specialized Retrieval-Augmented Generation (RAG) system for querying the Hindu Marriage Act using LangChain, ChromaDB, and Google's Gemini AI. Optimized for VS Code development environment.

## 🎯 What This System Does

This RAG system allows you to ask natural language questions about the Hindu Marriage Act and get accurate, contextual answers based on the legal text. For example:

- "What are the conditions for a valid Hindu marriage?"
- "What is the minimum age for marriage?"
- "What are the grounds for divorce?"
- "What is sapinda relationship?"
- "Can divorced persons remarry?"

## 📋 Prerequisites

- **Python 3.8+** (Check with `python --version`)
- **VS Code** with Python extension
- **Google AI API Key** (free from Google AI Studio)
- **Git** (for cloning if needed)

## 🚀 VS Code Setup Instructions

### 1. Open Project in VS Code

```bash
# Clone or download the project
git clone <your-repo-url>
cd hindu-marriage-act-rag

# Open in VS Code
code .
```

### 2. Set Up Python Environment in VS Code

1. **Open Command Palette**: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. **Select Python Interpreter**: Type "Python: Select Interpreter"
3. **Create Virtual Environment**:
   - Choose "Create Virtual Environment"
   - Select "venv"
   - Choose your Python installation
   - Select `requirements.txt` when prompted

**OR manually create environment:**

```bash
# In VS Code terminal (Ctrl+`)
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure Environment Variables

1. **Copy environment template**:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file in VS Code**:
   ```
   GOOGLE_API_KEY=your_actual_gemini_api_key_here
   CHROMADB_HOST=localhost
   CHROMADB_PORT=8000
   ```

3. **Get Google AI API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in and create API key
   - Copy to your `.env` file

### 4. VS Code Extensions (Recommended)

Install these VS Code extensions for better development experience:

- **Python** (Microsoft) - Essential for Python development
- **Pylance** (Microsoft) - Advanced Python language support
- **Python Docstring Generator** - For documentation
- **autoDocstring** - Auto-generate docstrings
- **GitLens** - Enhanced Git capabilities

## 🏃‍♂️ Quick Start

### Test the System

1. **Open VS Code Terminal**: `Ctrl+`` (backtick)

2. **Run the example**:
   ```bash
   python example_usage.py
   ```

3. **Test with Hindu Marriage Act data**:
   ```bash
   python main.py --json-file data/hindu_marriage_act_full.json
   ```

### VS Code Debugging Setup

Create `.vscode/launch.json` for debugging:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Run Hindu Marriage Act RAG",
            "type": "python",
            "request": "launch",
            "program": "main.py",
            "args": [
                "--json-file", 
                "data/hindu_marriage_act_full.json",
                "--text-fields", "title", "text",
                "--metadata-fields", "section"
            ],
            "console": "integratedTerminal",
            "cwd": "${workspaceFolder}",
            "env": {
                "PYTHONPATH": "${workspaceFolder}"
            }
        },
        {
            "name": "Analyze JSON Structure",
            "type": "python",
            "request": "launch",
            "program": "main.py",
            "args": [
                "--json-file", 
                "data/hindu_marriage_act_full.json",
                "--analyze-only"
            ],
            "console": "integratedTerminal"
        }
    ]
}
```

## 📊 Working with Hindu Marriage Act Data

### Analyze Your Data Structure

```bash
python main.py --json-file data/hindu_marriage_act_full.json --analyze-only
```

### Optimal Configuration for Legal Text

```bash
python main.py \
  --json-file data/hindu_marriage_act_full.json \
  --text-fields section title text \
  --metadata-fields section \
  --id-field section
```

### Example Queries for Hindu Marriage Act

Once the system is running, try these questions:

**Basic Information:**
- "What is the Hindu Marriage Act?"
- "When was this act enacted?"
- "What is the scope of this act?"

**Marriage Conditions:**
- "What are the conditions for a valid Hindu marriage?"
- "What is the minimum age for marriage?"
- "What is sapinda relationship?"
- "What are prohibited degrees of relationship?"

**Marriage Procedures:**
- "What ceremonies are required for Hindu marriage?"
- "Is registration of Hindu marriage mandatory?"
- "What is Saptapadi?"

**Divorce and Separation:**
- "What are the grounds for divorce?"
- "What is judicial separation?"
- "Can couples divorce by mutual consent?"
- "What is the waiting period for divorce?"

**Legal Remedies:**
- "What is restitution of conjugal rights?"
- "What are void marriages?"
- "What are voidable marriages?"
- "What are the punishments for bigamy?"

## 🛠️ VS Code Development Workflow

### 1. Code Navigation

- **Go to Definition**: `F12`
- **Find References**: `Shift+F12`
- **Search in Files**: `Ctrl+Shift+F`
- **Quick Open**: `Ctrl+P`

### 2. Running Code

- **Run Python File**: `F5` or `Ctrl+F5`
- **Run Selection**: `Shift+Enter`
- **Open Terminal**: `Ctrl+``

### 3. Debugging

- **Set Breakpoint**: `F9`
- **Start Debugging**: `F5`
- **Step Over**: `F10`
- **Step Into**: `F11`

### 4. Testing Individual Components

Create test files in VS Code:

```python
# test_legal_queries.py
from rag_system import RAGSystem
from data_loader import JSONDataLoader

def test_legal_query():
    loader = JSONDataLoader("data/hindu_marriage_act_full.json")
    documents = loader.create_documents(
        text_fields=["section", "title", "text"],
        metadata_fields=["section"]
    )
    
    rag = RAGSystem()
    rag.initialize()
    rag.add_documents(documents)
    
    # Test query
    result = rag.query("What are the conditions for Hindu marriage?")
    print(f"Answer: {result['answer']}")

if __name__ == "__main__":
    test_legal_query()
```

## 📁 VS Code Project Structure

```
hindu-marriage-act-rag/
├── .vscode/
│   ├── launch.json          # Debug configurations
│   ├── settings.json        # VS Code settings
│   └── tasks.json          # Build tasks
├── data/
│   ├── hindu_marriage_act_full.json
│   └── hindu_marriage_act_titles_only.json
├── src/                     # Optional: organize code
│   ├── __init__.py
│   ├── config.py
│   ├── data_loader.py
│   ├── vector_store.py
│   └── rag_system.py
├── tests/                   # Optional: test files
│   ├── __init__.py
│   ├── test_data_loader.py
│   └── test_rag_system.py
├── .env                     # Environment variables
├── .env.example
├── .gitignore
├── requirements.txt
├── main.py
├── example_usage.py
└── README.md
```

## 🔧 VS Code Settings

Create `.vscode/settings.json`:

```json
{
    "python.defaultInterpreterPath": "./venv/bin/python",
    "python.terminal.activateEnvironment": true,
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": ["--line-length", "88"],
    "files.associations": {
        "*.py": "python"
    },
    "editor.rulers": [88],
    "python.testing.pytestEnabled": true,
    "python.testing.unittestEnabled": false,
    "python.testing.pytestArgs": [
        "tests"
    ]
}
```

## 🐛 Troubleshooting in VS Code

### Common Issues:

1. **Python Interpreter Not Found**
   - `Ctrl+Shift+P` → "Python: Select Interpreter"
   - Choose the venv interpreter: `./venv/bin/python`

2. **Module Not Found Errors**
   - Ensure virtual environment is activated
   - Check PYTHONPATH in launch.json

3. **API Key Issues**
   - Verify `.env` file is in root directory
   - Check no extra spaces in API key

4. **ChromaDB Errors**
   - Delete `./chroma_db` folder and restart
   - Check file permissions

### VS Code Debugging Tips:

1. **Set breakpoints** in your code (`F9`)
2. **Use Debug Console** to inspect variables
3. **Watch expressions** for monitoring values
4. **Call stack** to trace execution

## 📈 Performance Optimization

### For Large Legal Documents:

Edit `config.py`:
```python
# Optimize for legal text
CHUNK_SIZE = 1500  # Larger chunks for legal context
CHUNK_OVERLAP = 300  # More overlap for continuity
TOP_K_RESULTS = 5  # More results for comprehensive answers
LLM_TEMPERATURE = 0.05  # Lower temperature for factual accuracy
```

### VS Code Memory Settings:

Add to VS Code settings:
```json
{
    "python.analysis.memory.keepLibraryAst": false,
    "python.analysis.autoImportCompletions": true
}
```

## 🚀 Advanced Usage

### Batch Processing Legal Queries

```python
# batch_legal_queries.py
legal_questions = [
    "What are the conditions for Hindu marriage?",
    "What are the grounds for divorce?",
    "What is the punishment for bigamy?",
    "What is sapinda relationship?",
    "Can divorced persons remarry?"
]

for question in legal_questions:
    result = rag.query(question)
    print(f"Q: {question}")
    print(f"A: {result['answer']}\n")
```

### Custom Legal Query Interface

```python
# legal_assistant.py
class LegalAssistant:
    def __init__(self):
        self.rag = RAGSystem()
        self.setup_legal_context()
    
    def setup_legal_context(self):
        # Load Hindu Marriage Act data
        loader = JSONDataLoader("data/hindu_marriage_act_full.json")
        documents = loader.create_documents(
            text_fields=["section", "title", "text"],
            metadata_fields=["section"]
        )
        self.rag.initialize()
        self.rag.add_documents(documents)
    
    def ask_legal_question(self, question):
        return self.rag.query(question)
```

## 📚 Learning Resources

- **LangChain Documentation**: https://python.langchain.com/
- **ChromaDB Documentation**: https://docs.trychroma.com/
- **Google AI Documentation**: https://ai.google.dev/
- **VS Code Python Tutorial**: https://code.visualstudio.com/docs/python/python-tutorial

## 🤝 Contributing

1. Fork the repository
2. Create feature branch in VS Code
3. Make changes with proper debugging
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Ready to start?** Open VS Code, follow the setup instructions, and begin querying the Hindu Marriage Act with natural language!