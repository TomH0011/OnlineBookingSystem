# Deployment Guide

## Docker Deployment

### Prerequisites
- Docker and Docker Compose installed
- All environment variables configured

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd online-booking-system

# Set up environment variables
cp backend-java/.env.example backend-java/.env
cp backend-python/env.example backend-python/.env
cp frontend/.env.example frontend/.env

# Edit the environment files with your API keys
# Then start the services
docker-compose up -d
```

### Services
- **Frontend**: http://localhost:3000
- **Java Backend**: http://localhost:8080
- **Python Backend**: http://localhost:8000
- **MySQL**: localhost:3306

## Manual Deployment

### 1. Database Setup
```bash
# Start MySQL
sudo systemctl start mysql

# Create database
mysql -u root -p
CREATE DATABASE booking_system;
exit

# Import schema
mysql -u root -p booking_system < database/schema.sql
```

### 2. Java Backend
```bash
cd backend-java
./mvnw clean package
java -jar target/online-booking-system-0.0.1-SNAPSHOT.jar
```

### 3. Python Backend
```bash
cd backend-python
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

### 4. Frontend
```bash
cd frontend
npm install
npm start
```

## Production Deployment

### 1. Environment Setup
- Use production database
- Set up SSL certificates
- Configure production API keys
- Set up monitoring

### 2. Security Configuration
- Enable HTTPS
- Configure firewall
- Set up backup systems
- Enable logging

### 3. Performance Optimization
- Enable caching
- Configure load balancing
- Set up CDN
- Optimize database

## Cloud Deployment

### AWS Deployment
1. **EC2 Instance**: Launch Ubuntu server
2. **RDS**: Set up MySQL database
3. **S3**: Store static files
4. **CloudFront**: CDN for frontend
5. **Route 53**: DNS management

### Google Cloud Deployment
1. **Compute Engine**: Virtual machines
2. **Cloud SQL**: Managed database
3. **Cloud Storage**: File storage
4. **Cloud CDN**: Content delivery

### Azure Deployment
1. **Virtual Machines**: Azure VMs
2. **Azure Database**: Managed MySQL
3. **Blob Storage**: File storage
4. **CDN**: Content delivery network

## Monitoring & Maintenance

### Health Checks
- Database connectivity
- API endpoint availability
- Service status monitoring
- Performance metrics

### Backup Strategy
- Database backups
- File system backups
- Configuration backups
- Disaster recovery plan

### Security Updates
- Regular dependency updates
- Security patch management
- Vulnerability scanning
- Penetration testing

## Troubleshooting

### Common Issues
1. **Port conflicts**: Change ports in configuration
2. **Database connection**: Check credentials and network
3. **API key errors**: Verify all keys are correct
4. **CORS issues**: Check frontend API URLs

### Logs
- Application logs
- Database logs
- System logs
- Error tracking

### Performance Issues
- Database optimization
- Caching configuration
- Load balancing
- Resource monitoring
