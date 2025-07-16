# VS Code Setup Guide for Hindu Marriage Act RAG System

## 🎯 Quick Setup Checklist

- [ ] Python 3.8+ installed
- [ ] VS Code installed with Python extension
- [ ] Google AI API key obtained
- [ ] Virtual environment created
- [ ] Dependencies installed
- [ ] Environment variables configured

## 📋 Step-by-Step VS Code Setup

### 1. Open Project in VS Code

```bash
# Navigate to project directory
cd hindu-marriage-act-rag

# Open in VS Code
code .
```

### 2. Set Up Python Environment

**Method 1: VS Code Command Palette**
1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type "Python: Create Environment"
3. Select "Venv"
4. Choose Python interpreter
5. Select `requirements.txt` when prompted

**Method 2: Terminal**
```bash
# Open VS Code terminal (Ctrl+`)
python -m venv venv

# Activate environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` in VS Code:
   ```
   GOOGLE_API_KEY=your_actual_api_key_here
   CHROMADB_HOST=localhost
   CHROMADB_PORT=8000
   ```

3. Get Google AI API Key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create API key
   - Copy to `.env` file

### 4. Test the Setup

**Run the test script:**
```bash
python test_legal_queries.py
```

**Or use VS Code debugger:**
1. Press `F5`
2. Select "Test Legal Queries" configuration
3. Watch the output in Debug Console

## 🚀 VS Code Features for This Project

### Debug Configurations

The project includes pre-configured debug settings:

- **Run Hindu Marriage Act RAG** - Main application
- **Analyze JSON Structure** - Data analysis
- **Test Legal Queries** - Comprehensive testing
- **Run Example Usage** - Quick demo

### Keyboard Shortcuts

- `F5` - Start debugging
- `Ctrl+F5` - Run without debugging
- `F9` - Toggle breakpoint
- `F10` - Step over
- `F11` - Step into
- `Ctrl+`` - Open terminal
- `Ctrl+Shift+P` - Command palette

### Useful VS Code Tasks

Access via `Ctrl+Shift+P` → "Tasks: Run Task":

- **Install Dependencies** - Install all requirements
- **Run Hindu Marriage Act RAG** - Start the main application
- **Analyze Data Structure** - Examine JSON structure
- **Clean ChromaDB** - Reset vector database

## 🔧 Recommended VS Code Extensions

### Essential Extensions

1. **Python** (Microsoft)
   - Syntax highlighting, debugging, IntelliSense
   - Install: `ext install ms-python.python`

2. **Pylance** (Microsoft)
   - Advanced Python language support
   - Install: `ext install ms-python.vscode-pylance`

### Optional but Helpful

3. **Python Docstring Generator**
   - Auto-generate docstrings
   - Install: `ext install njpwerner.autodocstring`

4. **GitLens**
   - Enhanced Git capabilities
   - Install: `ext install eamodio.gitlens`

5. **Better Comments**
   - Colorful comments
   - Install: `ext install aaron-bond.better-comments`

6. **Python Test Explorer**
   - Visual test runner
   - Install: `ext install littlefoxteam.vscode-python-test-adapter`

## 🐛 Debugging Tips

### Setting Breakpoints

1. Click in the gutter next to line numbers
2. Or press `F9` on the line
3. Red dots indicate active breakpoints

### Debug Console Usage

While debugging, use the Debug Console to:
```python
# Inspect variables
print(documents[0])

# Test expressions
len(result['source_documents'])

