#!/bin/bash

# Veritabanı Backup Script
# Kullanım: npm run backup

# Renkler
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Tarih formatı
DATE=$(date +"%Y%m%d_%H%M%S")

# Backup klasörü
BACKUP_DIR="backups"
mkdir -p $BACKUP_DIR

# .env dosyasından DATABASE_URL'i oku
if [ -f .env ]; then
    export $(cat .env | grep DATABASE_URL | xargs)
else
    echo -e "${RED}❌ .env dosyası bulunamadı${NC}"
    exit 1
fi

# PostgreSQL bağlantı bilgilerini parse et
DB_URL=$DATABASE_URL

echo -e "${YELLOW}📦 Veritabanı yedekleniyor...${NC}"

# pg_dump ile backup al
BACKUP_FILE="${BACKUP_DIR}/backup_${DATE}.sql"

# Docker kullanıyorsanız:
# docker exec -t postgres_container pg_dump -U username dbname > $BACKUP_FILE

# Lokal PostgreSQL kullanıyorsanız:
pg_dump $DB_URL > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backup başarılı: ${BACKUP_FILE}${NC}"
    
    # Dosya boyutunu göster
    SIZE=$(du -h $BACKUP_FILE | cut -f1)
    echo -e "${GREEN}📊 Dosya boyutu: ${SIZE}${NC}"
    
    # 7 günden eski backupları sil
    find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
    echo -e "${YELLOW}🗑️  7 günden eski backuplar temizlendi${NC}"
else
    echo -e "${RED}❌ Backup başarısız${NC}"
    exit 1
fi
