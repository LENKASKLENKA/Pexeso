# Pexeso - Memory Game

## Funkční specifikace

### 1. Datový model
Aplikace využívá databázi pro ukládání dat o kartách:
- **Tabulka Karty**:
  - `id`: Jedinečný identifikátor karty.
  - `image_path`: Cesta k obrázku, který karta reprezentuje.
  - `pair_id`: ID páru (každá karta má svého "dvojníka").
  ### 2. Charakteristika funkcionalit aplikace
Aplikace umožňuje:
- **Hru pexeso**: Hráč otáčí karty a hledá páry.
- **Administraci obsahu**: Admin může nahrávat nové obrázky a spravovat existující karty
