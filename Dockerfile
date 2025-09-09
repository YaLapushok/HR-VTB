FROM nginx:alpine

# Install bash for better shell support
RUN apk add --no-cache bash

# Create app directory
WORKDIR /usr/share/nginx/html

# Copy application files
COPY index.html .
COPY style.css .
COPY app.js .

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create non-root user for security
RUN addgroup -g 1001 -S hranalyzer && \
    adduser -S hranalyzer -u 1001

# Set proper permissions
RUN chown -R hranalyzer:hranalyzer /usr/share/nginx/html && \
    chown -R hranalyzer:hranalyzer /var/cache/nginx && \
    chown -R hranalyzer:hranalyzer /var/log/nginx && \
    chown -R hranalyzer:hranalyzer /etc/nginx/conf.d

RUN touch /var/run/nginx.pid && \
    chown -R hranalyzer:hranalyzer /var/run/nginx.pid

# Switch to non-root user
USER hranalyzer

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Expose port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]