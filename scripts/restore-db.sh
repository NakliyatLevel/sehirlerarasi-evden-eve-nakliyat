#!/bin/bash

# Veritabanı Restore Script
# Kullanım: npm run restore backups/backup_20240317_120000.sql

# Renkler
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

if [ -z "$1" ]; then
    echo -e "${RED}❌ Backup dosyası belirtilmedi${NC}"
    echo -e "${YELLOW}Kullanım: npm run restore backups/backup_YYYYMMDD_HHMMSS.sql${NC}"
    exit 1
fi

BACKUP_FILE=$1

if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}❌ Backup dosyası bulunamadı: ${BACKUP_FILE}${NC}"
    exit 1
fi

# .env dosyasından DATABASE_URL'i oku
if [ -f .env ]; then
    export $(cat .env | grep DATABASE_URL | xargs)
else
    echo -e "${RED}❌ .env dosyası bulunamadı${NC}"
    exit 1
fi

DB_URL=$DATABASE_URL

echo -e "${YELLOW}⚠️  DİKKAT: Mevcut veritabanı silinecek ve backup geri yüklenecek!${NC}"
read -p "Devam etmek istiyor musunuz? (y/n) " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}❌ İşlem iptal edildi${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Veritabanı geri yükleniyor...${NC}"

# Önce veritabanını temizle
npx prisma migrate reset --force --skip-seed

# Backup'ı geri yükle
psql $DB_URL < $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Restore başarılı${NC}"
    
    # Prisma client'ı yeniden oluştur
    npx prisma generate
    
    echo -e "${GREEN}🎉 Veritabanı başarıyla geri yüklendi${NC}"
else
    echo -e "${RED}❌ Restore başarısız${NC}"
    exit 1
fi
