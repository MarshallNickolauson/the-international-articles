# Stage 1: Build dependencies
FROM python:3.12-slim as builder

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Use pip cache
ENV PIP_NO_CACHE_DIR=no
ENV PIP_CACHE_DIR=/root/.cache/pip

RUN pip install --upgrade pip && \
    pip install --user -r requirements.txt

# --------------------------------------------

# Stage 2: Runtime environment
FROM python:3.12-slim

WORKDIR /app

# Install runtime dependencies only
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from builder stage
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

COPY . .

RUN pip install gunicorn

RUN mkdir -p /app/models

CMD ["/bin/bash", "-c", "\
  echo 'Checking /app/models contents...'; \
  if [ -z \"$(find /app/models -mindepth 1 -type d 2>/dev/null)\" ]; then \
    echo 'Models folder is empty. Downloading models...'; \
    python download_models.py; \
  else \
    echo 'Models already exist. Skipping download.'; \
  fi && \
  gunicorn -w 4 -b 0.0.0.0:9000 app:app"]