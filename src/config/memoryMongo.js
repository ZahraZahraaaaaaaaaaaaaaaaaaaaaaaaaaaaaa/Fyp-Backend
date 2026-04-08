let memoryServerInstance = null;

/**
 * Starts MongoDB Memory Server and sets process.env.MONGODB_URI.
 * Keeps a reference so the binary stays alive for the process lifetime.
 */
async function startMemoryMongo() {
  if (process.env.USE_MEMORY_MONGO !== 'true') {
    return null;
  }
  const { MongoMemoryServer } = require('mongodb-memory-server');
  memoryServerInstance = await MongoMemoryServer.create();
  const uri = memoryServerInstance.getUri();
  process.env.MONGODB_URI = uri;
  console.log('[memory-mongo] Started at', uri);
  return memoryServerInstance;
}

module.exports = { startMemoryMongo };
