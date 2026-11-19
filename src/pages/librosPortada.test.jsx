import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Home } from './inicio';
import { Novedades } from './Novedades';

describe('secciones de inicio y novedades', () => {
  it('muestra grupos distintos de libros en inicio y novedades', () => {
    const libros = Array.from({ length: 8 }, (_, indice) => ({
      id: indice + 1,
      titulo: `Libro ${indice + 1}`,
      autor: 'Autor',
      precio: '$10.000',
      stock: 8 - indice
    }));

    render(
      <MemoryRouter>
        <>
          <Home libros={libros} />
          <Novedades libros={libros} />
        </>
      </MemoryRouter>
    );

    expect(screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent))
      .toEqual([
        'Libro 8',
        'Libro 7',
        'Libro 6',
        'Libro 5',
        'Libro 1',
        'Libro 2',
        'Libro 3',
        'Libro 4'
      ]);
  });
});