# Call functions
rag.query("test question")
```

### Watch Expressions

Add expressions to watch in the Debug sidebar:
- `len(documents)`
- `result['answer']`
- `config.CHUNK_SIZE`

## 📊 Working with Hindu Marriage Act Data

### Optimal VS Code Workflow

1. **Analyze Data First**:
   ```bash
   python main.py --json-file data/hindu_marriage_act_full.json --analyze-only
   ```

2. **Set Breakpoints** in `data_loader.py` to inspect document creation

3. **Debug Query Processing** by setting breakpoints in `rag_system.py`

4. **Test Specific Sections** using the test script

### Example Debug Session

1. Set breakpoint in `rag_system.py` at line where query is processed
2. Run "Test Legal Queries" configuration
3. When breakpoint hits, inspect:
   - `question` variable
   - `response` from QA chain
   - `source_documents` content

## 🎯 Legal Query Testing

### Pre-built Test Queries

The `test_legal_queries.py` includes:

- Marriage condition queries
- Divorce-related questions
- Ceremony requirements
- Legal definitions
- Punishment provisions

### Adding Custom Tests

```python
# In test_legal_queries.py
custom_queries = [
    "Your custom legal question here",
    "Another specific question about Hindu Marriage Act"
]

# Add to the existing legal_queries list
```

### Interactive Testing

Uncomment the interactive mode in `test_legal_queries.py`:
```python
# At the end of the file
interactive_legal_assistant()
```

## 📈 Performance Monitoring in VS Code

### Memory Usage

Monitor memory usage while debugging:
```python
import psutil
print(f"Memory usage: {psutil.Process().memory_info().rss / 1024 / 1024:.2f} MB")
```

### Response Time Analysis

The test script includes timing analysis:
- Individual query response times
- Average response time
- Performance bottlenecks

### Optimization Tips

1. **Adjust chunk size** in `config.py` based on performance
2. **Monitor ChromaDB size** in the workspace
3. **Use VS Code's built-in profiler** for detailed analysis

## 🔍 Troubleshooting Common Issues

### Python Interpreter Issues

**Problem**: VS Code can't find Python interpreter
**Solution**:
1. `Ctrl+Shift+P` → "Python: Select Interpreter"
2. Choose `./venv/bin/python` or `./venv/Scripts/python.exe`

### Import Errors

**Problem**: Module not found errors
**Solution**:
1. Ensure virtual environment is activated
2. Check PYTHONPATH in launch.json
3. Verify all dependencies are installed

### API Key Issues

**Problem**: Google API key not working
**Solution**:
1. Verify `.env` file is in project root
2. Check for extra spaces or quotes around API key
3. Test API key directly in Google AI Studio

### ChromaDB Issues

**Problem**: Vector database errors
**Solution**:
1. Delete `chroma_db` folder
2. Run "Clean ChromaDB" task
3. Restart the application

## 🚀 Advanced VS Code Features

### Code Snippets

Create custom snippets for common patterns:

1. `Ctrl+Shift+P` → "Preferences: Configure User Snippets"
2. Select "python.json"
3. Add legal query snippets:

```json
{
    "Legal Query Test": {
        "prefix": "legaltest",
        "body": [
            "def test_${1:query_name}():",
            "    query = \"${2:Your legal question here}\"",
            "    result = rag.query(query)",
            "    print(f\"Answer: {result['answer']}\")",
            "    assert len(result['source_documents']) > 0"
        ],
        "description": "Create a legal query test"
    }
}
```

### Multi-file Editing

- `Ctrl+Click` on function names to navigate
- `Alt+Click` to create multiple cursors
- `Ctrl+D` to select next occurrence of word

### Integrated Git

- View changes in Source Control panel
- Stage changes with `+` button
- Commit with `Ctrl+Enter`
- Push/pull with sync button

## 📚 Learning Resources

### VS Code Documentation
- [Python in VS Code](https://code.visualstudio.com/docs/languages/python)
- [Debugging in VS Code](https://code.visualstudio.com/docs/editor/debugging)
- [Tasks in VS Code](https://code.visualstudio.com/docs/editor/tasks)

### Project-Specific Resources
- LangChain documentation
- ChromaDB guides
- Google AI API documentation

## ✅ Final Checklist

Before starting development:

- [ ] VS Code opens project without errors
- [ ] Python interpreter is correctly selected
- [ ] Virtual environment is activated
- [ ] All dependencies are installed
- [ ] Environment variables are configured
- [ ] Test script runs successfully
- [ ] Debug configurations work
- [ ] Can query Hindu Marriage Act data

**You're ready to start developing with the Hindu Marriage Act RAG system in VS Code!**