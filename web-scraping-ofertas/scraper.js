// scraper.js
import { addProduct } from './db.js';

// --- CONFIGURACIÓN DE SELECTORES (¡VERIFICAR Y AJUSTAR!) ---
// Estos selectores son EJEMPLOS para Amazon Deals. 
// Usa F12 para encontrar la clase CSS del contenedor principal de cada oferta, 
// y luego las clases para el nombre, precio y URL dentro de ese contenedor.
const SELECTORES = {
    amazonDeals: {
        item: '.a-carousel-card, .deal-card', // Contenedor de cada oferta
        articulo: 'a > span', // Selector del nombre del producto
        precio: '.octopus-deal-price .a-price-whole', // Selector del precio
        url: 'a.a-link-normal', // Selector del enlace del producto
        url_img: 'img.a-dynamic-image' // Selector de la imagen
    }
};

/**
 * Limpia y convierte el precio de texto a número (ej: "1.234,56 €" -> 1234.56).
 */
const parsePrice = (priceText) => {
    if (!priceText) return 0.0;
    // Elimina no-dígitos excepto la coma y el punto, luego normaliza decimales.
    return parseFloat(priceText.replace(/[^0-9,.]/g, '').replace(/\./g, '').replace(/,/g, '.'));
};

/**
 * Función principal para ejecutar el scraping en el DOM de la pestaña activa.
 * @param {string} siteKey - Clave de los selectores (ej: 'amazonDeals').
 */
export const scrapeSite = async (siteKey) => {
    const selectors = SELECTORES[siteKey];
    if (!selectors) {
        console.error(`Selectores no definidos para ${siteKey}`);
        return;
    }

    // 1. Obtener todos los contenedores de ofertas
    const items = document.querySelectorAll(selectors.item);
    let count = 0;

    console.log(`🔎 Iniciando scraping en ${document.title}. ${items.length} elementos encontrados.`);

    for (const item of items) {
        try {
            // 2. Extracción de datos
            const articuloEl = item.querySelector(selectors.articulo);
            const priceEl = item.querySelector(selectors.precio);
            const urlEl = item.querySelector(selectors.url);
            const imgEl = item.querySelector(selectors.url_img);

            const url = urlEl ? urlEl.href : null;
            
            // Requisito: URL es la clave primaria, si no existe, se ignora el ítem.
            if (!url) continue; 
            
            // 3. Mapeo al Modelo JSON
            const productData = {
                gtin: null, 
                articulo: articuloEl ? articuloEl.textContent.trim() : 'Artículo Desconocido',
                cod_unico: '', 
                marca: '', 
                fabricante: 'Web Scraped', // Valor genérico
                modelo: '', 
                precio: parsePrice(priceEl ? priceEl.textContent : '0,00'), 
                descuento: 0.0, 
                fecha_limite: null, 
                url: url,
                url_img: imgEl ? imgEl.src : null,
                fecha_scraping: new Date().toISOString()
            };

            // 4. Persistencia en IndexedDB
            await addProduct(productData);
            count++;

        } catch (error) {
            console.warn("Error al procesar un artículo:", error);
        }
    }
    console.log(`✅ Scraping finalizado. ${count} productos guardados en IndexedDB.`);
};