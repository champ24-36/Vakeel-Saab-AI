def load_documents(self, json_path):
    loader = JSONLoader(
        file_path=json_path,
        jq_schema='.messages[]',
        text_content=False
    )
    documents = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    return text_splitter.split_documents(documents)

def setup_vector_store(self, documents):
    self.vector_store = Chroma.from_documents(
        documents=documents,
        embedding=self.embeddings,
        persist_directory="./chroma_db"
    )

def query(self, question):
    if not self.vector_store:
        raise ValueError("Vector store not initialized")
        
    qa = RetrievalQA.from_chain_type(
        llm=self.llm,
        chain_type="stuff",
        retriever=self.vector_store.as_retriever()
    )
    
    return qa.run(question)