# Deployment Guide

This guide explains how to deploy the Momentum Towing website using Bun as the application server and a reverse proxy.

## Reverse Proxy Comparison

Based on benchmarks and real-world usage, here's how the main options compare:

| Feature | Caddy | Nginx | Traefik |
|---------|-------|-------|---------|
| **Performance** | Very Good | Best | Good |
| **Ease of Setup** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Auto HTTPS** | ✅ Built-in | ❌ Manual/Certbot | ✅ Built-in |
| **HTTP/2** | ✅ Automatic | ✅ Manual config | ✅ Automatic |
| **Config Syntax** | Simple | Complex | YAML/Labels |
| **Memory Usage** | Low | Lowest | Higher |
| **Docker Integration** | Good | Good | Best |

### Benchmark Results (from community tests)

| Metric | Nginx | Caddy | Traefik |
|--------|-------|-------|---------|
| Requests/sec | 🥇 Best | 🥈 Close 2nd | 🥉 3rd |
| P95 Latency | 🥇 Best | 🥈 Close 2nd | 🥉 Worst |
| CPU Usage | 🥇 Lowest | 🥈 Low | 🥉 Higher |
| Memory | 🥇 Lowest | 🥈 Low | 🥉 Higher |

### Recommendation

**For this project: Use Caddy** ✅

Why Caddy over Nginx despite Nginx being slightly faster:

1. **Automatic HTTPS**: Caddy handles Let's Encrypt certificates automatically - zero config
2. **HTTP/2 by default**: No extra configuration needed
3. **Simple config**: 3 lines vs 30+ lines for Nginx
4. **Compression built-in**: Just add `encode gzip zstd`
5. **Performance difference is minimal**: ~5-10% in benchmarks, unnoticeable for most sites
6. **Less maintenance**: No certificate renewal scripts, simpler updates

**When to use Nginx instead:**
- Extremely high traffic (>10,000 req/sec)
- Need advanced load balancing features
- Already have Nginx expertise
- Memory-constrained environments

**When to use Traefik:**
- Heavy Docker/Kubernetes usage with many containers
- Need automatic service discovery
- Microservices architecture

## Architecture Overview

```
Internet → Caddy (HTTPS, HTTP/2) → Bun Server (HTTP/1.1, port 3000)
```

- **Caddy**: Handles HTTPS, HTTP/2, compression, and reverse proxy
- **Bun**: Runs the application server

## Prerequisites

- Linux server (Ubuntu/Debian recommended)
- Domain name pointing to your server
- Bun installed (`curl -fsSL https://bun.sh/install | bash`)
- Caddy installed

## Step 1: Install Bun

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Verify installation
bun --version
```

## Step 2: Clone and Setup Project

```bash
# Clone the repository
git clone https://github.com/box7e7/claude-frontend-skills.git
cd claude-frontend-skills

# Install dependencies
bun install
```

## Step 3: Run Bun Server

### Option A: Direct Run (Development)

```bash
bun start
```

### Option B: Using PM2 (Production - Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start bun --name "momentum-towing" -- start

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Option C: Using systemd (Production)

Create a systemd service file:

```bash
sudo nano /etc/systemd/system/momentum-towing.service
```

Add the following content:

```ini
[Unit]
Description=Momentum Towing Website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/claude-frontend-skills
ExecStart=/home/YOUR_USER/.bun/bin/bun start
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=momentum-towing
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable momentum-towing
sudo systemctl start momentum-towing

# Check status
sudo systemctl status momentum-towing
```

## Step 4: Install Caddy

```bash
# Ubuntu/Debian
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

## Step 5: Configure Caddy

Edit the Caddyfile:

```bash
sudo nano /etc/caddy/Caddyfile
```

### Basic Configuration (with automatic HTTPS)

```caddyfile
yourdomain.com {
    reverse_proxy localhost:3000
}
```

### Optimized Configuration (Recommended)

This configuration enables HTTP/2, compression, and proper caching:

