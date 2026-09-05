# ==============================================================================
# ManganAI Backend Dockerfile
# Production-ready container image for MOIL Manganese Intelligence Engine
# ==============================================================================

FROM python:3.11-slim

# Prevent Python from writing .pyc files and buffer stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8001 \
    HOST=0.0.0.0

WORKDIR /app

# Install system dependencies required for scientific computation
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency definition and install
COPY requirements.txt /app/
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy backend application code
COPY . /app/

# Seed the SQLite database if not present
RUN python seed.py

# Expose backend service port
EXPOSE 8001

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8001/health || exit 1

# Launch uvicorn production server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
