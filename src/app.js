const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const scenarioRoutes = require('./routes/scenarioRoutes');
const attemptRoutes = require('./routes/attemptRoutes');
const adminRoutes = require('./routes/adminRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

/** Allow Flutter Web (any localhost port) + explicit list from env */
function corsOrigin(origin, callback) {
  if (!origin) {
    return callback(null, true);
  }
  const list = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (list.includes('*')) {
    return callback(null, true);
  }
  const isLocalDev =
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
  if (process.env.NODE_ENV !== 'production' && isLocalDev) {
    return callback(null, true);
  }
  if (list.length && list.includes(origin)) {
    return callback(null, true);
  }
  if (!list.length && isLocalDev) {
    return callback(null, true);
  }
  return callback(null, false);
}

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.get("/", (req, res) => {
  res.json({
    message: "FYP backend is running",
    health: "/health"
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "social-engineering-training-api" });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'social-engineering-training-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/scenarios', scenarioRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
