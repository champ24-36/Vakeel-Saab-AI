import os
from typing import List
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from config import Config
import chromadb

class VectorStoreManager:
    """Manage ChromaDB vector store operations"""

    def __init__(self):
        self.config = Config()
        self.embeddings = None
        self.vector_store = None
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.config.CHUNK_SIZE,
            chunk_overlap=self.config.CHUNK_OVERLAP,
            length_function=len,
        )

    def setup(self, persist_directory: str = "./chroma_db"):
        self.initialize_embeddings()
        self.initialize_chromadb(persist_directory)

    def initialize_embeddings(self):
        try:
            self.embeddings = GoogleGenerativeAIEmbeddings(
                model=self.config.EMBEDDING_MODEL,
                google_api_key=self.config.GOOGLE_API_KEY
     )
            print("✅ Gemini embeddings initialized successfully")
        except Exception as e:
            raise Exception(f"Failed to initialize embeddings: {e}")

    def initialize_chromadb(self, persist_directory: str = "./chroma_db"):
        if not self.embeddings:
            raise ValueError("Embeddings not initialized. Call initialize_embeddings first.")

        # Fix for corrupted DB
        if os.path.isfile(persist_directory):
            raise Exception("❌ You provided a file path instead of a directory. Please use a folder path like './chroma_db'.")

        try:
            os.makedirs(persist_directory, exist_ok=True)
            client = chromadb.PersistentClient(path=persist_directory)

            self.vector_store = Chroma(
                client=client,  # Pass the client explicitly
                persist_directory=persist_directory,
                collection_name=self.config.CHROMADB_COLLECTION_NAME,
                embedding_function=self.embeddings,
            )
            print("✅ ChromaDB initialized successfully")
        except Exception as e:
            raise Exception(f"❌ Failed to initialize ChromaDB: {e}")

    def add_documents(self, documents: List[Document]) -> None:
        print("🧪 vector_store present:", self.vector_store is not None)
        if not self.vector_store:
            raise ValueError("Vector store not initialized. Call initialize_chromadb first.")

        try:
            split_docs = self.text_splitter.split_documents(documents)
            print(f"📄 Split {len(documents)} documents into {len(split_docs)} chunks")
            self.vector_store.add_documents(split_docs)
            print(f"✅ Successfully added {len(split_docs)} document chunks to vector store")
        except Exception as e:
            raise Exception(f"Failed to add documents to vector store: {e}")
