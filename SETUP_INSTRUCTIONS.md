# Complete Setup Instructions

## Step-by-Step Setup Guide

### 1. System Requirements

- **Python**: 3.8 or higher
- **Operating System**: Windows, macOS, or Linux
- **Memory**: At least 4GB RAM recommended
- **Storage**: 1GB free space for dependencies and vector database

### 2. Python Environment Setup

#### Option A: Using Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv rag_env

# Activate virtual environment
# On Windows:
rag_env\Scripts\activate

# On macOS/Linux:
source rag_env/bin/activate

# Verify Python version
python --version
```

#### Option B: Using Conda

```bash
# Create conda environment
conda create -n rag_env python=3.9

# Activate environment
conda activate rag_env
```

### 3. Install Dependencies

```bash
# Install all required packages
pip install -r requirements.txt

# Verify installation
pip list | grep langchain
pip list | grep chromadb
```

### 4. Google AI API Setup

#### Get Your API Key:

1. **Visit Google AI Studio**: https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Create API Key**: Click "Create API Key" button
4. **Copy the key**: Save it securely

#### Set Up Environment Variables:

```bash
# Copy the example file
cp .env.example .env

# Edit the .env file (use any text editor)
nano .env
# or
code .env
```

Add your API key:
```
GOOGLE_API_KEY=your_actual_api_key_here
CHROMADB_HOST=localhost
CHROMADB_PORT=8000
```

### 5. Prepare Your JSON Data

#### Supported JSON Formats:

**Format 1: Array of Objects**
```json
[
  {
    "id": 1,
    "title": "Document Title",
    "content": "Main content here...",
    "author": "Author Name",
    "date": "2024-01-01"
  }
]
```

**Format 2: Single Object with Arrays**
```json
{
  "documents": [
    {
      "title": "Title",
      "text": "Content..."
    }
  ]
}
```

**Format 3: Nested Structure**
```json
{
  "data": {
    "articles": [
      {
        "headline": "News Title",
        "body": "Article content...",
        "metadata": {
          "source": "Source Name"
        }
      }
    ]
  }
}
```

### 6. Test Installation

#### Run the Example:

```bash
python example_usage.py
```

Expected output:
```
✅ Sample data created: sample_data.json
📊 Loading sample data...
📋 Detected structure: ['title', 'content']
🚀 Initializing RAG system...
✅ Configuration validated successfully
✅ Gemini embeddings initialized successfully
✅ ChromaDB initialized successfully
✅ Gemini LLM initialized successfully
✅ QA Chain created successfully
✅ RAG System initialized successfully!
```

### 7. Analyze Your Data

Before processing your actual data, analyze its structure:

```bash
python main.py --json-file your_data.json --analyze-only
```

This will show:
- JSON structure type
- Available fields
- Suggested text fields
- Suggested metadata fields
- Sample content

### 8. Run Your First Query

```bash
python main.py --json-file your_data.json
```

The system will:
1. Load and analyze your JSON
2. Create document chunks
3. Generate embeddings
4. Store in ChromaDB
5. Start interactive query mode

### 9. Optimization Tips

#### For Large Datasets:

Edit `config.py`:
```python
# Reduce chunk size for faster processing
CHUNK_SIZE = 500
CHUNK_OVERLAP = 100

# Reduce retrieval results
TOP_K_RESULTS = 3
```

#### For Better Accuracy:

```python
# Increase chunk size for more context
CHUNK_SIZE = 1500
CHUNK_OVERLAP = 300

# Lower temperature for more focused responses
LLM_TEMPERATURE = 0.05
```

### 10. Common Setup Issues and Solutions

#### Issue: "ModuleNotFoundError: No module named 'langchain'"

**Solution:**
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Reinstall requirements
pip install -r requirements.txt
```

#### Issue: "Google API Key not found"

**Solution:**
```bash
# Check .env file exists and has correct format
cat .env

# Ensure no extra spaces around the equals sign
GOOGLE_API_KEY=your_key_here
```

#### Issue: "ChromaDB connection error"

**Solution:**
```bash
# Clear existing ChromaDB data
rm -rf ./chroma_db

# Restart the system
python main.py --json-file your_data.json
```

#### Issue: "JSON decode error"

**Solution:**
```bash
# Validate JSON format
python -m json.tool your_data.json

# Check file encoding (should be UTF-8)
file your_data.json
```

### 11. Performance Monitoring

#### Check System Resources:

```bash
# Monitor memory usage
python -c "
import psutil
print(f'Memory: {psutil.virtual_memory().percent}%')
print(f'CPU: {psutil.cpu_percent()}%')
"
```

#### Optimize for Your System:

- **Low Memory (< 8GB)**: Use smaller chunk sizes (500-800)
- **High Memory (> 16GB)**: Use larger chunk sizes (1500-2000)
- **Slow CPU**: Reduce TOP_K_RESULTS to 3-5
- **Fast SSD**: Increase batch processing size

### 12. Production Deployment

#### For Production Use:

1. **Use Environment Variables**:
```bash
export GOOGLE_API_KEY="your_key"
export CHROMADB_HOST="your_host"
```

2. **Set Up Logging**:
```python
import logging
logging.basicConfig(level=logging.INFO)
```

3. **Add Error Handling**:
```python
try:
    rag = RAGSystem()
    rag.initialize()
except Exception as e:
    logging.error(f"Failed to initialize: {e}")
```

### 13. Backup and Recovery

#### Backup ChromaDB:

```bash
# Backup vector database
cp -r ./chroma_db ./chroma_db_backup_$(date +%Y%m%d)
```

#### Restore ChromaDB:

```bash
# Restore from backup
cp -r ./chroma_db_backup_20240101 ./chroma_db
```

### 14. Next Steps

Once setup is complete:

1. **Test with your data**: Start with a small subset
2. **Optimize configuration**: Adjust settings based on performance
3. **Create custom queries**: Develop domain-specific questions
4. **Monitor usage**: Track API calls and costs
5. **Scale up**: Process larger datasets as needed

### 15. Getting Help

If you encounter issues:

1. **Check logs**: Look for error messages in console output
2. **Verify API key**: Test with Google AI Studio directly
3. **Validate JSON**: Use online JSON validators
4. **Check dependencies**: Ensure all packages are installed correctly
5. **Review configuration**: Verify all settings in `config.py`

The system is now ready for use! Start with the example data, then gradually move to your own datasets.