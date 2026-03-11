const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`API SunuMarket démarrée sur le port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Impossible de démarrer le serveur:', error.message);
  process.exit(1);
});
