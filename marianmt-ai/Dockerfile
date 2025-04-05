FROM python:3.12.6-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN mkdir -p /app/models

CMD ["/bin/bash", "-c", "\
  if [ -z \"$(ls -A /app/models 2>/dev/null)\" ]; then \
    echo 'Downloading models...'; \
    python download_models.py; \
  else \
    echo 'Models already exist. Skipping download.'; \
  fi && \
  python app.py"]