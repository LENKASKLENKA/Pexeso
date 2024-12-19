# Pexeso - Memory Game

## Funkční specifikace

### 1. Datový konceptuální model
Aplikace využívá databázi pro ukládání dat o kartách:
- **Tabulka Karty**:
  - `id`: Jedinečný identifikátor karty.
  - `image_path`: Cesta k obrázku, který karta reprezentuje.
  - `pair_id`: ID páru (každá karta má svého "dvojníka").
