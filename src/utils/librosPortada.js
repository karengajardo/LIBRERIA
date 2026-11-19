const MAX_LIBROS_POR_SECCION = 6;

export function dividirLibrosPortada(libros = []) {
  const lista = Array.isArray(libros) ? libros : [];
  const cantidadDestacados = Math.min(MAX_LIBROS_POR_SECCION, Math.ceil(lista.length / 2));
  const destacados = [...lista]
    .sort((libroA, libroB) => {
      const stockA = Number(libroA.stock ?? 10);
      const stockB = Number(libroB.stock ?? 10);
      const stockValidoA = Number.isFinite(stockA) ? stockA : Number.POSITIVE_INFINITY;
      const stockValidoB = Number.isFinite(stockB) ? stockB : Number.POSITIVE_INFINITY;
      return stockValidoA - stockValidoB;
    })
    .slice(0, cantidadDestacados);
  const destacadosSeleccionados = new Set(destacados);

  return {
    destacados,
    novedades: lista
      .filter((libro) => !destacadosSeleccionados.has(libro))
      .slice(0, MAX_LIBROS_POR_SECCION)
  };
}
