// db.js
const DB_NAME = 'OfertasDB';
const DB_VERSION = 1;
const STORE_NAME = 'productos';
let db;

/**
 * Abre y configura la base de datos IndexedDB.
 */
export const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error("Error al abrir IndexedDB:", event.target.errorCode);
            reject("Error de IndexedDB");
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        // Se ejecuta si la DB no existe o la versión cambia
        request.onupgradeneeded = (event) => {
            db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                // Creamos el Object Store (Tabla) con 'url' como clave primaria
                const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'url' });
                // Creamos índices para búsquedas eficientes
                objectStore.createIndex('articulo', 'articulo', { unique: false });
                objectStore.createIndex('marca', 'marca', { unique: false });
                objectStore.createIndex('precio', 'precio', { unique: false });
            }
        };
    });
};

/**
 * Añade o actualiza un producto en el Object Store.
 */
export const addProduct = (productData) => {
    return new Promise(async (resolve, reject) => {
        if (!db) await openDatabase(); 

        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        // El método put inserta o actualiza
        const request = store.put(productData); 

        request.onsuccess = () => {
            resolve("Producto guardado exitosamente.");
        };

        request.onerror = (event) => {
            console.error("Error al guardar producto:", event.target.error);
            reject(event.target.error);
        };
    });
};

/**
 * Obtiene todos los productos del Object Store.
 */
export const getAllProducts = () => {
    return new Promise(async (resolve, reject) => {
        if (!db) await openDatabase();
        
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

// Abrir la base de datos al cargar el script
openDatabase().catch(console.error);