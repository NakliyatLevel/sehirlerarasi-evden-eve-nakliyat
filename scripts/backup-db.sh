#!/bin/bash

# Veritabanı Backup Script
# Kullanım: npm run backup

# Renkler
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Tarih formatı (örn: 14MAYPER2026-06-26)
DAY=$(date +"%d")
MONTH=$(date +"%b" | tr '[:lower:]' '[:upper:]')
YEAR=$(date +"%Y")
TIME=$(date +"%H-%M")
DAY_NUM=$(date +"%u")

case $DAY_NUM in
    1) DAY_ABBR="PZT" ;;
    2) DAY_ABBR="SAL" ;;
    3) DAY_ABBR="CAR" ;;
    4) DAY_ABBR="PER" ;;
    5) DAY_ABBR="CUM" ;;
    6) DAY_ABBR="CTS" ;;
    7) DAY_ABBR="PAZ" ;;
    *) DAY_ABBR="DAY" ;;
esac

DATE_TAG="${DAY}${MONTH}${DAY_ABBR}${YEAR}-${TIME}"

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

# pg_dump yolu (varsa 17 sürümünü kullan)
if [ -x /opt/homebrew/opt/postgresql@17/bin/pg_dump ]; then
    PG_DUMP=/opt/homebrew/opt/postgresql@17/bin/pg_dump
else
    PG_DUMP=$(command -v pg_dump)
fi

if [ -z "$PG_DUMP" ]; then
    echo -e "${RED}❌ pg_dump bulunamadı${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Veritabanı yedekleniyor...${NC}"

# pg_dump ile backup al
BACKUP_FILE="${BACKUP_DIR}/backup_${DATE_TAG}.sql"

# Docker kullanıyorsanız:
# docker exec -t postgres_container pg_dump -U username dbname > $BACKUP_FILE

# Lokal PostgreSQL kullanıyorsanız:
$PG_DUMP $DB_URL > $BACKUP_FILE

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
