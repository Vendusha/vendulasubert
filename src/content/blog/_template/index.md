---
# --- POVINNÉ / REQUIRED ---

# Titulek příspěvku, tak jak se zobrazí na stránce.
# Post title, exactly as it should appear on the page.
title: "Název příspěvku"

# Datum publikace ve formátu ROK-MĚSÍC-DEN.
# Publish date, as YEAR-MONTH-DAY.
date: 2026-01-01

# Rubrika, do které příspěvek patří — MUSÍ přesně odpovídat názvu složky,
# do které tento soubor ukládáš (např. "materstvi", "zvedavost", "outdoor",
# "zivot"). Používá se pro barvu, hlavičkový obrázek a řazení na stránce rubriky.
# The column this post belongs to — MUST match the name of the folder
# you're saving this file into exactly (e.g. "materstvi", "zvedavost",
# "outdoor", "zivot"). Drives the column's accent colour, header image,
# and where the post is listed.
column: "materstvi"

# Jazyk TOHOTO souboru: "cs" nebo "en". Jeden soubor = jeden jazyk.
# Pokud existuje i druhá jazyková verze, bude to samostatný soubor
# ve VLASTNÍ složce (viz README, sekce "Psaní nového příspěvku").
# Language of THIS file: "cs" or "en". One file = one language.
# A translation, if it exists, lives in its OWN separate folder
# (see README, "Writing a new post").
lang: "cs"

# Krátký popis (1-2 věty) pro přehled článků, RSS a náhledy na sociálních sítích.
# Short summary (1-2 sentences) used in the post list, RSS, and social previews.
summary: "Krátký popis příspěvku."

# --- VOLITELNÉ / OPTIONAL ---

# Pokud tenhle příspěvek existuje i ve druhém jazyce, dej OBĚMA souborům
# (české i anglické verzi) STEJNOU hodnotu translationKey — libovolný
# vlastní řetězec. Přepínač jazyka v hlavičce pak mezi nimi přeskočí přímo.
# If this post also exists in the other language, give BOTH files (the
# Czech version and the English version) the SAME translationKey value —
# any string you like. The language toggle in the header then jumps
# directly between them.
# translationKey: "muj-priklad"

# Vlastní hlavičkový obrázek pro TENTO příspěvek — název souboru v této
# stejné složce, stejně jako u obrázků v textu. Když ho vynecháš, použije
# se výchozí obrázek celé rubriky.
# A custom header image for THIS post — a filename in this same folder,
# same as images in the body. Omit it and the column's default header
# image is used instead.
# heroImage: "nazev-fotky.jpg"

# Nastav na true, pokud chceš příspěvek rozepsaný, ale ZATÍM nepublikovat.
# Draft příspěvky se zobrazují jen v `npm run dev`, ne na živém webu.
# Set to true to keep working on a post WITHOUT publishing it yet.
# Draft posts only show up in `npm run dev`, never on the live site.
# draft: true
---

Sem piš text příspěvku. Toto je normální Markdown: **tučně**, _kurzíva_,
odkazy `[text](https://example.com)`, nadpisy pomocí `##`, odrážky pomocí `-`.

Write your post text here. This is plain Markdown: **bold**, _italics_,
links `[text](https://example.com)`, headings with `##`, bullet lists with `-`.

Fotku z této stejné složky vlož takto (bez lomítka, bez "http", jen název souboru):
To insert a photo that lives in this same folder, type it like this
(no slash, no "http", just the filename):

![Popisek fotky pro nevidomé / Alt text for the photo](nazev-fotky.jpg)
