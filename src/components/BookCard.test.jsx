import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BookCard } from './BookCard';

function renderBookCard(props = {}) {
  return render(
    <MemoryRouter>
      <BookCard
        id="book-1"
        title="Libro de prueba"
        author="Autora de prueba"
        price="$10.000"
        coverUrl="/portada.jpg"
        {...props}
      />
    </MemoryRouter>
  );
}

describe('BookCard', () => {
  it('muestra los datos recibidos en sus propiedades', () => {
    renderBookCard();

    expect(screen.getByRole('heading', { name: 'Libro de prueba' })).toBeInTheDocument();
    expect(screen.getByText('Autora de prueba')).toBeInTheDocument();
    expect(screen.getByText('$10.000')).toBeInTheDocument();
  });

  it('ejecuta la función de agregar cuando se pulsa el botón con stock', () => {
    const onAddToCart = vi.fn();
    renderBookCard({ onAddToCart, stockDisponible: 2 });

    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));

    expect(onAddToCart).toHaveBeenCalledOnce();
  });

  it('deshabilita el botón y muestra el estado sin stock', () => {
    const onAddToCart = vi.fn();
    renderBookCard({ onAddToCart, stockDisponible: 0 });

    const button = screen.getByRole('button', { name: 'Sin stock' });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onAddToCart).not.toHaveBeenCalled();
  });
});
