#!/bin/bash

# Otomatik Backup Script - Her 30 dakikada bir çalışır
# Kullanım: npm run db:auto-backup

# Renkler
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🔄 Otomatik yedekleme başlatılıyor...${NC}"
echo -e "${YELLOW}⏰ Her 30 dakikada bir backup alınacak${NC}"
echo -e "${YELLOW}⌨️  Durdurmak için Ctrl+C${NC}"
echo ""

while true; do
    # Tarih ve saat
    NOW=$(date +"%Y-%m-%d %H:%M:%S")
    echo -e "${GREEN}[$NOW] Backup alınıyor...${NC}"
    
    # Backup al
    npm run db:backup > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}[$NOW] ✅ Backup başarılı${NC}"
    else
        echo -e "${RED}[$NOW] ❌ Backup başarısız${NC}"
    fi
    
    # 30 dakika bekle (1800 saniye)
    echo -e "${YELLOW}⏳ Sonraki backup: $(date -v+30M +"%H:%M:%S")${NC}"
    echo ""
    sleep 1800
done