```caddyfile
yourdomain.com {
    # Enable compression (gzip and zstd)
    encode zstd gzip

    # Reverse proxy to Bun server
    reverse_proxy localhost:3000 {
        # Health checks
        health_uri /api/hello
        health_interval 30s
        
        # Headers
        header_up Host {host}
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto {scheme}
    }

    # Security headers
    header {
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
        Referrer-Policy strict-origin-when-cross-origin
        -Server
    }

    # Cache static assets at CDN/browser level
    @static {
        path *.webp *.jpg *.jpeg *.png *.gif *.svg *.ico
        path *.css *.js *.woff *.woff2
    }
    header @static Cache-Control "public, max-age=31536000, immutable"

    # Log access
    log {
        output file /var/log/caddy/access.log
        format json
    }
}
```

### Multiple Domains Configuration

```caddyfile
# Main domain
yourdomain.com {
    encode zstd gzip
    reverse_proxy localhost:3000
}

# Redirect www to non-www
www.yourdomain.com {
    redir https://yourdomain.com{uri} permanent
}
```

## Step 6: Start Caddy

```bash
# Reload Caddy configuration
sudo systemctl reload caddy

# Or restart Caddy
sudo systemctl restart caddy

# Check status
sudo systemctl status caddy

# View logs
sudo journalctl -u caddy -f
```

## Performance Benefits with Caddy

Using Caddy as a reverse proxy provides these performance improvements:

| Feature | Without Caddy | With Caddy |
|---------|---------------|------------|
| Protocol | HTTP/1.1 | HTTP/2 (automatic) |
| HTTPS | Manual setup | Automatic (Let's Encrypt) |
| Compression | None | gzip + zstd |
| Multiplexing | No | Yes (HTTP/2) |
| Connection reuse | Limited | Full |

### Expected Improvements

- **HTTP/2 multiplexing**: All requests download in parallel instead of sequentially
- **Compression**: 60-80% reduction in CSS/JS/HTML transfer size
- **Automatic HTTPS**: Free SSL certificates from Let's Encrypt
- **Better caching**: Proper cache headers at the edge

## Troubleshooting

### Check if Bun is running

```bash
# If using PM2
pm2 status

# If using systemd
sudo systemctl status momentum-towing

# Check if port 3000 is listening
sudo lsof -i :3000
```

### Check Caddy logs

```bash
sudo journalctl -u caddy -f
```

### Test the setup

```bash
# Test Bun directly
curl http://localhost:3000

# Test through Caddy
curl -I https://yourdomain.com
```

### Common Issues

1. **Port 3000 already in use**
   ```bash
   sudo lsof -i :3000
   kill -9 <PID>
   ```

2. **Caddy can't connect to Bun**
   - Ensure Bun is running on port 3000
   - Check firewall rules: `sudo ufw status`

3. **SSL certificate issues**
   - Ensure domain DNS points to server
   - Check Caddy logs for Let's Encrypt errors

## Environment Variables

Create a `.env` file for production settings:

```bash
NODE_ENV=production
PORT=3000
```

## Updating the Application

```bash
cd /path/to/claude-frontend-skills

# Pull latest changes
git pull origin main

# Install any new dependencies
bun install

# Restart the application
pm2 restart momentum-towing
# or
sudo systemctl restart momentum-towing
```

## Monitoring

### Using PM2

```bash
# View logs
pm2 logs momentum-towing

# Monitor resources
pm2 monit
```

### Using systemd

```bash
# View logs
sudo journalctl -u momentum-towing -f

# Check resource usage
systemctl status momentum-towing
```

## Security Recommendations

1. **Firewall**: Only allow ports 80, 443, and SSH
   ```bash
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow ssh
   sudo ufw enable
   ```

2. **Keep Bun internal**: Don't expose port 3000 to the internet
   ```bash
   sudo ufw deny 3000
   ```

3. **Regular updates**:
   ```bash
   sudo apt update && sudo apt upgrade
   bun upgrade
   ```
